// src/utils/calculateSeverity.js

export function getCategorySeverity(breakdown, totalEmission) {
  const severity = {};
  Object.entries(breakdown).forEach(([category, value]) => {
    const ratio = value / totalEmission;

    if (ratio >= 0.2) severity[category] = "high";
    else if (ratio >= 0.1) severity[category] = "medium";
    else severity[category] = "low";
  });

  return severity;
}
