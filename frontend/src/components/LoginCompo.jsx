import { Loader2, Lock, User } from "lucide-react";
import React, { useState } from "react";
import { loginApi } from "../services/api";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

function LoginCompo({ setMessage }) {
  const [isShowingPass, setIsShowingPass] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    if (formData.email === "" || formData.password === "") {
      return setMessage("Fields can not be empty.");
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-z]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      return setMessage("Enter a valid email.");
    }

    setIsLogging(true);
    const { data, error } = await loginApi(formData.email, formData.password);
    if (error) {
      setIsLogging(false);
      return setMessage(
        error.message || error.response.data.message || "Error on logging in."
      );
    }
    if (data?.data?.user) {
      setUser(data?.data?.user);
      setIsLogging(false);
      navigate("/profile");
    }
  };

  return (
    <div className='w-full bg-center bg-cover bg-[url("/images/signup.jpg")] h-dvh flex justify-center items-center'>
      <div className="form-wrapper backdrop-blur-sm bg-[#ffffff6c] min-w-[300px] w-sm px-4 py-10 rounded-md border-2 border-white  ">
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
          <h1 className="text-3xl font-bold font-bulter text-center mt-2 max-xs:text-xl">
            Login
          </h1>
          <p className="text-lg font-light text-center">
            Login to your EcoTrack Account
          </p>
          <div className="px-6 space-y-1 py-6">
            <span className=" w-full flex items-center translate-x-5">
              <span className="bg-white flex justify-center items-center aspect-square w-12 h-12 rounded-full relative z-10">
                <User className="" />
              </span>
              <input
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                type="email"
                placeholder="Email"
                className="px-10 h-10 w-full -translate-x-10 rounded-full placeholder:text-center bg-[#ffffff80] outline-none border-2 border-white"
              />
            </span>
            <span className=" w-full flex items-center -translate-x-5">
              <input
                value={formData.password}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, password: e.target.value }))
                }
                type={isShowingPass ? "text" : "password"}
                placeholder="Password"
                className="px-10 h-10 w-full translate-x-10 rounded-full placeholder:text-center bg-[#ffffff80] outline-none border-2 border-white"
              />
              <span className="bg-white flex justify-center items-center aspect-square w-12 h-12 rounded-full relative z-10">
                <Lock />
              </span>
            </span>
            <span className=" w-full px-6 flex gap-2 items-center justify-center">
              <input
                id="show-pass"
                onChange={(e) => setIsShowingPass(e.target.checked)}
                type="checkbox"
                className="cursor-pointer"
              />
              <label htmlFor="show-pass" className="text-sm font-light ">
                Show Password
              </label>
            </span>
            <span className="w-full flex justify-center items-center px-6 mt-4">
              <button
                onClick={handleLogin}
                disabled={isLogging}
                className="text-lg bg-primary text-white w-full text-center outline-none border-none font-heartfield py-1 rounded-full cursor-pointer hover:bg-primary-hover transition-colors duration-30 flex justify-center items-center"
              >
                {isLogging ? (
                  <Loader2 className="text-white animate-spin" />
                ) : (
                  "Login"
                )}
              </button>
            </span>
          </div>
        </form>
        {/* Form Container */}
        <p className="text-base text-[#ffffff9b] text-center">
          Want to Make Ecotrack Account?
          <button
            onClick={() => {
              navigate("/auth/signup");
            }}
            className="border-none ml-2 text-text cursor-pointer outline-none hover:underline"
          >
            SignUp
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginCompo;
