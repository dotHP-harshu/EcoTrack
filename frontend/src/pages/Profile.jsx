import React, { useState, useEffect, useRef } from "react";
import {
  Loader,
  X,
  Calendar,
  TrendingDown,
  Sparkles,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { aiTipApi, cfhListApi, recentCfhApi } from "../services/api";
import CfhItemPopup from "../components/CfhItemPopup";
import AiTipPopUp from "../components/AiTipPopUp";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler
);

function Profile() {
  const [isShowingPopup, setIsShowingPopup] = useState(false);
  const [isShowingAiPopup, setIsShowingAiPopup] = useState(false);
  const [cfh, setCfh] = useState("");
  const [isShowingLineGraph, setIsShowingLineGraph] = useState(false);
  const [graphData, setGraphData] = useState(null);
  const [isShowingHistory, setIsShowingHistory] = useState(false);

  const profileRef = useRef(null);
  const historyRef = useRef(null);
  const listItemsRef = useRef([]);

  const {
    data: cfhList,
    isLoading: isLoadingCfhList,
    error: cfhListError,
  } = useQuery({
    queryKey: ["cfhList"],
    queryFn: () => recentCfhApi("68a8a1f30a8eb419665a6253"),
  });

  const {
    data: history,
    isLoading: isLoadingHistory,
    error: historyError,
    refetch: historyRefetch,
  } = useQuery({
    queryKey: ["history"],
    queryFn: () => cfhListApi("68a8a1f30a8eb419665a6253"),
    enabled: false,
  });

  const getHistory = () => {
    historyRefetch();
    setIsShowingHistory(true);
  };

  const settingCfh = (id, list) => {
    const cfhItem = Object.values(list?.data?.data).filter((c) => c._id == id);
    setCfh(cfhItem[0]);
  };

  // GSAP Animations
  // useGSAP(() => {
  //   // Profile section animation
  //   gsap.from(profileRef.current, {
  //     opacity: 0,
  //     y: -30,
  //     duration: 0.8,
  //     ease: "power3.out",
  //   });

  //   // History section animation
  //   gsap.from(historyRef.current, {
  //     opacity: 0,
  //     y: 30,
  //     duration: 0.8,
  //     delay: 0.2,
  //     ease: "power3.out",
  //   });

  //   // Stagger animation for list items
  //   if (listItemsRef.current.length > 0) {
  //     gsap.from(listItemsRef.current, {
  //       opacity: 0,
  //       x: -20,
  //       duration: 0.5,
  //       stagger: 0.1,
  //       ease: "power2.out",
  //       delay: 0.4,
  //     });
  //   }
  // }, [cfhList]);

  useEffect(() => {
    if (!isLoadingCfhList && cfhList) {
      const recentCfh = Object.values(cfhList?.data?.data);
      const labels = recentCfh.map((c) =>
        new Date(c.createdAt).toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
        })
      );
      const dataset = recentCfh.map((c) => c.totalEmission);
      const data = {
        labels,
        datasets: [
          {
            fill: true,
            label: "Kg Co2",
            data: dataset,
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
      };
      setGraphData(data);
    }

    return () => {};
  }, [cfhList]);

  console.log(cfhList)
  
  if(isLoadingCfhList){
    return(
       <div className="h-dvh w-dvw">
        <Loader className="animate-spin"/>
      </div>

    )
  }

  if(cfhList?.error && !isLoadingCfhList || history?.error && !isLoadingHistory){
    return(
      <div className="h-dvh w-dvw">
        <AlertTriangle/>
        <h2>{cfhList?.error?.message || history?.error?.message || "An error occurred while connecting to the server"}</h2>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-bg-base via-bg-subtle to-bg-muted p-6 md:p-10">
      {/* Profile Section */}
      <section
        ref={profileRef}
        className="profile-section w-full p-8 rounded-2xl bg-white shadow-lg shadow-shadow border border-border/20 relative overflow-hidden"
      >
        {/* Decorative gradient overlay */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-accent/10 to-primary/10 rounded-full blur-3xl z-0"></div>

        <div className="profile-wrapper flex items-center gap-6 relative z-10">
          <div className="profile-img-wrapper w-24 h-24 rounded-full bg-lineear-to-br from-accent to-primary shadow-lg flex items-center justify-center text-white text-3xl font-bold relative overflow-hidden group">
            <div className="absolute inset-0 bg-linear-to-br from-accent-light to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10">HP</span>
          </div>
          <div className="profile-detail">
            <h2 className="text-4xl max-xs:text-3xl font-heartfield font-bold tracking-tight text-text-heading mb-1">
              Hello, Harsh Prajapti!
            </h2>
            <p className="text-lg max-xs:text-base text-text-light flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent" />
              Welcome to your EcoTrack Profile
            </p>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section
        ref={historyRef}
        className="w-full p-8 bg-white rounded-2xl shadow-lg shadow-shadow border border-border/20 mt-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <TrendingDown className="w-7 h-7 text-primary" />
          <h2 className="text-3xl font-bulter text-text-heading">
            Your Footprint History
          </h2>
        </div>

        {/* History Container */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Graph Section */}
          <div className="bg-linear-to-br from-primary/5 to-accent/5 rounded-xl p-6 min-h-[500px] border border-primary/10">
            {isShowingLineGraph && (
              <div className="w-full h-full flex justify-center items-center">
                <Loader className="animate-spin" />
              </div>
            )}
            {!isShowingLineGraph && graphData && (
              <div className="p-4 h-full w-full">
                <Line
                  data={graphData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: true,
                        position: "top",
                      },
                      title: {
                        display: true,
                        text: "Carbon Footprint Over Time",
                        font: {
                          size: 16,
                          weight: "bold",
                        },
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: "CO₂ Emissions (kg)",
                        },
                      },
                    },
                  }}
                />
              </div>
            )}
          </div>

          {/* Lists of History */}
          <div className="bg-linear-to-br from-bg-subtle to-bg-muted rounded-xl overflow-hidden border border-border/20">
            <div className="p-4 bg-white border-b border-border/20">
              <h3 className="text-lg font-semibold text-text-heading">
                Recent Activity
              </h3>
            </div>
            <ul className="space-y-3 p-4 max-h-[450px] overflow-y-auto scroller">
              {isLoadingCfhList && (
                <div className="w-full h-full flex justify-center items-center py-20">
                  <Loader className="animate-spin text-primary w-8 h-8" />
                </div>
              )}

              {!isLoadingCfhList && cfhList.error && (
                <div className="w-full h-full flex justify-center items-center py-20">
                  <p>{cfhList.message}</p>
                </div>
              )}

              {!isLoadingCfhList &&
                cfhList &&
                Object.values(cfhList?.data?.data).length === 0 && (
                  <div className="text-center py-20">
                    <p className="text-text-light text-lg">
                      No history available yet.
                    </p>
                    <p className="text-text-light/60 text-sm mt-2">
                      Start tracking your carbon footprint!
                    </p>
                  </div>
                )}

              {!isLoadingCfhList &&
                cfhList?.data?.data &&
                Object.values(cfhList?.data?.data).length > 0 &&
                Object.values(cfhList?.data?.data).map((cfh, index) => (
                  <li
                    key={cfh._id}
                    ref={(el) => (listItemsRef.current[index] = el)}
                    className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-border/10 hover:border-accent/30 group"
                  >
                    <div className="flex justify-between items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="w-4 h-4 text-primary" />
                          <h1 className="text-lg font-bold tracking-tight text-text-heading">
                            {new Date(cfh.createdAt).toLocaleString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </h1>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-accent"></div>
                          <h3 className="text-base font-semibold text-text-light">
                            {cfh.totalEmission} kg CO₂
                          </h3>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            settingCfh(cfh._id, cfhList);
                            setIsShowingPopup(true);
                          }}
                          className="bg-linear-to-r from-primary to-primary-hover text-white px-4 py-2 rounded-lg cursor-pointer font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-1"
                        >
                          View
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            settingCfh(cfh._id, cfhList);
                            setIsShowingAiPopup(true);
                          }}
                          className="bg-linear-to-r from-accent to-accent-hover text-white px-4 py-2 rounded-lg cursor-pointer font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-1"
                        >
                          <Sparkles className="w-4 h-4" />
                          AI Tips
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>

        {/* all history  */}
      <section className="mt-10 w-full p-8 rounded-2xl bg-white shadow-lg shadow-shadow border border-border/20 relative overflow-hidden">
        {!isShowingHistory && (
          <div className="w-full flex justify-center items-center">
            <button onClick={getHistory} className="border-none outline-none px-4 underline text-lg font-light cursor-pointer hover:text-primary-hover">
              Show History
            </button>
          </div>
        )}
        { isShowingHistory &&
          <div>
            <h3 className="text-2xl font-bold font-bulter">All History</h3>
            <ul className="space-y-3 p-4">
              {isLoadingHistory && (
                <div className="w-full h-full flex justify-center items-center py-20">
                  <Loader className="animate-spin text-primary w-8 h-8" />
                </div>
              )}
              {!isLoadingHistory && historyError && (
                <div className="w-full h-full flex justify-center items-center py-20">
                  <p>{historyError.message}</p>
                </div>
              )}

              {!isLoadingHistory &&
                history &&
                Object.values(history?.data?.data).length === 0 && (
                  <div className="text-center py-20">
                    <p className="text-text-light text-lg">
                      No history available yet.
                    </p>
                    <p className="text-text-light/60 text-sm mt-2">
                      Start tracking your carbon footprint!
                    </p>
                  </div>
                )}

              {!isLoadingHistory &&
                history?.data?.data &&
                Object.values(history?.data?.data).length > 0 &&
                Object.values(history?.data?.data).map((cfh, index) => (
                  <li
                    key={cfh._id}
                    className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-border/10 hover:border-accent/30 group"
                  >
                    <div className="flex justify-between items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="w-4 h-4 text-primary" />
                          <h1 className="text-lg font-bold tracking-tight text-text-heading">
                            {new Date(cfh.createdAt).toLocaleString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </h1>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-accent"></div>
                          <h3 className="text-base font-semibold text-text-light">
                            {cfh.totalEmission} kg CO₂
                          </h3>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            settingCfh(cfh._id, history);
                            setIsShowingPopup(true);
                          }}
                          className="bg-linear-to-r from-primary to-primary-hover text-white px-4 py-2 rounded-lg cursor-pointer font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-1"
                        >
                          View
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            settingCfh(cfh._id, history);
                            setIsShowingAiPopup(true);
                          }}
                          className="bg-linear-to-r from-accent to-accent-hover text-white px-4 py-2 rounded-lg cursor-pointer font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-1"
                        >
                          <Sparkles className="w-4 h-4" />
                          AI Tips
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        }
      </section>

      {/* Popups */}
      {isShowingPopup && (
        <CfhItemPopup cfh={cfh} setIsShowingPopup={setIsShowingPopup} />
      )}
      {isShowingAiPopup && (
        <AiTipPopUp setIsShowingAiPopup={setIsShowingAiPopup} cfh={cfh} setCfh={setCfh} />
      )}
    </main>
  );
}

export default Profile;
