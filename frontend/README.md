import React, { useState, useMemo, useEffect } from "react";
import {
  Car,
  Zap,
  Utensils,
  ShoppingBag,
  Monitor,
  Droplets,
  ArrowLeft,
  ArrowRight,
  Check,
  Leaf,
} from "lucide-react";

// Main application component containing all logic and sub-components.
// All styles are handled with Tailwind CSS for a single, modern file.
const App = () => {
  // Use a single state object for form data to simplify state management.
  const [formData, setFormData] = useState({
    travelMode: "",
    travelDistance: 0,
    travelDays: 0,
    electricityBill: 0,
    energyEfficiency: "",
    turnOffHabit: "",
    dietType: "",
    eatingOut: "",
    packagedFood: "",
    dairy: "",
    shoppingFreq: "",
    deliveries: 0,
    cookingMethod: "",
    streamingHours: "",
    bath: "",
    washingMachine: "",
    tapUsage: null,
  });

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 6;
  const isFinalStep = step > totalSteps;

  // Use a key on the component to force re-render and trigger a new animation.
  const stepKey = useMemo(() => step, [step]);

  // Handle form input changes. This function is passed to child components.
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear the specific error for the field being updated.
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // Validation logic for each step.
  const validateStep = () => {
    const newErrors = {};
    let isValid = true;

    // A single source of truth for all validation rules.
    switch (step) {
      case 1:
        if (!formData.travelMode)
          newErrors.travelMode = "Please select a travel mode.";
        if (!formData.travelDistance || formData.travelDistance <= 0)
          newErrors.travelDistance = "Please enter a valid distance.";
        if (!formData.travelDays || formData.travelDays <= 0)
          newErrors.travelDays = "Please enter valid days per month.";
        break;
      case 2:
        if (!formData.electricityBill || formData.electricityBill <= 0)
          newErrors.electricityBill = "Please enter a valid electricity bill.";
        if (!formData.energyEfficiency)
          newErrors.energyEfficiency = "Please select an option.";
        if (!formData.turnOffHabit)
          newErrors.turnOffHabit = "Please select an option.";
        break;
      case 3:
        if (!formData.dietType)
          newErrors.dietType = "Please select your diet type.";
        if (!formData.eatingOut)
          newErrors.eatingOut = "Please select a frequency.";
        if (!formData.packagedFood)
          newErrors.packagedFood = "Please select an option.";
        if (!formData.dairy) newErrors.dairy = "Please select an option.";
        break;
      case 4:
        if (!formData.shoppingFreq)
          newErrors.shoppingFreq = "Please select a frequency.";
        if (!formData.deliveries < 0)
          newErrors.deliveries = "Please enter a valid number.";
        if (!formData.cookingMethod)
          newErrors.cookingMethod = "Please select a method.";
        break;
      case 5:
        if (!formData.streamingHours)
          newErrors.streamingHours = "Please select hours.";
        break;
      case 6:
        if (!formData.bath) newErrors.bath = "Please select a preference.";
        if (!formData.washingMachine)
          newErrors.washingMachine = "Please select a frequency.";
        if (formData.tapUsage === null)
          newErrors.tapUsage = "Please select an option.";
        break;
      default:
        break;
    }

    setErrors(newErrors);
    isValid = Object.keys(newErrors).length === 0;
    return isValid;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step < totalSteps) {
        setStep(step + 1);
      } else {
        setIsSubmitting(true);
        setTimeout(() => {
          setIsSubmitting(false);
          setStep(step + 1);
        }, 800);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // More realistic (but still simplified) calculation logic using weighted values.
  const calculateFootprint = () => {
    let footprint = 0;
    const weights = {
      travelMode: {
        car: 300,
        "two-wheeler": 150,
        bus: 100,
        metro: 50,
        walking: 0,
        cycling: 0,
      },
      travelDistance: 0.1, // kg CO2 per km
      travelDays: 5,
      electricityBill: 0.5, // kg CO2 per dollar
      energyEfficiency: { yes: -50, some: -20, no: 0 },
      turnOffHabit: { always: -30, sometimes: -10, rarely: 0 },
      dietType: {
        omnivore: 200,
        flexitarian: 150,
        pescatarian: 100,
        vegetarian: 50,
        vegan: 0,
      },
      eatingOut: { daily: 80, weekly: 50, monthly: 20, rarely: 0 },
      packagedFood: { high: 60, medium: 30, low: 10 },
      dairy: { high: 70, medium: 40, low: 10, none: 0 },
      shoppingFreq: { weekly: 50, "bi-weekly": 30, monthly: 10, rarely: 0 },
      deliveries: 10, // kg CO2 per delivery
      cookingMethod: {
        lpg: 40,
        electric: 50,
        induction: 20,
        firewood: 80,
        solar: 0,
      },
      streamingHours: { "0-1": 10, "1-2": 20, "2-4": 40, "4-6": 60, "6+": 80 },
      bath: { shower: 20, bucket: 10, both: 15 },
      washingMachine: { daily: 50, weekly: 20, "bi-weekly": 10, monthly: 5 },
      tapUsage: { true: 0, false: 20 },
    };

    footprint += weights.travelMode[formData.travelMode] || 0;
    footprint += formData.travelDistance * weights.travelDistance;
    footprint += formData.travelDays * weights.travelDays;
    footprint += formData.electricityBill * weights.electricityBill;
    footprint += weights.energyEfficiency[formData.energyEfficiency] || 0;
    footprint += weights.turnOffHabit[formData.turnOffHabit] || 0;
    footprint += weights.dietType[formData.dietType] || 0;
    footprint += weights.eatingOut[formData.eatingOut] || 0;
    footprint += weights.packagedFood[formData.packagedFood] || 0;
    footprint += weights.dairy[formData.dairy] || 0;
    footprint += weights.shoppingFreq[formData.shoppingFreq] || 0;
    footprint += formData.deliveries * weights.deliveries;
    footprint += weights.cookingMethod[formData.cookingMethod] || 0;
    footprint += weights.streamingHours[formData.streamingHours] || 0;
    footprint += weights.bath[formData.bath] || 0;
    footprint += weights.washingMachine[formData.washingMachine] || 0;
    footprint += weights.tapUsage[formData.tapUsage] || 0;

    return Math.max(0, Math.round(footprint)); // Ensure footprint is not negative
  };

  // Reusable component for the step progress and title.
  const StepHeader = ({ currentStep }) => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-medium text-gray-600 animate-fade-in">
          {currentStep <= totalSteps
            ? `Step ${currentStep} of ${totalSteps}`
            : "Complete"}
        </span>
        {currentStep <= totalSteps && (
          <span className="text-sm text-gray-500 flex items-center gap-2 animate-fade-in">
            {getStepIcon(currentStep)}
            {getStepTitle(currentStep)}
          </span>
        )}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-green-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${(currentStep / (totalSteps + 1)) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  // Sub-component for each form step.
  const Step1_Transport = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Primary Travel Mode
        </label>
        <select
          value={formData.travelMode}
          onChange={(e) => handleInputChange("travelMode", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
        >
          <option value="">Select your primary mode</option>
          <option value="two-wheeler">Two-wheeler</option>
          <option value="car">Car</option>
          <option value="bus">Bus</option>
          <option value="metro">Metro</option>
          <option value="walking">Walking</option>
          <option value="cycling">Cycling</option>
        </select>
        {errors.travelMode && (
          <p className="text-red-500 text-sm mt-1">{errors.travelMode}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Average Daily Distance (km)
        </label>
        <input
          type="number"
          value={formData.travelDistance}
          onChange={(e) =>
            handleInputChange("travelDistance", Number(e.target.value))
          }
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
          placeholder="Enter distance in km"
        />
        {errors.travelDistance && (
          <p className="text-red-500 text-sm mt-1">{errors.travelDistance}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Travel Days per Month
        </label>
        <input
          type="number"
          value={formData.travelDays}
          onChange={(e) =>
            handleInputChange("travelDays")(Number(e.target.value))
          }
          min="0"
          max="31"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
          placeholder="Enter days per month"
        />
        {errors.travelDays && (
          <p className="text-red-500 text-sm mt-1">{errors.travelDays}</p>
        )}
      </div>
    </div>
  );

  const Step2_Electricity = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Monthly Electricity Bill ($)
        </label>
        <input
          type="number"
          value={formData.electricityBill}
          onChange={(e) =>
            handleInputChange("electricityBill")(Number(e.target.value))
          }
          min="0"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
          placeholder="Enter your monthly bill"
        />
        {errors.electricityBill && (
          <p className="text-red-500 text-sm mt-1">{errors.electricityBill}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Energy Efficient Appliances?
        </label>
        <select
          value={formData.energyEfficiency}
          onChange={(e) =>
            handleInputChange("energyEfficiency")(e.target.value)
          }
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
        >
          <option value="">Select an option</option>
          <option value="yes">Yes</option>
          <option value="some">Some</option>
          <option value="no">No</option>
        </select>
        {errors.energyEfficiency && (
          <p className="text-red-500 text-sm mt-1">{errors.energyEfficiency}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Turn Off Lights When Not in Use?
        </label>
        <select
          value={formData.turnOffHabit}
          onChange={(e) => handleInputChange("turnOffHabit")(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
        >
          <option value="">Select your habit</option>
          <option value="always">Always</option>
          <option value="sometimes">Sometimes</option>
          <option value="rarely">Rarely</option>
        </select>
        {errors.turnOffHabit && (
          <p className="text-red-500 text-sm mt-1">{errors.turnOffHabit}</p>
        )}
      </div>
    </div>
  );

  const Step3_Diet = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Diet Type
        </label>
        <select
          value={formData.dietType}
          onChange={(e) => handleInputChange("dietType")(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
        >
          <option value="">Select your diet</option>
          <option value="vegan">Vegan</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="pescatarian">Pescatarian</option>
          <option value="flexitarian">Flexitarian</option>
          <option value="omnivore">Omnivore</option>
        </select>
        {errors.dietType && (
          <p className="text-red-500 text-sm mt-1">{errors.dietType}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          How Often Do You Eat Out?
        </label>
        <select
          value={formData.eatingOut}
          onChange={(e) => handleInputChange("eatingOut")(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
        >
          <option value="">Select frequency</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="rarely">Rarely</option>
        </select>
        {errors.eatingOut && (
          <p className="text-red-500 text-sm mt-1">{errors.eatingOut}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Packaged Food Consumption
        </label>
        <select
          value={formData.packagedFood}
          onChange={(e) => handleInputChange("packagedFood")(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
        >
          <option value="">Select your consumption</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        {errors.packagedFood && (
          <p className="text-red-500 text-sm mt-1">{errors.packagedFood}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Dairy Consumption
        </label>
        <select
          value={formData.dairy}
          onChange={(e) => handleInputChange("dairy")(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
        >
          <option value="">Select your consumption</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
          <option value="none">None</option>
        </select>
        {errors.dairy && (
          <p className="text-red-500 text-sm mt-1">{errors.dairy}</p>
        )}
      </div>
    </div>
  );

  const Step4_Shopping = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Shopping Frequency
        </label>
        {["weekly", "bi-weekly", "monthly", "rarely"].map((freq) => (
          <label
            key={freq}
            className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors duration-150"
          >
            <input
              type="radio"
              name="shoppingFreq"
              value={freq}
              checked={formData.shoppingFreq === freq}
              onChange={(e) =>
                handleInputChange("shoppingFreq")(e.target.value)
              }
              className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500 cursor-pointer"
            />
            <span className="capitalize">{freq.replace("-", " ")}</span>
          </label>
        ))}
        {errors.shoppingFreq && (
          <p className="text-red-500 text-sm mt-1">{errors.shoppingFreq}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Online Deliveries per Month
        </label>
        <input
          type="number"
          value={formData.deliveries}
          onChange={(e) =>
            handleInputChange("deliveries")(Number(e.target.value))
          }
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
          placeholder="Enter number of deliveries"
        />
        {errors.deliveries && (
          <p className="text-red-500 text-sm mt-1">{errors.deliveries}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Primary Cooking Method
        </label>
        <select
          value={formData.cookingMethod}
          onChange={(e) => handleInputChange("cookingMethod")(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
        >
          <option value="">Select cooking method</option>
          <option value="lpg">LPG</option>
          <option value="electric">Electric</option>
          <option value="induction">Induction</option>
          <option value="firewood">Firewood</option>
          <option value="solar">Solar</option>
        </select>
        {errors.cookingMethod && (
          <p className="text-red-500 text-sm mt-1">{errors.cookingMethod}</p>
        )}
      </div>
    </div>
  );

  const Step5_Digital = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Streaming Hours per Day
        </label>
        <select
          value={formData.streamingHours}
          onChange={(e) => handleInputChange("streamingHours")(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
        >
          <option value="">Select hours</option>
          <option value="0-1">0-1 hours</option>
          <option value="1-2">1-2 hours</option>
          <option value="2-4">2-4 hours</option>
          <option value="4-6">4-6 hours</option>
          <option value="6+">6+ hours</option>
        </select>
        {errors.streamingHours && (
          <p className="text-red-500 text-sm mt-1">{errors.streamingHours}</p>
        )}
      </div>
    </div>
  );

  const Step6_Water = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Bathing Preference
        </label>
        <select
          value={formData.bath}
          onChange={(e) => handleInputChange("bath")(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
        >
          <option value="">Select your preference</option>
          <option value="shower">Shower</option>
          <option value="bucket">Bucket</option>
          <option value="both">Both</option>
        </select>
        {errors.bath && (
          <p className="text-red-500 text-sm mt-1">{errors.bath}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Washing Machine Usage
        </label>
        <select
          value={formData.washingMachine}
          onChange={(e) => handleInputChange("washingMachine")(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
        >
          <option value="">Select usage frequency</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="bi-weekly">Bi-weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        {errors.washingMachine && (
          <p className="text-red-500 text-sm mt-1">{errors.washingMachine}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Turn Off Tap While Brushing/Washing?
        </label>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => handleInputChange("tapUsage")(true)}
            className={`px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 ${
              formData.tapUsage === true
                ? "bg-green-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => handleInputChange("tapUsage")(false)}
            className={`px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 ${
              formData.tapUsage === false
                ? "bg-green-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            No
          </button>
        </div>
        {errors.tapUsage && (
          <p className="text-red-500 text-sm mt-1">{errors.tapUsage}</p>
        )}
      </div>
    </div>
  );

  const ResultPage = () => {
    const footprint = calculateFootprint();
    return (
      <div className="text-center space-y-6">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-bounce-slow">
          <Leaf className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 animate-slide-up">
          Thank You!
        </h2>
        <p
          className="text-gray-600 animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          Your carbon footprint assessment is complete.
        </p>
        <div
          className="bg-green-50 rounded-lg p-8 border border-green-200 shadow-lg animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <p className="text-lg text-gray-700 mb-3">
            Your estimated footprint is:
          </p>
          <p className="text-4xl font-bold text-green-600 animate-pulse-slow">
            {footprint} kg CO₂ / month
          </p>
        </div>
        <p
          className="text-sm text-gray-500 max-w-md mx-auto animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          This is a preliminary estimate based on your responses. Actual
          footprint may vary based on additional factors.
        </p>
      </div>
    );
  };

  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return <Step1_Transport key={stepKey} />;
      case 2:
        return <Step2_Electricity key={stepKey} />;
      case 3:
        return <Step3_Diet key={stepKey} />;
      case 4:
        return <Step4_Shopping key={stepKey} />;
      case 5:
        return <Step5_Digital key={stepKey} />;
      case 6:
        return <Step6_Water key={stepKey} />;
      case 7:
        return <ResultPage key={stepKey} />;
      default:
        return <Step1_Transport key={stepKey} />;
    }
  };

  const getStepIcon = (stepNum) => {
    const icons = {
      1: <Car className="w-5 h-5" />,
      2: <Zap className="w-5 h-5" />,
      3: <Utensils className="w-5 h-5" />,
      4: <ShoppingBag className="w-5 h-5" />,
      5: <Monitor className="w-5 h-5" />,
      6: <Droplets className="w-5 h-5" />,
    };
    return icons[stepNum] || null;
  };

  const getStepTitle = (stepNum) => {
    const titles = {
      1: "Travel & Transport",
      2: "Electricity Usage",
      3: "Diet & Food",
      4: "Shopping & Cooking",
      5: "Digital Usage",
      6: "Water Consumption",
    };
    return titles[stepNum] || null;
  };

  // Define custom animations using a style tag to keep everything in one file.
  // This is a common pattern for single-file components.
  const animatedClasses = {
    fadeIn: "animate-[fade-in_0.6s_ease-out_forwards]",
    slideUp: "animate-[slide-up_0.6s_ease-out_forwards]",
    pulseSlow: "animate-[pulse-slow_2s_ease-in-out_infinite]",
    bounceSlow: "animate-[bounce-slow_2s_ease-in-out_infinite]",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 font-sans">
      <style>
        {`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bounce-slow { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-10px); } 60% { transform: translateY(-5px); } }
        @keyframes pulse-slow { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        .step-transition-enter { opacity: 0; transform: translateX(20px); }
        .step-transition-enter-active { opacity: 1; transform: translateX(0); transition: opacity 0.3s ease-out, transform 0.3s ease-out; }
        .step-transition-exit { opacity: 1; transform: translateX(0); }
        .step-transition-exit-active { opacity: 0; transform: translateX(-20px); transition: opacity 0.3s ease-out, transform 0.3s ease-out; }
        `}
      </style>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1
            className={`text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3 ${animatedClasses.fadeIn}`}
          >
            <Leaf className={`text-green-600 ${animatedClasses.pulseSlow}`} />
            EcoTrack
          </h1>
          <p
            className={`text-gray-600 ${animatedClasses.fadeIn}`}
            style={{ animationDelay: "0.1s" }}
          >
            Calculate your carbon footprint
          </p>
        </div>

        <div
          className={`bg-white p-6 rounded-xl shadow-lg ${animatedClasses.fadeIn}`}
          style={{ animationDelay: "0.2s" }}
        >
          <StepHeader currentStep={step} />

          <div className="min-h-96">{renderCurrentStep()}</div>

          {!isFinalStep && (
            <div
              className={`flex justify-between mt-8 ${animatedClasses.fadeIn}`}
            >
              <button
                onClick={handleBack}
                disabled={step === 1}
                className={`px-6 py-3 rounded-xl flex items-center font-medium transition-all duration-200 transform hover:scale-105 ${
                  step === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                }`}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={isSubmitting}
                className={`px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 flex items-center font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 ${
                  isSubmitting && "opacity-50 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : step === totalSteps ? (
                  "Submit"
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </div>
          )}

          {isFinalStep && (
            <div className={`text-center mt-8 ${animatedClasses.fadeIn}`}>
              <button
                onClick={() => {
                  setStep(1);
                  setFormData({
                    travelMode: "",
                    travelDistance: 0,
                    travelDays: 0,
                    electricityBill: 0,
                    energyEfficiency: "",
                    turnOffHabit: "",
                    dietType: "",
                    eatingOut: "",
                    packagedFood: "",
                    dairy: "",
                    shoppingFreq: "",
                    deliveries: 0,
                    cookingMethod: "",
                    streamingHours: "",
                    bath: "",
                    washingMachine: "",
                    tapUsage: null,
                  });
                  setErrors({});
                }}
                className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Calculate Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
