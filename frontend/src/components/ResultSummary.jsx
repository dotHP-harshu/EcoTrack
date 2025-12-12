// /components/ResultSummary.jsx
import React, { useEffect, useState, useRef } from "react";
import { calclulateBenchMark } from "../utils/benchMarkCalculator";
import { makeTipObject } from "../utils/tipDataCalculator";
import TipCard from "./TipCard";
import { addCfhApi } from "../services/api";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

ChartJS.register(ArcElement, Tooltip, Legend);

const ResultSummary = ({ footprint, formData }) => {
  const [isShowingTipSection, setIsShowingTipSection] = React.useState(false);
  const [tips, setTips] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [isSavingData, setIsSavingData] = useState(false);
  const navigate = useNavigate();
  const [benchMarks, setBenchMarks] = useState(null);

  // Refs for GSAP animations
  const headerRef = useRef(null);
  const statsRef = useRef(null);
  const imageRef = useRef(null);
  const chartContainerRef = useRef(null);
  const buttonsRef = useRef(null);
  const [isSavedData, setIsSavedData] = useState(false);


  const categoryObject = {
    transportEmission: "Transport",
    elecEmission: "Electricity",
    dietEmission: "Diet",
    shoppingEmission: "Shopping",
    digitalEmission: "Digital",
    waterEmission: "Water",
  };

  useEffect(() => {
    const newBenchmarks = calclulateBenchMark(footprint.categoryEmission);
    const generatedTips = Object.keys(categoryObject).map((cat) =>
      makeTipObject(cat, newBenchmarks[cat], footprint.categoryEmission)
    );
    setBenchMarks(newBenchmarks);
    setTips(generatedTips);
  }, [footprint]);

  const saveResult = async () => {
    setIsSavingData(true);
    const { data, error } = await addCfhApi(
      footprint?.total,
      footprint?.categoryEmission,
      formData,
      tips
    );

    if (error) {
      setIsSavingData(false);
      return;
    }

    setIsSavingData(false);
    setIsSavedData(true);
  };

  // const options = {
  //   title: "Monthly Carbon Emission in Kg",
  //   pieHole: 0.4,
  //   is3D: true,
  //   sliceVisibilityThreshold: 0,
  //   backgroundColor: "transparent",
  //   legend: {
  //     position: "bottom",
  //     alignment: "end",
  //   },
  //   colors: ["#4338CA", "#A16207", "#15803D", "#BE185D", "#0369A1", "#0E7490"],
  // };

  useEffect(() => {
    const doughnutData = {
      labels: Object.values(categoryObject),
      datasets: [
        {
          label: "kg CO2 ",
          data: Object.keys(categoryObject).map(
            (cat) => footprint.categoryEmission[cat]
          ),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    setChartData(doughnutData);
  }, []);

  useEffect(() => {
    if (benchMarks) {
      const generatedTips = Object.keys(categoryObject).map((cat) =>
        makeTipObject(cat, benchMarks[cat], footprint.categoryEmission)
      );
      setTips(generatedTips);
    }
  }, [benchMarks, footprint]);

  useGSAP(
    () => {
      gsap.from(headerRef.current, {
        y: -30,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(statsRef.current?.children || [], {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.3,
      });
      // Animate image with scale
      gsap.from(imageRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: "back.out(1.4)",
        delay: 0.5,
      });
    },
    
    { dependencies: [] }
  );

  


  return (
    <div className="min-h-screen bg-linear-to-br from-bg-subtle via-bg-base to-bg-muted p-6 max-xs:p-4">
      {/* Hero Section with enhanced styling */}
      <div className="w-full max-w-7xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl shadow-shadow overflow-hidden border border-border/20 mb-8">
          <div className="w-full h-fit grid grid-cols-2 max-sm:grid-cols-1">
            <div
              className="flex flex-col items-start justify-center gap-6 px-8 py-12 max-xs:px-6 max-xs:py-8"
              ref={statsRef}
            >
              <h1
                ref={headerRef}
                className="text-lg font-light tracking-wide uppercase max-xs:text-base bg-linear-to-r from-primary to-accent bg-clip-text text-transparent"
              >
                Your Carbon Footprint
              </h1>
              <div className="relative">
                <p className="text-7xl font-bold tracking-tight max-xs:text-4xl text-text-heading relative z-10">
                  {footprint?.total} <br />
                  <span className="text-5xl max-xs:text-3xl">
                    kg Co<sub className="text-3xl max-xs:text-xl">2</sub> per
                    month
                  </span>
                </p>
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/10 rounded-full blur-2xl -z-10"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10"></div>
              </div>
              <p className="text-lg font-light tracking-wide max-xs:text-sm text-text-light leading-relaxed">
                This is your estimated monthly carbon footprint based on your
                provided activities. Every small change makes a difference.
              </p>
              <div className="w-full h-1 bg-linear-to-r from-primary via-accent to-accent-light rounded-full"></div>
            </div>
            <div className="p-8 flex justify-center items-center max-sm:p-4 bg-linear-to-br from-bg-subtle to-transparent">
              <div ref={imageRef} className="relative group">
                <img
                  src="/images/result_banner.png"
                  alt="result"
                  className="w-full object-center transition-transform duration-500 group-hover:scale-105 drop-shadow-2xl"
                />
                <div className="absolute inset-0 bg-linear-to-t from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart/Tips Section with enhanced card design */}
      <div className="relative w-full min-h-[600px] max-w-7xl mx-auto">
        {isShowingTipSection ? (
          <div
            className={`transition-all duration-700 ease-out ${
              isShowingTipSection
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95  absolute"
            }`}
          >
            <div className="w-full grid lg:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 max-xs:px-4 place-items-center gap-6 lg:px-[10vw] max-lg:px-[5vw] py-10">
              {tips.map((tipObject, i) => (
                <TipCard key={i} tipObject={tipObject} formData={formData} />
              ))}
            </div>
          </div>
        ) : (
          <div
            ref={chartContainerRef}
            className={`transition-all duration-700 ease-out ${
              isShowingTipSection
                ? "opacity-0 scale-95 Fchartabsolute"
                : "opacity-100 scale-100"
            }`}
          >
            <div className="w-full max-w-4xl mx-auto my-6">
              <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl shadow-shadow p-8 max-xs:p-6 border border-border/20 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/20 group">
                <div className="relative">
                  <div className="max-w-lg w-full mx-auto transition-transform duration-500 group-hover:scale-[1.02]">
                    {chartData && <Doughnut data={chartData} />}
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-6 -right-6 w-32 h-32 bg-linear-to-br from-accent/20 to-primary/20 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                  <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-linear-to-tr from-primary/15 to-accent-light/15 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Action Buttons */}
      <div
        className="w-full max-w-7xl mx-auto flex justify-center items-center py-8 gap-4 max-xs:flex-col flex-wrap"
        ref={buttonsRef}
      >
        <button
          onClick={() => setIsShowingTipSection((prev) => !prev)}
          className="relative text-base max-xs:text-sm font-medium px-8 py-3 rounded-xl border-2 border-primary/30 outline-none cursor-pointer transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 bg-white/80 backdrop-blur-sm overflow-hidden"
        >
          <span className="relative z-10 text-text-heading  transition-colors duration-300">
            {!isShowingTipSection ? "Category Breakdown" : "Show Chart"}
          </span>
          <div className="absolute inset-0 bg-linear-to-r from-accent/5 to-primary/5  transition-opacity duration-300"></div>
        </button>

        <button className=" relative text-base max-xs:text-sm font-medium px-8 py-3 rounded-xl border-2 border-accent/30 outline-none cursor-pointer transition-all duration-300 hover:border-accent hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5 bg-white/80 backdrop-blur-sm overflow-hidden">
          <span className="relative z-10 text-text-heading  transition-colors duration-300">
            Recalculate
          </span>
          <div className="absolute inset-0 bg-linear-to-r from-primary/5 to-accent/5  transition-opacity duration-300"></div>
        </button>

        {!isSavedData && (
          <button
            onClick={() => saveResult()}
            className="relative text-base max-xs:text-sm font-medium px-8 py-3 rounded-xl border-2 border-primary outline-none cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 bg-linear-to-r from-primary to-accent text-white overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isSavingData ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  <span>Saving...</span>
                </>
              ) : (
                "Save Data"
              )}
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-accent to-primary  transition-opacity duration-300"></div>
          </button>
        )}

        {isSavedData && (
          <button
            onClick={() => navigate("/profile")}
            className=" relative text-base max-xs:text-sm font-medium px-8 py-3 rounded-xl border-2 border-success outline-none cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-success/30 hover:-translate-y-0.5 bg-linear-to-r from-success to-accent text-white overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Saved! Go to Profile
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-accent to-success opacity-0  transition-opacity duration-300"></div>
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(ResultSummary);
