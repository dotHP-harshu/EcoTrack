// /components/Step6_Water.jsx
import React from "react";
import { useFormContext } from "../pages/MultiStepForm";
import { Droplets } from "lucide-react";

const Step6_Water = () => {
  const { formData, errors, updateField } = useFormContext();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Water Usage
        <img
          src="/images/stepIcon/step6_heading.png"
          alt="step_heading"
          className="h-16 inline-block w-auto"
        />
      </h2>
      <div>
        <label
          htmlFor="bath"
          className="block text-sm font-medium text-gray-700 mb-1 relative"
        >
          <Droplets
            className="text-cyan-900 inline-block top-1/2 right-full
          -translate-y-1/2 absolute -translate-x-2"
          />
          How much water do you use for your daily bath?
        </label>
        {errors.bath && (
          <p id="dietType-error" className="mt-1 text-sm text-red-600">
            {errors.bath}
          </p>
        )}
        <select
          id="bath"
          value={formData.bath || ""}
          onChange={(e) => updateField("bath", e.target.value)}
          className="w-full p-1 border border-cyan-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
        >
          <option value="">Select...</option>
          <option value="1-2 buckets (15-40L)">1-2 buckets (15-40L)</option>
          <option value="3-4 buckets (45-80L)">3-4 buckets (45-80L)</option>
          <option value="Shower (5-10 minutes)">Shower (5-10 minutes)</option>
          <option value="Long shower (>10 min)">Long shower (10+ min)</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="washingMachine"
          className="block text-sm font-medium text-gray-700 mb-1 relative"
        >
          How many times a week does your family use a washing machine?
          <Droplets
            className="text-cyan-900 inline-block top-1/2 right-full
          -translate-y-1/2 absolute -translate-x-2"
          />
        </label>
        {errors.washingMachine && (
          <p id="dietType-error" className="mt-1 text-sm text-red-600">
            {errors.washingMachine}
          </p>
        )}
        <input
          type="number"
          id="washingMachine"
          min="0"
          max="14"
          value={formData.washingMachine || ""}
          onChange={(e) => updateField("washingMachine", e.target.value)}
          className="w-full p-1 border border-cyan-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="tapUsage"
          className="block text-sm font-medium text-gray-700 mb-1 relative"
        >
          <Droplets
            className="text-cyan-900 inline-block top-1/2 right-full
          -translate-y-1/2 absolute -translate-x-2"
          />
          Do you turn off the tap while brushing your teeth, washing dishes, or
          shaving?
        </label>
        <select
          id="tapUsage"
          value={formData.tapUsage || ""}
          onChange={(e) => updateField("tapUsage", e.target.value)}
          className="w-full p-1 border border-cyan-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
        >
          <option value="">Select</option>
          <option value="never">Never</option>
          <option value="sometimes">Sometimes</option>
          <option value="often">Often(most of the time)</option>
        </select>
      </div>
    </div>
  );
};

export default React.memo(Step6_Water);
