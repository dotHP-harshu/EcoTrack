// /components/Step3_Diet.jsx
import React from "react";
import { useFormContext } from "./MultiStepForm";
import { Carrot } from "lucide-react";

const Step3_Diet = () => {
  const { formData, errors, updateField } = useFormContext();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Your Diet
        <img
          src="/images/stepIcon/step3_heading.png"
          alt="step_heading"
          className="h-16 w-auto inline-block"
        />
      </h2>
      <div>
        <label
          htmlFor="dietType"
          className="block text-sm font-medium text-gray-700 relative"
        >
          <Carrot className="text-green-900 inline-block top-1/2 right-full -translate-y-1/2 absolute -translate-x-2" />
          What kind of diet do you follow?
        </label>
        <small className="text-xs mb-3 block">
          (Choose the one that best fits you)
        </small>
        <select
          id="dietType"
          value={formData.dietType || ""}
          onChange={(e) => updateField("dietType", e.target.value)}
          className="w-full p-1 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
          aria-invalid={!!errors.dietType}
          aria-describedby={errors.dietType ? "dietType-error" : undefined}
        >
          <option value="">Select</option>
          <option value="vegan">
            Vegan(No animal products, including dairy products)
          </option>
          <option value="vegetarian">
            Vegetarian(No meat, but milk/cheese)
          </option>
          <option value="occasional">
            Occasional Non-vegetarian (1-2 times/week)
          </option>
          <option value="nonveg">Non-vegetarian (Meat or fish daily)</option>
        </select>
        {errors.dietType && (
          <p id="dietType-error" className="mt-1 text-sm text-red-600">
            {errors.dietType}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="eatingOut"
          className="block text-sm font-medium text-gray-700 relative"
        >
          <Carrot className="text-green-900 inline-block top-1/2 right-full -translate-y-1/2 absolute -translate-x-2" />
          How many times a week do you eat out or order food online?
        </label>
        <small className="text-xs block mb-3">
          (From a restaurant, cafe, or online food apps)
        </small>
        <input
          type="number"
          id="eatingOut"
          min="0"
          max="21"
          value={formData.eatingOut || ""}
          onChange={(e) => updateField("eatingOut", e.target.value)}
          className="w-full p-1 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="packagedFood"
          className="block text-sm font-medium text-gray-700 relative"
        >
          <Carrot className="text-green-900 inline-block top-1/2 right-full -translate-y-1/2 absolute -translate-x-2" />
          How often do you buy packaged or processed snacks and drinks?
        </label>
        <small className="text-xs block mb-3">
          (e.g., chips, biscuits, sodas, juice boxes)
        </small>
        <select
          id="packagedFood"
          value={formData.packagedFood || ""}
          onChange={(e) => updateField("packagedFood", e.target.value)}
          className="w-full p-1 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
        >
          <option value="">Select</option>
          <option value="rarely">Rarely</option>
          <option value="sometimes">Sometimes (1-2 times a week)</option>
          <option value="often">Often(3-5 times a week)</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="dairy"
          className="block text-sm font-medium text-gray-700 relative"
        >
          <Carrot className="text-green-900 inline-block top-1/2 right-full -translate-y-1/2 absolute -translate-x-2" />
          How much milk or dairy products do you consume per day?
        </label>
        <small className="text-xs block mb-3">
          (e.g., milk for tea, coffee, curd, paneer)
        </small>
        <select
          id="dairy"
          value={formData.dairy || ""}
          onChange={(e) => updateField("dairy", e.target.value)}
          className="w-full p-1 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
        >
          <option value="">Select</option>
          <option value="none">Almost none</option>
          <option value="low">A little (1–2 servings)</option>
          <option value="medium">A moderate amount (3-5 servings)</option>
          <option value="high">A lot (5+ servings)</option>
        </select>
      </div>
    </div>
  );
};

export default React.memo(Step3_Diet);
