// /components/Step5_Digital.jsx
import React from "react";
import { useFormContext } from "./MultiStepForm";
import { QrCode } from "lucide-react";

const Step5_Digital = () => {
  const { formData, errors, updateField } = useFormContext();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Digital Footprint
        <img
          src="/images/stepIcon/step5_heading.png"
          alt="step_heading"
          className="h-16 w-auto inline-block"
        />
      </h2>
      <div>
        <label
          htmlFor="streamingHours"
          className="block text-sm font-medium text-gray-700 relative"
        >
          <QrCode
            className="text-sky-900 inline-block top-1/2 right-full
          -translate-y-1/2 absolute -translate-x-2"
          />
          On average, how many hours do you spend streaming videos or running
          digital devies(like mobile, tv etc) daily?
        </label>
        <small className="text-xs block mb-3">
          (Average screen time including all devices.)
        </small>
        {errors.streamingHours && (
          <p id="dietType-error" className="mt-1 text-sm text-red-600">
            {errors.streamingHours}
          </p>
        )}
        <input
          type="number"
          id="streamingHours"
          min="0"
          step="0.5"
          max="24"
          value={formData.streamingHours || ""}
          onChange={(e) => updateField("streamingHours", e.target.value)}
          className="w-full p-1 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="deviceCount"
          className="block text-sm font-medium text-gray-700 mb-1 relative"
        >
          <QrCode
            className="text-sky-900 inline-block top-1/2 right-full
          -translate-y-1/2 absolute -translate-x-2"
          />
          Number of Active Devices (phones, laptops, tablets)
        </label>
        {errors.devices && (
          <p id="dietType-error" className="mt-1 text-sm text-red-600">
            {errors.devices}
          </p>
        )}
        <input
          type="number"
          id="deviceCount"
          min="1"
          max="10"
          value={formData.deviceCount || ""}
          onChange={(e) => updateField("deviceCount", e.target.value)}
          className="w-full p-1 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="cloudStorage"
          className="block text-sm font-medium text-gray-700 mb-1 relative"
        >
          <QrCode
            className="text-sky-900 inline-block top-1/2 right-full
          -translate-y-1/2 absolute -translate-x-2"
          />
          Do you use cloud storage or backup services?
        </label>
        <select
          id="cloudStorage"
          value={formData.cloudStorage || ""}
          onChange={(e) => updateField("cloudStorage", e.target.value)}
          className="w-full p-1 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
        >
          <option value="">Select</option>
          <option value="none">No</option>
          <option value="light">Light use (photos, docs)</option>
          <option value="heavy">Heavy use (videos, backups)</option>
        </select>
      </div>
    </div>
  );
};

export default React.memo(Step5_Digital);
