import React, { useState } from "react";
import {
  FaFacebookF,
  FaTiktok,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./index.css";

export default function Root() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({
    register: { username: "", email: "", password: "" },
    login: { email: "", password: "" },
  });

  const checkEmail = (email) => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  };

  const validateRegisterInput = (name, value) => {
    let error = "";
    if (name === "username") {
      if (value.length < 4) error = "Username must be at least 4 characters.";
      else if (value.length > 20)
        error = "Username must be less than 20 characters.";
    } else if (name === "email") {
      if (!checkEmail(value)) error = "Email is not valid.";
    } else if (name === "password") {
      if (value.length < 8) error = "Password must be at least 8 characters.";
      else if (value.length > 20)
        error = "Password must be less than 20 characters.";
    }
    return error;
  };

  const validateLoginInput = (name, value) => {
    let error = "";
    if (name === "email") {
      if (!checkEmail(value)) error = "Email is not valid.";
    } else if (name === "password") {
      if (value.length < 8) error = "Password must be at least 8 characters.";
      else if (value.length > 20)
        error = "Password must be less than 20 characters.";
    }
    return error;
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      register: {
        ...prev.register,
        [name]: validateRegisterInput(name, value),
      },
    }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      login: { ...prev.login, [name]: validateLoginInput(name, value) },
    }));
  };

  const checkRequired = (formData, type) => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) {
        newErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
      }
    });
    setErrors((prev) => ({ ...prev, [type]: { ...prev[type], ...newErrors } }));
    return Object.keys(newErrors).length === 0;
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (checkRequired(registerForm, "register")) {
      // Proceed with registration logic (e.g., API call)
      console.log("Register form submitted:", registerForm);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (checkRequired(loginForm, "login")) {
      // Proceed with login logic (e.g., API call)
      console.log("Login form submitted:", loginForm);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center font-poppins -mt-[65px]"
      style={{
        backgroundImage: "url('https://picsum.photos/1920/1080')",
      }}
    >
      <div
        className={`container ${
          isRightPanelActive ? "right-panel-active" : ""
        } relative w-[768px] max-w-full min-h-[500px] bg-white rounded-3xl shadow-2xl overflow-hidden`}
        id="container"
      >
        {/* Register Form */}
        <div className="register-container absolute top-0 left-0 w-1/2 h-full opacity-0 z-1 transition-all duration-600 ease-in-out">
          <form
            className="flex flex-col items-center justify-center h-full px-12 text-center bg-white"
            onSubmit={handleRegisterSubmit}
          >
            <h1 className="text-3xl font-bold mb-4 text-indigo-700">Đăng kí</h1>
            <div className="w-full relative mb-4">
              <input
                type="text"
                name="username"
                value={registerForm.username}
                onChange={handleRegisterChange}
                placeholder="Họ và tên"
                className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-400 outline-none focus:border-indigo-700"
              />
              <small className="absolute top-12 left-0 text-red-500 text-xs">
                {errors.register.username}
              </small>
              <span className="absolute left-0 bottom-2 w-0 border-b-2 border-indigo-700 transition-all duration-300"></span>
            </div>
            <div className="w-full relative mb-4">
              <input
                type="email"
                name="email"
                value={registerForm.email}
                onChange={handleRegisterChange}
                placeholder="Email"
                className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-400 outline-none focus:border-indigo-700"
              />
              <small className="absolute top-12 left-0 text-red-500 text-xs">
                {errors.register.email}
              </small>
              <span className="absolute left-0 bottom-2 w-0 border-b-2 border-indigo-700 transition-all duration-300"></span>
            </div>
            <div className="w-full relative mb-4">
              <input
                type="password"
                name="password"
                value={registerForm.password}
                onChange={handleRegisterChange}
                placeholder="Mật khẩu"
                className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-400 outline-none focus:border-indigo-700"
              />
              <small className="absolute top-12 left-0 text-red-500 text-xs">
                {errors.register.password}
              </small>
              <span className="absolute left-0 bottom-2 w-0 border-b-2 border-indigo-700 transition-all duration-300"></span>
            </div>
            <button type="submit" className="btn">
              Đăng kí
            </button>
            <span className="text-sm mt-5">hoặc đăng nhập bằng</span>
            <div className="flex mt-5 space-x-2">
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full hover:border-indigo-700 transition-all duration-300"
              >
                <FaFacebookF className="text-blue-700" />
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full hover:border-indigo-700 transition-all duration-300"
              >
                <FcGoogle />
              </a>
            </div>
          </form>
        </div>

        {/* Login Form */}
        <div className="login-container absolute top-0 left-0 w-1/2 h-full z-2 transition-all duration-600 ease-in-out">
          <form
            className="flex flex-col items-center justify-center h-full px-12 text-center bg-white"
            onSubmit={handleLoginSubmit}
          >
            <h1 className="text-3xl font-bold mb-4 text-indigo-700">
              Đăng nhập
            </h1>
            <div className="w-full relative mb-4">
              <input
                type="email"
                name="email"
                value={loginForm.email}
                onChange={handleLoginChange}
                placeholder="Email"
                className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-400 outline-none focus:border-indigo-700"
              />
              <small className="absolute top-12 left-0 text-red-500 text-xs">
                {errors.login.email}
              </small>
              <span className="absolute left-0 bottom-2 w-0 border-b-2 border-indigo-700 transition-all duration-300"></span>
            </div>
            <div className="w-full relative mb-4">
              <input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                placeholder="Mật khẩu"
                className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-400 outline-none focus:border-indigo-700"
              />
              <small className="absolute top-12 left-0 text-red-500 text-xs">
                {errors.login.password}
              </small>
              <span className="absolute left-0 bottom-2 w-0 border-b-2 border-indigo-700 transition-all duration-300"></span>
            </div>
            <div className="flex w-full items-center justify-between mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="checkbox"
                  className="w-3 h-3 accent-indigo-700"
                />
                <label htmlFor="checkbox" className="text-sm ml-2">
                  Ghi nhớ đăng nhập
                </label>
              </div>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-indigo-700 transition-all duration-300"
              >
                Quên mật khẩu
              </a>
            </div>
            <button type="submit" className="btn">
              Đăng nhập
            </button>
            <span className="text-sm mt-5">hoặc đăng nhập bằng</span>
            <div className="flex mt-5 space-x-2">
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full hover:border-indigo-700 transition-all duration-300"
              >
                <FaFacebookF className="text-indigo-700" />
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full hover:border-indigo-700 transition-all duration-300"
              >
                <FcGoogle />
              </a>
            </div>
          </form>
        </div>

        {/* Overlay Container */}
        <div className="overlay-container absolute top-0 left-1/2 w-1/2 h-full overflow-hidden z-100 transition-transform duration-600 ease-in-out">
          <div
            className="overlay relative left-[-100%] h-full w-[200%] bg-cover bg-no-repeat transform transition-transform duration-600 ease-in-out"
            style={{
              backgroundImage: "url('https://picsum.photos/1920/1080')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(46,94,109,0.4)] to-transparent"></div>
            <div className="overlay-panel overlay-left absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center px-10 text-center text-white transform transition-transform duration-600 ease-in-out">
              <h1 className="text-5xl font-bold leading-tight mb-4 text-shadow">
                Chào mừng
                <br />
                đến với EvoERP
              </h1>
              <p className="text-sm font-light mb-8 text-shadow">
                Bạn chưa có tài khoản ư ? Đừng lo đăng kí đơn giản và bạn có thể
                trải nghiệm hệ thống tuyệt vời này.
              </p>
              <button
                className="relative py-3 px-20 bg-transparent text-white font-bold rounded-full border-2 border-white hover:tracking-wider active:scale-95 focus:outline-none transition-all duration-300 flex items-center"
                onClick={() => setIsRightPanelActive(false)}
              >
                Đăng nhập
                <FaArrowLeft className="absolute left-10" />
              </button>
            </div>
            <div className="overlay-panel overlay-right absolute top-0 right-0 w-1/2 h-full flex flex-col items-center justify-center px-10 text-center text-white transform transition-transform duration-600 ease-in-out">
              <h1 className="text-5xl font-bold leading-tight mb-4 text-shadow">
                Chào mừng
                <br />
                đến với EvoERP
              </h1>
              <p className="text-sm font-light mb-8 text-shadow font-medium">
                Hãy đăng nhập để bắt đầu trải nghiệm hệ thống tuyệt vời này.
              </p>
              <button
                className="relative py-3 px-20 bg-transparent text-white font-bold rounded-full border-2 border-white hover:tracking-wider active:scale-95 focus:outline-none transition-all duration-300 flex items-center"
                onClick={() => setIsRightPanelActive(true)}
              >
                Đăng kí
                <FaArrowRight className="absolute right-10" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
