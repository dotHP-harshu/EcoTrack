// /components/Step4_Shopping.jsx
import React from "react";
import { useFormContext } from "../pages/MultiStepForm";
import { ShoppingCart } from "lucide-react";

const Step4_Shopping = () => {
  const { formData, errors, updateField } = useFormContext();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Shopping Habits
        <img
          src="/images/stepIcon/step4_heading.png"
          alt="step_heading"
          className="h-16 w-auto inline-block"
        />
      </h2>
      <div>
        <label
          htmlFor="shoppingFreq"
          className="block text-sm font-medium text-gray-700 mb-1 relative"
        >
          <ShoppingCart
            className="text-pink-900 inline-block top-1/2 right-full
          -translate-y-1/2 absolute -translate-x-2"
          />
          how you often shop for clothes, electronics or gadgets online?
        </label>
        {errors.shoppingFreq && (
          <p id="dietType-error" className="mt-1 text-sm text-red-600">
            {errors.shoppingFreq}
          </p>
        )}
        <select
          id="shoppingFreq"
          value={formData.shoppingFreq || ""}
          onChange={(e) => updateField("shoppingFreq", e.target.value)}
          className="w-full p-1 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
        >
          <option value="">Select</option>
          <option value="rarely">Rarely (only when needed)</option>
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="deliveries"
          className="block text-sm font-medium text-gray-700 relative"
        >
          <ShoppingCart
            className="text-pink-900 inline-block top-1/2 right-full
          -translate-y-1/2 absolute -translate-x-2"
          />
          How many online deliveries do you get per month?
        </label>
        {errors.deliveries && (
          <p id="dietType-error" className="mt-1 text-sm text-red-600">
            {errors.deliveries}
          </p>
        )}
        <small className="text-xs block mb-3">
          (This could be for groceries, gadgets, clothes, etc.)
        </small>
        <input
          type="number"
          id="deliveries"
          min="0"
          max="14"
          value={formData.deliveries || ""}
          onChange={(e) => updateField("deliveries", e.target.value)}
          className="w-full p-1 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="cookingMethod"
          className="block text-sm font-medium text-gray-700 mb-1 relative"
        >
          <ShoppingCart
            className="text-pink-900 inline-block top-1/2 right-full
          -translate-y-1/2 absolute -translate-x-2"
          />
          What do you use for cooking most of the time?
        </label>
        {errors.cookingMethod && (
          <p id="dietType-error" className="mt-1 text-sm text-red-600">
            {errors.cookingMethod}
          </p>
        )}
        <select
          id="cookingMethod"
          value={formData.cookingMethod || ""}
          onChange={(e) => updateField("cookingMethod", e.target.value)}
          className="w-full p-1 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
        >
          <option value="">Select</option>
          <option value="electric">Electric stove/oven</option>
          <option value="gas">Gas stove</option>
          <option value="induction">Induction</option>
          <option value="firewood">Firewood</option>
        </select>
      </div>
    </div>
  );
};

export default React.memo(Step4_Shopping);
