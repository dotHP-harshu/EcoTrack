// /utils/validateStep.js

export const validateStep = (step, data) => {
  const errors = {};

  switch (step) {
    case 0: // Transport
      // Validate trips array
      if (!Array.isArray(data.trips) || data.trips.length === 0) {
        errors.trips = [
          { mode: "At least one transport mode required", distance: "" },
        ];
      } else {
        const tripErrors = [];
        let hasValidTrip = false;

        data.trips.forEach((trip, index) => {
          const tripError = {};

          // Validate mode
          if (!trip.mode) {
            tripError.mode = "Required";
          }

          // Validate distance
          const distance = parseFloat(trip.distance);
          if (!trip.distance || isNaN(distance) || distance <= 0) {
            tripError.distance = "Must be > 0";
          }

          // Check if this trip is valid (both fields filled correctly)
          if (!tripError.mode && !tripError.distance) {
            hasValidTrip = true;
          }

          tripErrors[index] = tripError;
        });

        // Only show errors if no valid trip exists
        if (!hasValidTrip) {
          errors.trips = tripErrors;
        }
      }
      if (!data.travelDays || data.travelDays <= 0)
        errors.travelDays = "Must be > 0";
      break;
    case 1: // Electricity
      if (!data.electricityBill || data.electricityBill <= 0)
        errors.electricityBill = "Required";
      if (!data.energyEfficiency) errors.energyEfficiency = "Required";
      break;
    case 2: // Diet
      if (!data.dietType) errors.dietType = "Required";
      break;
    case 3: // Shopping
      if (!data.shoppingFreq) errors.shoppingFreq = "Required";
      if (!data.deliveries) errors.deliveries = "Required";
      if (!data.cookingMethod) errors.cookingMethod = "Required";
      break;
    case 4: // Digital
      if (!data.streamingHours || data.streamingHours < 0) {
        errors.streamingHours = "Input a valid Number of Hours";
      }
      // if (!data.devices) errors.devices = "Required";
      break;
    case 5: // Water
      if (!data.bath || data.bath === "") errors.bath = "Required";
    if (!data.washingMachine || data.washingMachine<0) errors.washingMachine = "Required";
      break;
    default:
      break;
  }

  return Object.keys(errors).length === 0 ? null : errors;
};
