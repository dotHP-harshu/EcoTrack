// ideal factors in kg per month
const idealFactor = {
  transportEmission: 40,
  elecEmission: 30,
  dietEmission: 25,
  shoppingEmission: 30,
  digitalEmission: 10,
  waterEmission: 15,
};

export function calclulateBenchMark(breakdown) {
  const categoryBenchmark = {};
  Object.keys(breakdown).forEach((cate) => {
    let ratio = idealFactor[cate] / breakdown[cate]; ;

    if (ratio <= 0.2) {
      categoryBenchmark[cate] = "High";
    } else if (ratio <= 0.9 && ratio > 0.2) {
      categoryBenchmark[cate] = "Medium";
    } else {
      categoryBenchmark[cate] = "Low";
    }
  });
  return categoryBenchmark;
}
