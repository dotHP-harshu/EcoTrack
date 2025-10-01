import { Car, Droplet, ShoppingCart, Soup, Tv, Zap } from "lucide-react";
import { tipData } from "../assets/tipData";

const colors = {
  transportEmission: {
    name: "indigo",
    text600: "#4F46E5",
    text700: "#4338CA",
    bg500: "#6366F1",
    bg50: "#EEF2FF",
    bg0: "#EEF2FF80",
    gradStart: "#E0E7FF", // indigo-100
    gradEnd: "#818CF8", // indigo-400
  },
  elecEmission: {
    name: "yellow",
    text600: "#CA8A04",
    text700: "#A16207",
    bg500: "#EAB308",
    bg50: "#FEFCE8",
    bg0: "#FEFCE880",
    gradStart: "#FEF9C3", // yellow-100
    gradEnd: "#F59E0B", // yellow-400
  },
  dietEmission: {
    name: "green",
    text600: "#16A34A",
    text700: "#15803D",
    bg500: "#22C55E",
    bg50: "#ECFDF5",
    bg0: "#ECFDF580",
    gradStart: "#D1FAE5", // green-100
    gradEnd: "#4ADE80", // green-400
  },
  shoppingEmission: {
    name: "pink",
    text600: "#DB2777",
    text700: "#BE185D",
    bg500: "#EC4899",
    bg50: "#FDF2F8",
    bg0: "#FDF2F880",
    gradStart: "#FCE7F3", // pink-100
    gradEnd: "#F472B6", // pink-400
  },
  digitalEmission: {
    name: "sky",
    text600: "#0284C7",
    text700: "#0369A1",
    bg500: "#0EA5E9",
    bg50: "#F0F9FF",
    bg0: "#F0F9FF80",
    gradStart: "#E0F2FE", // sky-100
    gradEnd: "#38BDF8", // sky-400
  },
  waterEmission: {
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

 const categoryObject = {
   transportEmission: "Transport",
   elecEmission: "Electricity",
   dietEmission: "Diet",
   shoppingEmission: "Shopping",
   digitalEmission: "Digital",
   waterEmission: "Water",
 };

export const makeTipObject = (factor, benchmark, categoryEmission) => {
  const tipObject = {};

  tipObject["factor"] = factor;
  tipObject["benchmark"] = benchmark;
  tipObject["colors"] = colors[factor];
  tipObject["name"] = categoryObject[factor];
  const tipCate = tipData[factor];
  tipObject["tips"] = tipCate[benchmark];
  tipObject["emission"] = categoryEmission[factor].toFixed(2)
  return tipObject;
};
