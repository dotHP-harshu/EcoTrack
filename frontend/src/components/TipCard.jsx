import { Car, Droplet, ShoppingCart, Soup, Tv, Zap } from "lucide-react";

import React, { useState } from "react";
const icons = {
  transportEmission: <Car size={32} className="text-indigo-700" />,
  elecEmission: <Zap size={32} className="text-yellow-700" />,
  dietEmission: <Soup size={32} className="text-green-700" />,
  shoppingEmission: <ShoppingCart size={32} className="text-pink-700" />,
  digitalEmission: <Tv size={32} className="text-sky-700" />,
  waterEmission: <Droplet size={32} className="text-cyan-700" />,
};

function TipCard({ tipObject, formData }) {
  const [isShowingTip, setIsShowingTip] = useState(true);

  return (
    <div
      className="max-w-[300px] w-[300px]  min-h-[350px] bg-amber-50 rounded-2xl overflow-hidden p-6 max-xs:p-3 space-y-4 max-xs:w-full"
      style={{
        background: tipObject.colors.bg50,
        boxShadow: `
                   inset 4px 4px 8px ${tipObject.colors.bg50},
                   0 1px 3px ${tipObject.colors.gradEnd}cc,
                   0 4px 6px ${tipObject.colors.gradEnd}99,
                   0 5px 10px ${tipObject.colors.gradEnd}d6`,
      }}
    >
      <div className="flex justify-between items-center">
        <span className="flex justify-center items-center gap-2">
          {icons[tipObject.factor]}{" "}
          {tipObject.benchmark === "High" && (
            <span className="px-2 py-1 inline-block rounded-md bg-rose-100 text-rose-700 font-semibold">
              High
            </span>
          )}
          {tipObject.benchmark === "Medium" && (
            <span className="px-2 py-1 inline-block rounded-md bg-yellow-100 text-yellow-700 font-semibold">
              Medium
            </span>
          )}
          {tipObject.benchmark === "Low" && (
            <span className="px-2 py-1 inline-block rounded-md bg-emerald-100 text-emerald-700 font-semibold">
              Low
            </span>
          )}
        </span>

        <span>
          <h1 className="text-lg max-xs:text-base text-right font-semibold">
            {tipObject.name}
          </h1>
          <h3 className="text-lg max-xs:text-base text-right font-bold">
            {tipObject.emission} Kg CO<sub>2</sub>
          </h3>
        </span>
      </div>

      <hr className="border-2" />

      <div className="relative h-40 overflow-hidden">
        <div
          className={`absolute inset-0 transition-all duration-500 ease-in-out ${
            isShowingTip
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-full"
          }`}
        >
          <h2 className="text-base font-semibold">Eco Tips:</h2>
          {tipObject.tips &&
            tipObject.tips.map((tip, i) => (
              <p key={i} className="text-base italic tracking-normal">
                <span className="font-semibold">{i + 1}:. </span>
                {tip.tip}
              </p>
            ))}
          {}
        </div>

        <div
          className={`absolute inset-0 transition-all duration-500 ease-in-out ${
            isShowingTip
              ? "opacity-0 translate-x-full"
              : "opacity-100 translate-x-0"
          }`}
        >
          <h2 className="text-base font-semibold">Category Breakdown:</h2>
          {tipObject.factor === "transportEmission" && (
            <ul className="list-disc pl-4 italic">
              {formData.trips.map((trip, index) => (
                <li key={index}>
                  You traveled {trip.distance} km by {trip.mode}.
                </li>
              ))}
              <li>Total travel days: {formData.travelDays}</li>
            </ul>
          )}
          {tipObject.factor === "elecEmission" && (
            <ul className="list-disc pl-4 italic">
              <li>Monthly bill: ₹{formData.electricityBill}</li>
              <li>Appliance efficiency: {formData.energyEfficiency}</li>
              <li>Turn-off habit: {formData.turnOffHabit}</li>
            </ul>
          )}
          {tipObject.factor === "dietEmission" && (
            <ul className="list-disc pl-4 italic">
              <li>Diet type: {formData.dietType}</li>
              <li>Eating out: {formData.eatingOut} times</li>
              <li>Packaged food: {formData.packagedFood}</li>
            </ul>
          )}
          {tipObject.factor === "shoppingEmission" && (
            <ul className="list-disc pl-4 italic">
              <li>Shopping frequency: {formData.shoppingFreq}</li>
              <li>Food deliveries: {formData.deliveries}</li>
              <li>Cooking method: {formData.cookingMethod}</li>
            </ul>
          )}
          {tipObject.factor === "digitalEmission" && (
            <ul className="list-disc pl-4 italic">
              <li>Streaming hours: {formData.streamingHours}</li>
              <li>Devices used: {formData.deviceCount}</li>
              <li>Cloud storage: {formData.cloudStorage}</li>
            </ul>
          )}
          {tipObject.factor === "waterEmission" && (
            <ul className="list-disc pl-4 italic">
              <li>Bathing method: {formData.bath}</li>
              <li>Washing machine cycles: {formData.washingMachine}</li>
              <li>Tap usage habit: {formData.tapUsage}</li>
            </ul>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center">
        <button
          onClick={() => setIsShowingTip((prev) => !prev)}
          style={{ background: tipObject.colors.bg500 }}
          className="text-cente px-4 py-1 rounded-lg hover:rounded-3xl transition-all duration-500 cursor-pointer font-mono"
        >
          {isShowingTip ? "Check Breakdown" : "Show Eco Tips"}
        </button>
      </div>
    </div>
  );
}

export default TipCard;
