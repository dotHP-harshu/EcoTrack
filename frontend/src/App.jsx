import React from "react";
import MultiStepForm from "./pages/MultiStepForm";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/form",
      element: <MultiStepForm />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/auth",
      element: <Auth />,
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
