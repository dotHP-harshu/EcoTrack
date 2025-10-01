import React from "react";
import MultiStepForm from "./components/MultiStepForm";

function App() {
  const categoryObject = {
    transportEmission: "low",
    elecEmission: "low",
    dietEmission: "high",
    shoppingEmission: "high",
    digitalEmission: "high",
    waterEmission: "low",
  };
  const categoryEmission={
      transportEmission: 5.3999999999999995,
      elecEmission: 18.565714285714286,
      dietEmission: 99.00000000000001,
      shoppingEmission: 75,
      digitalEmission: 101.5,
      waterEmission: 17,
    }
  return (
    <div>
      <MultiStepForm />
    </div>
  );
}

export default App;
