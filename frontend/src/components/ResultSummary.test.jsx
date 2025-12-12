// ResultSummary.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ResultSummary from "./ResultSummary";

// Mock react-router (component imports from "react-router")
const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

// Mock GSAP + useGSAP
jest.mock("gsap", () => ({
  from: jest.fn(),
  to: jest.fn(),
  registerPlugin: jest.fn(),
}));

jest.mock("@gsap/react", () => ({
  useGSAP: (fn) => {
    // call animation function immediately (no real GSAP context)
    if (typeof fn === "function") fn();
  },
}));

// Mock react-chartjs-2 Doughnut chart
jest.mock("react-chartjs-2", () => ({
  Doughnut: ({ data }) => (
    <div data-testid="doughnut-chart">
      Mock Doughnut Chart (datasets: {data?.datasets?.[0]?.data?.join(",")})
    </div>
  ),
}));

// Mock TipCard so we can easily detect tips rendering
jest.mock("./TipCard", () => (props) => (
  <div data-testid="tip-card">TipCard mock</div>
));

// Mock API
import { addCfhApi } from "../services/api";
jest.mock("../services/api", () => ({
  addCfhApi: jest.fn(),
}));

// Helper data
const mockFootprint = {
  total: 123,
  categoryEmission: {
    transportEmission: 10,
    elecEmission: 20,
    dietEmission: 30,
    shoppingEmission: 5,
    digitalEmission: 15,
    waterEmission: 3,
  },
};

const mockFormData = {
  name: "Test User",
};

describe("ResultSummary", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders total footprint and chart by default", () => {
    render(<ResultSummary footprint={mockFootprint} formData={mockFormData} />);

    // Total footprint text
    expect(
      screen.getByText(/123/i) // footprint.total
    ).toBeInTheDocument();

    // Chart visible initially
    expect(screen.getByTestId("doughnut-chart")).toBeInTheDocument();

    // Toggle button should say "Category Breakdown" when chart is shown
    expect(
      screen.getByRole("button", { name: /Category Breakdown/i })
    ).toBeInTheDocument();
  });

  test("toggles from chart view to tips view", async () => {
    render(<ResultSummary footprint={mockFootprint} formData={mockFormData} />);

    // Initially chart is shown
    expect(screen.getByTestId("doughnut-chart")).toBeInTheDocument();
    expect(screen.queryByTestId("tip-card")).not.toBeInTheDocument();

    // Click the toggle button
    const toggleButton = screen.getByRole("button", {
      name: /Category Breakdown/i,
    });
    await userEvent.click(toggleButton);

    // Now tips should be visible
    expect(screen.queryByTestId("doughnut-chart")).not.toBeInTheDocument();
    expect(screen.getAllByTestId("tip-card").length).toBeGreaterThan(0);

    // Button label should switch to "Show Chart"
    expect(
      screen.getByRole("button", { name: /Show Chart/i })
    ).toBeInTheDocument();
  });

  test("calls save API and shows 'Saved! Go to Profile' on success", async () => {
    // Mock API success response
    addCfhApi.mockResolvedValue({
      data: { id: "mock-id" },
      error: null,
    });

    render(<ResultSummary footprint={mockFootprint} formData={mockFormData} />);

    const saveButton = screen.getByRole("button", { name: /Save Data/i });

    await userEvent.click(saveButton);

    // Ensure API was called with expected arguments
    await waitFor(() => {
      expect(addCfhApi).toHaveBeenCalledTimes(1);
    });

    const callArgs = addCfhApi.mock.calls[0];
    expect(callArgs[0]).toBe(mockFootprint.total); // total
    expect(callArgs[1]).toBe(mockFootprint.categoryEmission); // categoryEmission
    expect(callArgs[2]).toBe(mockFormData); // formData
    // tips array (4th arg) is generated from categoryEmission; just check it's an array
    expect(Array.isArray(callArgs[3])).toBe(true);

    // After success, "Save Data" button should disappear
    await waitFor(() => {
      expect(
        screen.queryByRole("button", { name: /Save Data/i })
      ).not.toBeInTheDocument();
    });

    // And the "Saved! Go to Profile" button should appear
    expect(
      screen.getByRole("button", { name: /Saved! Go to Profile/i })
    ).toBeInTheDocument();
  });
});
