// /components/Step1_Transport.jsx
import React from "react";
import { useFormContext } from "../pages/MultiStepForm";
import { Car, Trash2 } from "lucide-react";

const Step1_Transport = () => {
  const { formData, errors, updateField } = useFormContext();
  const trips = formData.trips || [{ mode: "", distance: "" }];

  const addTrip = () => {
    updateField("trips", [...trips, { mode: "", distance: "" }]);
  };

  const updateTrip = (index, field, value) => {
    const newTrips = [...trips];
    newTrips[index][field] = value;
    updateField("trips", newTrips);
  };

  const removeTrip = (index) => {
    if (trips.length <= 1) return;
    const newTrips = trips.filter((_, i) => i !== index);
    updateField("trips", newTrips);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        How do you get around?
        <img
          src="/images/stepIcon/step1_heading.png"
          alt="step_heading"
          className="h-12 w-auto inline-block"
        />
      </h2>

      <div className="space-y-1">
        <p className="text-base relative">
          <Car className="text-indigo-900 inline-block top-1/2 right-full -translate-y-1/2 absolute -translate-x-2" />
          What is your primary way of getting around for college or work?
        </p>
        <small className="text-xs mb-2">
          (Choose the one you use most often.)
        </small>
        {trips.map((trip, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row gap-4 p-1 rounded-lg"
          >
            <div className="flex-1">
              <label
                htmlFor={`mode-${index}`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {index === 0 ? "Primary Transport Mode" : "Additional Mode"}
              </label>
              <select
                id={`mode-${index}`}
                value={trip.mode}
                onChange={(e) => updateTrip(index, "mode", e.target.value)}
                className="w-full p-1 border border-indigo-300 rounded-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                aria-invalid={!!(errors.trips && errors.trips[index]?.mode)}
                aria-describedby={
                  errors.trips && errors.trips[index]?.mode
                    ? `mode-${index}-error`
                    : undefined
                }
              >
                <option value="">Select</option>
                <option value="walk">Walk</option>
                <option value="car">Car</option>
                <option value="bus">Bus</option>
                <option value="train">Train</option>
                <option value="bike">Bike</option>
                <option value="auto">Auto</option>
              </select>
              {errors.trips && errors.trips[index]?.mode && (
                <p
                  id={`mode-${index}-error`}
                  className="mt-1 text-sm text-red-600"
                >
                  {errors.trips[index].mode}
                </p>
              )}
            </div>

            <div className="flex-1">
              <label
                htmlFor={`distance-${index}`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                One-way Distance (km)
              </label>
              <input
                type="number"
                id={`distance-${index}`}
                min="0"
                step="0.1"
                value={trip.distance}
                onChange={(e) => updateTrip(index, "distance", e.target.value)}
                className="w-full p-1 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                aria-invalid={!!(errors.trips && errors.trips[index]?.distance)}
                aria-describedby={
                  errors.trips && errors.trips[index]?.distance
                    ? `distance-${index}-error`
                    : undefined
                }
              />
              {errors.trips && errors.trips[index]?.distance && (
                <p
                  id={`distance-${index}-error`}
                  className="mt-1 text-sm text-red-600"
                >
                  {errors.trips[index].distance}
                </p>
              )}
            </div>

            {trips.length > 1 && (
              <div className="flex items-end pb-1">
                <button
                  type="button"
                  onClick={() => removeTrip(index)}
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                  aria-label={`Remove transport mode ${index + 1}`}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addTrip}
        className="flex items-center gap-2 px-4 text-indigo-600 font-medium hover:text-indigo-800"
      >
        <span>+</span> Add another mode
      </button>

      <div>
        <label
          htmlFor="travelDays"
          className="block text-sm font-medium text-gray-700 mb-1 relative"
        >
          <Car
            className="text-indigo-900 inline-block top-1/2 right-full
          -translate-y-1/2 absolute -translate-x-2"
          />
          Travel Days per Week
        </label>
        <input
          type="number"
          id="travelDays"
          min="0"
          max="7"
          value={formData.travelDays || ""}
          onChange={(e) => updateField("travelDays", e.target.value)}
          className="w-full mt-2 p-1 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          aria-invalid={!!errors.travelDays}
          aria-describedby={errors.travelDays ? "travelDays-error" : undefined}
        />
        {errors.travelDays && (
          <p id="travelDays-error" className="mt-1 text-sm text-red-600">
            {errors.travelDays}
          </p>
        )}
      </div>
    </div>
  );
};

export default React.memo(Step1_Transport);
