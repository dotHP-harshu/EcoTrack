import { Loader2, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Doughnut } from "react-chartjs-2";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function CfhItemPopup({ cfh , setIsShowingPopup}) {
  const [graphData, setGraphData] = useState(null);
  const [isShowingGraph, setisShowingGraph] = useState(false);
  const [categoryBreakdown, setCategoryBreakdown] = useState(null);
  const [isShowingBreakdown, setIsShowingBreakdown] = useState(false);

  useEffect(() => {
    const categoryEmission = cfh.categoryEmission;
    const data = {
      labels: ["Transport", "Electric", "Diet", "Shopping", "Digital", "Water"],
      datasets: [
        {
          label: "Emission",
          data: [
            categoryEmission.transportEmission,
            categoryEmission.elecEmission,
            categoryEmission.dietEmission,
            categoryEmission.shoppingEmission,
            categoryEmission.digitalEmission,
            categoryEmission.waterEmission,
          ],
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
    setGraphData(data);
    setisShowingGraph(true);
  }, []);

  useEffect(() => {
    const categoryBreakdown = cfh.categoryBreakdown;
    setCategoryBreakdown(categoryBreakdown);
    setIsShowingBreakdown(true);
  }, []);

  return (
    <section className="w-dvw h-dvh fixed top-0 left-0 z-10 bg-[#0000006e] backdrop-blur-sm flex justify-center items-center">
      <div className="w-[90dvw] h-[90dvh] relative bg-bg-alt  p-6 rounded-md ">
        <button
          className="absolute top-6 right-10 cursor-pointer"
          onClick={() => setIsShowingPopup(false)}
        >
          <X className="text-primary" size={20} />{" "}
        </button>
        <h1 className="font-bulter font-bold text-3xl">Details of April 12</h1>
        <div className="w-full grid grid-cols-2 mt-6">
          <div className="p-6 flex justify-center items-center">
            {!isShowingGraph && <Loader2 className="animate-spin" />}
            {isShowingGraph && graphData && (
                <div className="p-4">
                    <Doughnut  data={graphData} />
                </div>
            )}
          </div>
          <div className="min-h-60 flex justify-center items-center">
            {!isShowingBreakdown && <Loader2 className="animate-spin" />}

            {isShowingBreakdown && categoryBreakdown && (
              <div className="p-4">
                <h3 className="text-2xl font-bold font-heartfield">
                  Inputted Information
                </h3>
                <ul className="w-full max-h-88 px-6 overflow-y-auto scroller mt-4">
                  <li>
                    <h4 className="text-xl font-semibold mt-1">• Travel</h4>
                    <p className="text-text-light mt-0.5 text-base pl-4">
                      Travel Days: {categoryBreakdown.travelDays}
                    </p>

                    <h5 className="font-medium">Trips</h5>
                    {categoryBreakdown.trips?.map((t, idx) => (
                      <p
                        className="text-text-light mt-0.5 text-base pl-4"
                        key={idx}
                      >
                        Mode: <b>{t.mode}</b>, Distance: <b>{t.distance} km</b>
                      </p>
                    ))}
                  </li>

                  <li>
                    <h4 className="text-xl font-semibold mt-1">
                      • Energy Usage
                    </h4>
                    <p className="text-text-light mt-0.5 text-base pl-4">
                      Electricity Bill: {categoryBreakdown.electricityBill}
                    </p>
                    <p className="text-text-light mt-0.5 text-base pl-4">
                      Energy Efficiency: {categoryBreakdown.energyEfficiency}
                    </p>
                  </li>

                  <li>
                    <h4 className="text-xl font-semibold mt-1">
                      • Food Consumption
                    </h4>
                    <p className="text-text-light mt-0.5 text-base pl-4">
                      Diet Type: {categoryBreakdown.dietType}
                    </p>
                    <p className="text-text-light mt-0.5 text-base pl-4">
                      Eating Out: {categoryBreakdown.eatingOut}
                    </p>
                    <p className="text-text-light mt-0.5 text-base pl-4">
                      Packaged Food: {categoryBreakdown.packagedFood}
                    </p>
                    <p className="text-text-light mt-0.5 text-base pl-4">
                      Dairy: {categoryBreakdown.dairy}
                    </p>
                  </li>

                  <li>
                    <h4 className="text-xl font-semibold mt-1">
                      • Shopping & Deliveries
                    </h4>
                    <p className="text-text-light mt-0.5 text-base pl-4">
                      Shopping Frequency: {categoryBreakdown.shoppingFreq}
                    </p>
                    <p className="text-text-light mt-0.5 text-base pl-4">
                      Deliveries: {categoryBreakdown.deliveries}
                    </p>
                  </li>

                  <li>
                    <h4 className="text-xl font-semibold mt-1">• Cooking</h4>
                    <p className="text-text-light mt-0.5 text-base pl-4">
                      Method: {categoryBreakdown.cookingMethod}
                    </p>
                  </li>

                  <li>
                    <h4 className="text-xl font-semibold mt-1">
                      • Digital Usage
                    </h4>
                    <p className="text-text-light mt-0.5 text-base pl-4">
                      Streaming Hours: {categoryBreakdown.streamingHours}
                    </p>
                    <p className="text-text-light mt-0.5 text-base pl-4">
                      Device Count: {categoryBreakdown.deviceCount}
                    </p>
                    <p className="text-text-light mt-0.5 text-base pl-4">
                      Cloud Storage: {categoryBreakdown.cloudStorage}
                    </p>
                  </li>

                  <li>
                    <h4 className="text-xl font-semibold mt-1">
                      • Water Usage
                    </h4>
                    <p className="text-text-light mt-0.5 text-base pl-4">
                      Bath: {categoryBreakdown.bath}
                    </p>
                    <p className="text-text-light mt-0.5 text-base pl-4">
                      Washing Machine Loads: {categoryBreakdown.washingMachine}
                    </p>
                    <p className="text-text-light mt-0.5 text-base pl-4">
                      Tap Usage: {categoryBreakdown.tapUsage}
                    </p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CfhItemPopup;
