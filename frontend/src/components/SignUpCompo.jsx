import { Loader2, Lock, Mail, Package, User } from "lucide-react";
import React, { useState } from "react";
import { signUpApi } from "../services/api";
import { useNavigate } from "react-router";

function SignUpCompo({ setMessage }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");

    if (
      (formData.email === "", formData.password === "", formData.name === "")
    ) {
      return setMessage("Fields can not be empty");
    }
    const emailPattern = /^[A-Za-z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      return setMessage("Enter a valid email.");
    }

    setIsSigningUp(true);

    const { data, error } = await signUpApi(
      formData.email,
      formData.name,
      formData.password
    );
    if (error) {
      setIsSigningUp(false);
      return setMessage(
        error.message ||
          error.response.data.message ||
          "Any Error occured on signing up."
      );
    }

    if (data) {
      const message = `Congrates! Your account has been created. Now you can login.`;
      setMessage(message);
      setFormData({ email: "", password: "", name: "" });
      setIsShowingLogin(true);
      return;
    }
    isSigningUp(false);
  };
  return (
    <div className='w-full bg-center bg-cover bg-[url("/images/login.jpg")] h-dvh flex justify-center items-center px-4'>
      <div className="form-wrapper backdrop-blur-sm bg-[#ffffff6c] min-w-[300px] max-xs:min-w-full w-sm px-4 max-xs:px-2 py-10 rounded-md border-2 border-white">
        {/* Logo */}
        <div className="w-20 h-20 bg-white rounded-full absolute top-0 left-1/2 -translate-1/2 flex justify-center items-center ">
          <img
            src="/images/logo.svg"
            alt="logo"
            className="w-16 aspect-auto h-auto"
          />
        </div>
        {/* Logo */}

        {/* Form Container */}
        <form className="w-full">
          <h1 className="text-3xl font-bold font-bulter text-center mt-2">
            Sign Up
          </h1>
          <p className="text-lg font-light text-center">
            Register to EcoTrack{" "}
          </p>
          <div className="px-6 max-xs:px-0 space-y-1 py-6">
            <span className=" w-full flex items-center translate-x-5">
              <span className="bg-white flex justify-center items-center aspect-square w-12 h-12 rounded-full relative z-10">
                <User />
              </span>
              <input
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                type="text"
                placeholder="Full Name"
                className="px-10 h-10 w-full border-2 border-white -translate-x-10 rounded-full placeholder:text-center bg-[#ffffff80] outline-none"
              />
            </span>

            <span className=" w-full flex items-center -translate-x-5">
              <input
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                type="email"
                placeholder="Email"
                className="px-10 h-10 w-full border-2 border-white translate-x-10 rounded-full placeholder:text-center bg-[#ffffff80] outline-none"
              />
              <span className="bg-white flex justify-center items-center aspect-square w-12 h-12 rounded-full relative z-10">
                <Mail />
              </span>
            </span>

            <span className=" w-full flex items-center translate-x-5">
              <span className="bg-white flex justify-center items-center aspect-square w-12 h-12 rounded-full relative z-10">
                <Lock />
              </span>
              <input
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                type={isShowingPassword ? "text" : "password"}
                placeholder="Password"
                className="px-10 h-10 w-full border-2 border-white -translate-x-10 rounded-full placeholder:text-center bg-[#ffffff80] outline-none"
              />
            </span>

            <span className="w-full px-6 flex gap-2 items-center justify-center">
              <input
                checked={isShowingPassword}
                onChange={(e) => setIsShowingPassword(e.target.checked)}
                id="show-pass"
                type="checkbox"
                className="cursor-pointer"
              />
              <label htmlFor="show-pass" className="text-sm font-light ">
                Show Password
              </label>
            </span>
            <span className="w-full flex justify-center items-center  mt-4">
              <button
                onClick={handleSignup}
                className="text-lg bg-primary text-white w-full text-center font-heartfield py-1 rounded-full cursor-pointer hover:bg-primary-hover transition-colors duration-300 flex justify-center items-center"
              >
                {isSigningUp ? (
                  <Loader2 className="text-white animate-spin" />
                ) : (
                  "Sign Up"
                )}
              </button>
            </span>
          </div>
        </form>
        {/* Form Container */}
        <p className="text-base text-text-light text-center">
          Already have EcoTrack Account?
          <button
            onClick={() => {
              navigate("/auth/login");
            }}
            className="border-none ml-2 text-text cursor-pointer outline-none hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignUpCompo;
