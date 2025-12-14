import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, checking } = useAuth();
  const navigate = useNavigate()

  if (checking) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-bg-subtle text-center px-4">
        {/* Floating Background Elements */}
        <div className="absolute w-16 h-16 bg-accent-light opacity-30 rounded-full top-10 left-10 animate-float-slow" />
        <div className="absolute w-24 h-24 bg-primary-light opacity-20 rounded-full bottom-20 right-16 animate-float-slower" />
        <div className="absolute w-12 h-12 bg-accent opacity-25 rounded-full top-1/2 left-1/4 animate-float" />
        <div className="absolute w-20 h-20 bg-success opacity-15 rounded-full bottom-10 left-1/3 animate-float-reverse" />

        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-color-primary border-t-transparent rounded-full animate-spin mb-6" />

        {/* Text */}
        <h2 className="text-xl sm:text-2xl font-semibold text-text-heading font-sora mb-2">
          We are identifying you...
        </h2>
        <p className="text-sm sm:text-base text-text-light font-open-sans">
          Welcome to <span className="font-bold text-accent">EcoTrack</span>
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[var(--color-bg-subtle)] text-center px-4">
        {/* Floating Background Elements */}
        <div className="absolute w-16 h-16 bg-accent-light opacity-30 rounded-full top-10 left-10 animate-float-slow" />
        <div className="absolute w-24 h-24 bg-primary-light opacity-20 rounded-full bottom-20 right-16 animate-float-slower" />
        <div className="absolute w-12 h-12 bg-accent opacity-25 rounded-full top-1/2 left-1/4 animate-float" />
        <div className="absolute w-20 h-20 bg-success opacity-15 rounded-full bottom-10 left-1/3 animate-float-reverse" />

        {/* Text */}
        <p className="text-sm sm:text-base text-text-light font-open-sans">
          Welcome to {" "}
          <span className="font-bold text-accent">EcoTrack</span>
        </p>
        <h2 className="text-xl sm:text-2xl font-semibold text-text-heading font-sora mb-2">
          Sorry!, we are not itentifying you.
        </h2>
        <button onClick={()=> navigate("/auth/login")} to={"/auth"} className="text-base underline sm:text-base text-text-light font-open-sans cursor-pointer">
          Login
        </button>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;
