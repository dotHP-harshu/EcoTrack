// /components/ResultSummary.jsx
import React, { useState } from "react";
import Chart from "react-google-charts";
import { calclulateBenchMark } from "../utils/benchMarkCalculator";
import { makeTipObject } from "../utils/tipDataCalculator";
import TipCard from "./TipCard";
import { addCfhApi } from "../services/api";

const ResultSummary = ({ footprint, formData }) => {
  const [isShowingTipSection, setIsShowingTipSection] = React.useState(false);
  const [tips, setTips] = useState([]);
  console.log({ footprint, formData });

  const categoryObject = {
    transportEmission: "Transport",
    elecEmission: "Electricity",
    dietEmission: "Diet",
    shoppingEmission: "Shopping",
    digitalEmission: "Digital",
    waterEmission: "Water",
  };
  const chartData = Object.entries(footprint.categoryEmission).map((cate) => {
    return [categoryObject[cate[0]], cate[1]];
  });

  const benchMarks = calclulateBenchMark(footprint.categoryEmission);
  console.log(benchMarks);
  const data = [["Category", "kg CO2 per month"], ...chartData];

  const saveResult = async () => {
    const { data, error } = await addCfhApi(
      "68a8a1f30a8eb419665a6253",
      footprint?.total,
      footprint?.categoryEmission,
      formData,
      tips
    );
    if (error) return console.log("❌");
    console.log(data);
  };

  const options = {
    title: "Monthly Carbon Emission in Kg",
    pieHole: 0.4,
    is3D: true,
    sliceVisibilityThreshold: 0,
    backgroundColor: "transparent",
    legend: {
      position: "bottom",
      alignment: "end",
    },
    colors: ["#4338CA", "#A16207", "#15803D", "#BE185D", "#0369A1", "0E7490"],
  };
  console.log(footprint);

  return (
    <div className="p-6 bg-background">
      <div className="w-full h-fit grid grid-cols-2 max-sm:grid-cols-1">
        <div className="flex flex-col items-start justify-center gap-6 px-4">
          <h1 className="text-lg font-light tracking-wide uppercase max-xs:text-base">
            Your Carbon Footprint
          </h1>
          <p className="text-6xl font-bold tracking-tight max-xs:text-3xl">
            {footprint?.total} <br /> kg Co<sub>2</sub> per month
          </p>
          <p className="text-lg font-light tracking-wide max-xs:text-sm">
            This is your estimated monthly carbon footprint based on your
            provided activities. Every small change makes a difference.
          </p>
        </div>
        <div className="p-4 flex justify-center items-center">
          <img
            src="/images/result_banner.png"
            alt="result"
            className="w-full object-center"
          />
        </div>
      </div>

      <div className="relative w-full min-h-[600px]">
        {isShowingTipSection ? (
          <div
            className={` transition-all duration-500 ease-in-out ${
              isShowingTipSection
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 "
            }`}
          >
            <div className="w-full grid lg:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 max-xs:px-4 place-items-center gap-6 lg:px-[10vw] max-lg:px-[5vw] py-10">
              {Object.keys(categoryObject).map((cat, i) => {
                const tipObject = makeTipObject(
                  cat,
                  benchMarks[cat],
                  footprint.categoryEmission
                );
                setTips((prev) => [...prev, tipObject]);
                return (
                  <TipCard key={i} tipObject={tipObject} formData={formData} />
                );
              })}
              {console.log(tips)}
            </div>
          </div>
        ) : (
          <div
            className={` transition-all duration-500 ease-in-out ${
              isShowingTipSection
                ? "opacity-0 scale-95 "
                : "opacity-100 scale-100 "
            }`}
          >
            <div className="w-full max-w-4xl mx-auto aspect-video transition-all duration-500 ease-in-out scale-100 hover:scale-[1.02] my-6">
              <Chart
                chartType="PieChart"
                width="100%"
                height="100%"
                data={data}
                options={options}
              />
            </div>
          </div>
        )}
      </div>
      <div className="w-full flex justify-center items-center py-6 gap-4 max-xs:flex-col flex-wrap">
        <button
          onClick={() => setIsShowingTipSection((prev) => !prev)}
          className="text-base max-xs:text-xs font-mono px-4 py-1 rounded-md border-2 border-border-dark outline-none cursor-pointer transition-colors duration-300 hover:bg-white"
        >
          {!isShowingTipSection ? "Category Breakdown" : "Show Chart"}
        </button>
        <button className="text-base max-xs:text-xs font-mono px-4 py-1 rounded-md border-2 border-border-dark outline-none cursor-pointer transition-colors duration-300 hover:bg-white">
          Recalculate
        </button>
        <button
          onClick={() => saveResult()}
          className="text-base max-xs:text-xs font-mono px-4 py-1 rounded-md border-2 border-border-dark outline-none cursor-pointer transition-colors duration-300 hover:bg-white"
        >
          Save Results
        </button>
        <button className="text-base max-xs:text-xs font-mono px-4 py-1 rounded-md border-2 border-border-dark outline-none cursor-pointer transition-colors duration-300 hover:bg-white">
          Get AI Suggestion
        </button>
      </div>
    </div>
  );
};

export default React.memo(ResultSummary);

