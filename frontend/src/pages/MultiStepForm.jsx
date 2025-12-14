// /components/MultiStepForm.jsx
import React, {
  useReducer,
  createContext,
  useContext,
  Suspense,
  lazy,
  useMemo,
} from "react";
import { validateStep } from "../utils/validateStep";
import { calculateCarbonFootprint } from "../utils/emissionCalculator";
import facts from "../assets/facts";
import {
  Bike,
  Handbag,
  SoapDispenserDroplet,
  Soup,
  Tv,
  Zap,
} from "lucide-react";

// Lazy load only input steps
const Step1_Transport = lazy(() => import("../components/Step1_Transport"));
const Step2_Electricity = lazy(() => import("../components/Step2_Electricity"));
const Step3_Diet = lazy(() => import("../components/Step3_Diet"));
const Step4_Shopping = lazy(() => import("../components/Step4_Shopping"));
const Step5_Digital = lazy(() => import("../components/Step5_Digital"));
const Step6_Water = lazy(() => import("../components/Step6_Water"));
const ResultSummary = lazy(() => import("../components/ResultSummary"));

// Only 6 input steps (no result in steps array)
const steps = [
  { id: 0, name: "Transport", icon: <Bike /> },
  { id: 1, name: "Electricity", icon: <Zap /> },
  { id: 2, name: "Diet", icon: <Soup /> },
  { id: 3, name: "Shopping", icon: <Handbag /> },
  { id: 4, name: "Digital", icon: <Tv /> },
  { id: 5, name: "Water", icon: <SoapDispenserDroplet /> },
];

const initialState = {
  currentStep: 0,
  formData: {},
  errors: {},
  isComplete: false, // ✅ New flag
};

const getRandomNumber = (max) => {
  return Math.floor(Math.random() * max);
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "NEXT":
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, steps.length - 1), // This will make sure that the steps are between 0 to 5
      };
    case "PREV":
      return { ...state, currentStep: Math.max(state.currentStep - 1, 0) }; // This will make sure that the steps are between 0 to 5
    case "UPDATE_FIELD":
      return {
        ...state,
        formData: { ...state.formData, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: "" },
      };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "COMPLETE":
      return { ...state, isComplete: true };
    default:
      return state;
  }
};

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

