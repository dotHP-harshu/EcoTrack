// // carbonCalculator.js

// // --- Emission Factors ---
// const emissionFactors = {
//   transport: {
//     "Two-wheeler": 0.07,
//     Car: 0.192,
//     "Local Bus": 0.027,
//     "Metro/Local Train": 0.045,
//     "Shared auto/cab": 0.12,
//     "Bicycle/Walking": 0,
//     "I don't travel daily": 0,
//   },
//   electricity: {
//     perINR: 0.9,
//     efficiencyReduction: {
//       "Yes, all of them": 0.85,
//       "Some of them": 0.95,
//       "I am not sure": 1,
//       No: 1,
//     },
//     habitReduction: {
//       Always: 0.9,
//       "Most of the time": 0.95,
//       Sometimes: 1,
//       Rarely: 1,
//     },
//   },
//   diet: {
//     "Non-vegetarian (Meat or fish daily)": 4.8,
//     "Occasional Non-vegetarian (1-2 times/week)": 3.2,
//     "Vegetarian (No meat, but milk/cheese)": 2.2,
//     "Vegan (No animal products at all)": 1.5,
//     eatingOut: { Never: 0, "1-2 times": 0.3, "3-5 times": 0.6, Daily: 1 },
//     packagedFood: {
//       Rarely: 0.1,
//       "1-2 times a week": 0.3,
//       "3-5 times a week": 0.6,
//       Daily: 1,
//     },
//     dairy: {
//       "Almost none": 0,
//       "A little (1-2 servings)": 0.5,
//       "A moderate amount": 1,
//       "A lot (>3 servings)": 1.5,
//     },
//   },
//   shopping: {
//     frequency: {
//       "1-2 times in a month": 10,
//       "3-5 times": 20,
//       "6-10 times": 40,
//       "More than 10 times": 60,
//     },
//     deliveriesPerMonth: 5,
//   },
//   cooking: {
//     LPG: 5,
//     "Electric stove": 3,
//     Induction: 1.5,
//     Firewood: 10,
//     "Mostly eat outside": 2,
//   },
//   digital: {
//     streaming: {
//       "Less than 1 hour": 0.1,
//       "1-3 hours": 0.5,
//       "4-6 hours": 1,
//       "6+ hours": 2,
//     },
//   },
//   water: {
//     bath: {
//       "1-2 buckets (15-40L)": 0.5,
//       "3-4 buckets (45-80L)": 1,
//       "Shower (5-10 minutes)": 1.5,
//       "Long shower (>10 min)": 3,
//     },
//     washingMachine: {
//       Never: 0,
//       "1-2 times": 1,
//       "3-5 times": 2,
//       "More than 5 times": 3,
//     },
//     tapUsage: { Yes: 0.8, No: 1 },
//   },
// };

// // --- Helper to safely convert to number ---
// function safeNumber(value, defaultValue = 0) {
//   const n = Number(value);
//   return isNaN(n) ? defaultValue : n;
// }

// // --- Main Function ---
// function calculateCarbonFootprint(userResponses) {
//   const breakdown = {};

//   // 1. Transport
//   const transportFactor =
//     emissionFactors.transport[userResponses.travelMode] || 0;
//   const travelDistance = safeNumber(userResponses.travelDistance);
//   const travelDays = safeNumber(userResponses.travelDays);
//   breakdown.transport = transportFactor * travelDistance * travelDays;

//   // 2. Electricity
//   let elecCO2 =
//     safeNumber(userResponses.electricityBill) *
//     emissionFactors.electricity.perINR;
//   elecCO2 *=
//     emissionFactors.electricity.efficiencyReduction[
//       userResponses.energyEfficiency
//     ] || 1;
//   elecCO2 *=
//     emissionFactors.electricity.habitReduction[userResponses.turnOffHabit] || 1;
//   breakdown.electricity = elecCO2;

//   // 3. Diet
//   const dietBase = emissionFactors.diet[userResponses.dietType] || 0;
//   const dietExtras =
//     (emissionFactors.diet.eatingOut[userResponses.eatingOut] || 0) +
//     (emissionFactors.diet.packagedFood[userResponses.packagedFood] || 0) +
//     (emissionFactors.diet.dairy[userResponses.dairy] || 0);
//   breakdown.diet = (dietBase + dietExtras) * 30; // monthly

//   // 4. Shopping
//   const shoppingFreq =
//     emissionFactors.shopping.frequency[userResponses.shoppingFreq] || 0;
//   const deliveryCO2 =
//     safeNumber(userResponses.deliveries) *
//     emissionFactors.shopping.deliveriesPerMonth;
//   breakdown.shopping = shoppingFreq + deliveryCO2;

//   // 5. Cooking
//   breakdown.cooking = emissionFactors.cooking[userResponses.cookingMethod] || 0;

//   // 6. Digital devices / Streaming
//   breakdown.digital =
//     (emissionFactors.digital.streaming[userResponses.streamingHours] || 0) * 30;

//   // 7. Water usage
//   const bathCO2 = emissionFactors.water.bath[userResponses.bath] || 0;
//   const washingCO2 =
//     emissionFactors.water.washingMachine[userResponses.washingMachine] || 0;
//   const tapMultiplier =
//     emissionFactors.water.tapUsage[userResponses.tapUsage] || 1;
//   breakdown.water = (bathCO2 + washingCO2) * tapMultiplier * 30;

//   // Total
//   breakdown.total = Object.values(breakdown).reduce((sum, val) => sum + val, 0);

//   // Round to 2 decimals
//   for (const key in breakdown) {
//     breakdown[key] = Number(breakdown[key].toFixed(2));
//   }

//   return breakdown;
// }

// // --- Example Usage ---
// const testUser = {
//   travelMode: "Car",
//   travelDistance: 10,
//   travelDays: 20,
//   electricityBill: 2000,
//   energyEfficiency: "Some of them",
//   turnOffHabit: "Most of the time",
//   dietType: "Vegetarian",
//   eatingOut: "1-2 times",
//   packagedFood: "1-2 times a week",
//   dairy: "A little (1-2 servings)",
//   shoppingFreq: "1-2 times in a month",
//   deliveries: 3,
//   cookingMethod: "LPG",
//   streamingHours: "1-3 hours",
//   bath: "Shower (5-10 minutes)",
//   washingMachine: "1-2 times",
//   tapUsage: "Yes",
// };

// const result = calculateCarbonFootprint(testUser);
// console.log("Category-wise breakdown + total CO₂ (kg/month):");
// console.log(result);

const categoryEmission = {
  dietEmission: 114.00000000000001,
  digitalEmission: 41,
  elecEmission: 35.299285714285716,
  shoppingEmission: 22,
  transportEmission: 0,
  waterEmission: 18,
};
  const categoryObject = {
    transportEmission: "Transport",
    elecEmission: "Electricity",
    dietEmission: "Diet",
    shoppingEmission: "Shopping",
    digitalEmission: "Digital",
    waterEmission: "Water",
  };
console.log(Object.keys(categoryObject).map(cat=>categoryEmission[cat]))