import React, { useState } from "react";
import "regenerator-runtime/runtime";
import { FaFacebookF, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import toast, { Toaster } from "react-hot-toast";
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
  const [isLoading, setIsLoading] = useState(false);

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm({
      ...registerForm,
      [name]: value,
    });
    // Clear error when user types
    if (errors.register[name]) {
      setErrors({
        ...errors,
        register: {
          ...errors.register,
          [name]: "",
        },
      });
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
    // Clear error when user types
    if (errors.login[name]) {
      setErrors({
        ...errors,
        login: {
          ...errors.login,
          [name]: "",
        },
      });
    }
  };

  const validateRegisterForm = () => {
    let valid = true;
    const newErrors = { ...errors.register };

    if (!registerForm.username.trim()) {
      newErrors.username = "Vui lòng nhập họ và tên";
      valid = false;
    }

    if (!registerForm.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerForm.email)) {
      newErrors.email = "Email không hợp lệ";
      valid = false;
    }

    if (!registerForm.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
      valid = false;
    } else if (registerForm.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
      valid = false;
    }

    setErrors({
      ...errors,
      register: newErrors,
    });

    return valid;
  };

  const validateLoginForm = () => {
    let valid = true;
    const newErrors = { ...errors.login };

    if (!loginForm.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginForm.email)) {
      newErrors.email = "Email không hợp lệ";
      valid = false;
    }

    if (!loginForm.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
      valid = false;
    }

    setErrors({
      ...errors,
      login: newErrors,
    });

    return valid;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!validateRegisterForm()) return;

    setIsLoading(true);
    const registerSubmit = {
      email: registerForm.email,
      password: registerForm.password,
    };
    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerSubmit),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Đăng ký thất bại");
      }

      toast.success("Đăng kí thành công !"); // Xử lý sau khi đăng ký thành công
      setIsRightPanelActive(false); // Chuyển sang form đăng nhập
      setRegisterForm({ username: "", email: "", password: "" }); // Reset form
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      alert(error.message || "Có lỗi xảy ra khi đăng ký");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validateLoginForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Đăng nhập thất bại");
      }

      // Xử lý sau khi đăng nhập thành công
      toast.success("Đăng nhập thành công !");
      // Lưu token vào localStorage hoặc state management nếu cần
      localStorage.setItem("token", data.accessToken);
      // Redirect hoặc cập nhật trạng thái ứng dụng
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      alert(error.message || "Email hoặc mật khẩu không đúng");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster />
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
              <h1 className="text-3xl font-bold mb-4 text-indigo-700">
                Đăng kí
              </h1>
              <div className="w-full relative mb-4">
                <input
                  type="text"
                  name="username"
                  placeholder="Họ và tên"
                  className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-400 outline-none focus:border-indigo-700"
                  value={registerForm.username}
                  onChange={handleRegisterChange}
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
                  placeholder="Email"
                  className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-400 outline-none focus:border-indigo-700"
                  value={registerForm.email}
                  onChange={handleRegisterChange}
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
                  placeholder="Mật khẩu"
                  className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-400 outline-none focus:border-indigo-700"
                  value={registerForm.password}
                  onChange={handleRegisterChange}
                />
                <small className="absolute top-12 left-0 text-red-500 text-xs">
                  {errors.register.password}
                </small>
                <span className="absolute left-0 bottom-2 w-0 border-b-2 border-indigo-700 transition-all duration-300"></span>
              </div>
              <button type="submit" className="btn" disabled={isLoading}>
                {isLoading ? "Đang xử lý..." : "Đăng kí"}
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
                  placeholder="Email"
                  className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-400 outline-none focus:border-indigo-700"
                  value={loginForm.email}
                  onChange={handleLoginChange}
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
                  placeholder="Mật khẩu"
                  className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-400 outline-none focus:border-indigo-700"
                  value={loginForm.password}
                  onChange={handleLoginChange}
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
              <button type="submit" className="btn" disabled={isLoading}>
                {isLoading ? "Đang xử lý..." : "Đăng nhập"}
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
                  Bạn chưa có tài khoản ư ? Đừng lo đăng kí đơn giản và bạn có
                  thể trải nghiệm hệ thống tuyệt vời này.
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
    </>
  );
}
