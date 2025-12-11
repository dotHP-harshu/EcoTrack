// /components/Step2_Electricity.jsx
import React from "react";
import { useFormContext } from "../pages/MultiStepForm";
import { Lightbulb } from "lucide-react";

const Step2_Electricity = () => {
  const { formData, errors, updateField } = useFormContext();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Electricity Usage
        <img
          src="/images/stepIcon/step2_heading.png"
          alt="step_heading"
          className="h-16 w-auto inline-block"
        />
      </h2>
      <div>
        <label
          htmlFor="electricityBill"
          className="block text-sm font-medium text-gray-700 relative"
        >
          <Lightbulb className="text-yellow-900 inline-block top-1/2 right-full -translate-y-1/2 absolute -translate-x-2" />
          What is your average monthly electricity bill (in ₹)?
        </label>
        <small className="text-xs mb-2">
          (Check a recent bill or ask your family)
        </small>
        <input
          type="number"
          id="electricityBill"
          min="0"
          step="0.01"
          value={formData.electricityBill || ""}
          onChange={(e) => updateField("electricityBill", e.target.value)}
          className="w-full p-1 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
          aria-invalid={!!errors.electricityBill}
          aria-describedby={
            errors.electricityBill ? "electricityBill-error" : undefined
          }
        />
        {errors.electricityBill && (
          <p id="electricityBill-error" className="mt-1 text-sm text-red-600">
            {errors.electricityBill}
          </p>
        )}
      </div>

      <div>
        <legend className="block text-sm font-medium text-gray-700 mb-2 relative">
          Do you use energy-saving appliances or gadgets?
          <Lightbulb className="text-yellow-900 inline-block top-1/2 right-full -translate-y-1/2 absolute -translate-x-2" />
        </legend>
        <div className="space-y-3">
          {[
            { value: "high", label: "all of them" },
            { value: "medium", label: "Some of them" },
            {
              value: "low",
              label: "Low (older appliances, incandescent bulbs)",
            },
          ].map((opt) => (
            <label
              key={opt.value}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <input
                type="radio"
                name="energyEfficiency"
                value={opt.value}
                checked={formData.energyEfficiency === opt.value}
                onChange={(e) =>
                  updateField("energyEfficiency", e.target.value)
                }
                className="h-4 w-4 text-yellow-600 focus:ring-yellow-500"
                aria-invalid={!!errors.energyEfficiency}
              />
              <span className="text-gray-700">{opt.label}</span>
            </label>
          ))}
        </div>
        {errors.energyEfficiency && (
          <p className="mt-1 text-sm text-red-600">{errors.energyEfficiency}</p>
        )}
      </div>

      <div>
        <legend className="block text-sm font-medium text-gray-700 mb-2 relative">
          <Lightbulb className="text-yellow-900 inline-block top-1/2 right-full -translate-y-1/2 absolute -translate-x-2" />
          How often do you remember to turn off lights and fans when you leave a
          room?
        </legend>
        <div className="space-y-3">
          {[
            { value: "always", label: "Always" },
            { value: "sometimes", label: "Sometimes" },
            { value: "rarely", label: "Rarely" },
          ].map((opt) => (
            <label
              key={opt.value}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <input
                type="radio"
                name="turnOffHabit"
                value={opt.value}
                checked={formData.turnOffHabit === opt.value}
                onChange={(e) => updateField("turnOffHabit", e.target.value)}
                className="h-4 w-4 text-yellow-600 focus:ring-yellow-500"
              />
              <span className="text-gray-700">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Step2_Electricity);
