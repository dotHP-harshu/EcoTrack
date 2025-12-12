import React from "react";
import MultiStepForm from "./pages/MultiStepForm";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/form",
      element: (
        <ProtectedRoute>
          <MultiStepForm />
        </ProtectedRoute>
      ),
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      ),
    },
    {
      path: "/auth/:module",
      element: <Auth />,
    },
  ]);
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