export default function MultiStepForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const goToNext = () => {
    const errors = validateStep(state.currentStep, state.formData);
    if (errors) {
      dispatch({ type: "SET_ERRORS", errors });
      return;
    }

    // If on last step, complete the form
    if (state.currentStep === steps.length - 1) {
      dispatch({ type: "COMPLETE" });
    } else {
      dispatch({ type: "NEXT" });
    }
  };

  const goToPrev = () => {
    if (state.isComplete) {
      // Optional: allow going back from results
      dispatch({ type: "PREV" });
    } else {
      dispatch({ type: "PREV" });
    }
  };

  const updateField = (field, value) => {
    dispatch({ type: "UPDATE_FIELD", field, value });
  };

  const stepColors = {
    0: {
      name: "indigo",
      text600: "#4F46E5",
      text700: "#4338CA",
      bg500: "#6366F1",
      bg50: "#EEF2FF",
      bg0: "#EEF2FF80",
      gradStart: "#E0E7FF", // indigo-100
      gradEnd: "#818CF8", // indigo-400
    },
    1: {
      name: "yellow",
      text600: "#CA8A04",
      text700: "#A16207",
      bg500: "#EAB308",
      bg50: "#FEFCE8",
      bg0: "#FEFCE880",
      gradStart: "#FEF9C3", // yellow-100
      gradEnd: "#F59E0B", // yellow-400
    },
    2: {
      name: "green",
      text600: "#16A34A",
      text700: "#15803D",
      bg500: "#22C55E",
      bg50: "#ECFDF5",
      bg0: "#ECFDF580",
      gradStart: "#D1FAE5", // green-100
      gradEnd: "#4ADE80", // green-400
    },
    3: {
      name: "pink",
      text600: "#DB2777",
      text700: "#BE185D",
      bg500: "#EC4899",
      bg50: "#FDF2F8",
      bg0: "#FDF2F880",
      gradStart: "#FCE7F3", // pink-100
      gradEnd: "#F472B6", // pink-400
    },
    4: {
      name: "sky",
      text600: "#0284C7",
      text700: "#0369A1",
      bg500: "#0EA5E9",
      bg50: "#F0F9FF",
      bg0: "#F0F9FF80",
      gradStart: "#E0F2FE", // sky-100
      gradEnd: "#38BDF8", // sky-400
    },
    5: {
      name: "cyan",
      text600: "#0891B2",
      text700: "#0E7490",
      bg500: "#06B6D4",
      bg50: "#ECFEFF",
      bg0: "#ECFEFF80",
      gradStart: "#CFFAFE", // cyan-100
      gradEnd: "#22D3EE", // cyan-400
    },
  };
  const stepBgs = {
    0: "step1_transport",
    1: "step2_electricity",
    2: "step3_diet",
    3: "step4_shopping",
    4: "step5_digital",
    5: "step6_water",
  };

  const stepBg = stepBgs[state.currentStep];
  const stepColor = stepColors[state.currentStep];

  // Memoize context to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      formData: state.formData,
      errors: state.errors,
      updateField,
    }),
    [state.formData, state.errors, updateField]
  );

  // Render input steps
  const renderInputStep = () => {
    const StepComponents = [
      Step1_Transport,
      Step2_Electricity,
      Step3_Diet,
      Step4_Shopping,
      Step5_Digital,
      Step6_Water,
    ];

    const StepComponent = StepComponents[state.currentStep];

    return (
      <div className="transition-opacity duration-300 ease-in-out">
        <Suspense
          fallback={
            <div className="h-96 flex items-center justify-center">
              Loading...
            </div>
          }
        >
          <StepComponent />
        </Suspense>
      </div>
    );
  };

  function hexToRgba(hex, alpha) {
    // Expand shorthand #abc → #aabbcc
    if (hex.length === 4) {
      hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
    }
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  const fact = useMemo(
    () =>
      facts[state.currentStep][
        getRandomNumber(facts[state.currentStep].length)
      ],
    [state.currentStep]
  );

  // Calculate footprint only when needed
  const footprint = useMemo(() => {
    return state.isComplete ? calculateCarbonFootprint(state.formData) : 0;
  }, [state.isComplete, state.formData]);

  return (
    <FormContext.Provider value={contextValue}>
      {state.isComplete ? (
        <Suspense
          fallback={
            <div className="flex-1 flex items-center justify-center">
              Calculating...
            </div>
          }
        >
          <ResultSummary footprint={footprint} formData={state.formData} />
        </Suspense>
      ) : (
        <div
          className="min-h-screen py-12 px-4 transition-all duration-300 hide-bg"
          style={{
            backgroundColor: `${stepColor.gradStart}`,
            backgroundImage: `url("/images/stepBg/${stepBg}.png") `,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="mx-auto">
            {/* Show progress bar only during input steps */}
            {!state.isComplete && (
              <div className="mb-8 max-w-xl mx-auto">
                <div
                  className={`flex justify-between mb-2 text-sm font-medium`}
                >
                  {steps.map((step, i) => (
                    <span
                      key={step.id}
                      style={
                        i <= state.currentStep
                          ? { color: `${stepColors[i].text600}` }
                          : {}
                      }
                      className={i <= state.currentStep ? `` : "text-gray-400"}
                    >
                      {step.icon}
                    </span>
                  ))}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-500`}
                    style={{
                      width: `${
                        ((state.currentStep + 1) / steps.length) * 100
                      }%`,
                      backgroundColor: `${stepColor.bg500}`,
                    }}
                  ></div>
                </div>
              </div>
            )}

            {/* Form Card */}

            <div className="w-full grid grid-cols-2 px-6 max-sm:grid-cols-1 max-sm:px-4 max-xs:px-0">
              <div className="border-8 border-white rounded-md w-fit h-fit ">
                <div
                  style={{
                    background: `${stepColor.bg50}`,
                    boxShadow: `inset 20px 20px 50px ${hexToRgba(
                      stepColor.bg500,
                      0.1
                    )},
                          inset -20px -20px 50px ${hexToRgba(
                            stepColor.bg500,
                            0.05
                          )}`,
                    border: `1px solid ${stepColor.bg500}`,
                  }}
                  className="max-w-xl min-w-full rounded-md p-6 pl-10 shadow-md min-h-[500px] flex flex-col backdrop-blur-md"
                >
                  {renderInputStep()}

                  {/* Navigation */}
                  <div className="mt-auto pt-6 flex justify-between">
                    <button
                      type="button"
                      onClick={goToPrev}
                      disabled={state.currentStep === 0 && !state.isComplete}
                      style={{ color: `${stepColor.bg500}` }}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        state.currentStep === 0 && !state.isComplete
                          ? " cursor-not-allowed"
                          : " hover:bg-emerald-100"
                      }`}
                    >
                      Back
                    </button>

                    {!state.isComplete ? (
                      <button
                        type="button"
                        onClick={goToNext}
                        style={{ backgroundColor: `${stepColor.bg500}` }}
                        className="px-6 py-2 text-white rounded-lg font-medium cursor-pointer focus:outline-none"
                      >
                        {state.currentStep === steps.length - 1
                          ? "See Results"
                          : "Next"}
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="w-full h-full flex justify-center items-center p-4 max-sm:mt-10 max-xs:p-0">
                <div
                  className="relative py-6 px-6 max-w-lg w-full min-h-40 max-xs:px-4"
                  style={{ backgroundColor: stepColor.bg50 }}
                >
                  <div className=" text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-white left-4 top-0 -translate-y-1/2">
                    <img
                      src={`/images/stepNavIcon/step${
                        state.currentStep + 1
                      }.png`}
                      className="w-16 max-xs:w-10"
                    />
                  </div>
                  <div className="mt-8">
                    <p className="text-base">{fact.fact}</p>
                    <p className="text-base text-right mt-6 font-semibold break-words">
                      {fact.source}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </FormContext.Provider>
  );
}
