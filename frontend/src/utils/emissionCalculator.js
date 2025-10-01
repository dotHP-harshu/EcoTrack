const emissionFactors = {
  transport: {
    train: 0.045, // kg CO₂ per km
    walk: 0, // kg CO₂ per km
    auto: 0.12,
    bus: 0.071,
    bike: 0.07,
    car: 0.155,
  },
  electricity: {
    perINR: 0.9 / 7,
    efficiency: {
      high: 0.85,
      medium: 0.95,
      low: 1,
    },
    habit: {
      always: 0.9,
      often: 0.95, // klfajdkljfkajd
      sometimes: 1,
    },
  },
  diet: {
    occasional: 3.2, // per day
    vegetarian: 2.2,
    nonveg: 4.8,
    vegan: 1.4,
    eatingOut: 0.3,
    packagedFood: {
      never: 0,
      sometimes: 0.5,
      often: 1,
    },
    dairy: {
      none: 0,
      low: 0.5,
      medium: 1,
      high: 1.5,
    },
  },
  shopping: {
    monthly: 10,
    weekly: 30,
    often:45,
    deliveries: 5, // per delivery
  },
  cooking: {
    gas: 5,
    electric: 3,
    induction: 2,
    firewood: 10,
    outside: 3,
  },
  digital: {
    streaming: 0.45, // per hour per day
    devices: 1, // per device/month
    cloud: {
      none: 0,
      light: 2,
      heavy: 5,
    },
  },
  water: {
    bath: {
      "1-2 buckets (15-40L)": 0.5,
      "3-4 buckets (45-80L)": 1,
      "Shower (5-10 minutes)": 1.5,
      "Long shower (>10 min)": 3,
    },
    washingMachine: 1, // per wash
    tapUsage: {
      always: 0.9,
      often: 0.95,
      sometimes: 1,
    },
  },
};

export const calculateCarbonFootprint = (user) => {
  let totalCO2 = 0;
  const categoryEmission = {};
  // 1. Transport
  let transportTotal = 0;
  for (const trip of user.trips) {
    const factor = emissionFactors.transport[trip.mode.toLowerCase()] || 0;
    transportTotal += factor * Number(trip.distance);
  }
  transportTotal *= Number(user.travelDays);
  categoryEmission.transportEmission = transportTotal;
  totalCO2 += transportTotal;

  // 2. Electricity
  let elec = user.electricityBill * emissionFactors.electricity.perINR;
  elec *= emissionFactors.electricity.efficiency[user.energyEfficiency] || 1;
  elec *= emissionFactors.electricity.habit[user.turnOffHabit] || 1;
  categoryEmission.elecEmission = elec;
  totalCO2 += elec;

  // 3. Diet
  const dietBase = emissionFactors.diet[user.dietType] || 0;
  const eatingOut = emissionFactors.diet.eatingOut * user.eatingOut || 0;
  const packaged = emissionFactors.diet.packagedFood[user.packagedFood] || 0;
  const dairy = emissionFactors.diet.dairy[user.dairy] || 0;
  const dietTotal = (dietBase + eatingOut + packaged + dairy) * 30;
  categoryEmission.dietEmission = dietTotal;
  totalCO2 += dietTotal;

  // 4. Shopping
  const shop = emissionFactors.shopping[user.shoppingFreq] || 0;
  const delivery = user.deliveries * emissionFactors.shopping.deliveries;
  totalCO2 += shop + delivery;
  
  // 5. Cooking
  totalCO2 += emissionFactors.cooking[user.cookingMethod] || 0;
  categoryEmission.shoppingEmission =
    shop + delivery + emissionFactors.cooking[user.cookingMethod] || 0;

  // 6. Digital
  const stream = user.streamingHours * emissionFactors.digital.streaming * 30;
  const device = user.deviceCount * emissionFactors.digital.devices || 1;
  const cloud = emissionFactors.digital.cloud[user.cloudStorage] || 0;
  categoryEmission.digitalEmission = stream + device + cloud;
  totalCO2 += stream + device + cloud;

  // 7. Water
  const bath = emissionFactors.water.bath[user.bath] || 0;
  const wash = user.washingMachine * emissionFactors.water.washingMachine || 0;
  const tap = emissionFactors.water.tapUsage[user.tapUsage] || 1;
  const water = (bath * 30 + wash) * tap;
  categoryEmission.waterEmission = water
  totalCO2 += water;

  return { total: totalCO2.toFixed(2) , categoryEmission}; // kg CO₂ per month
};
