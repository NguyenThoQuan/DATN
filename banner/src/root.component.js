import React, { useState, useEffect } from "react";
import "./index.css";
import logo from "./images/logo-evoerp.png";

const Banner = () => {
  const [displayedName, setDisplayedName] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullName = "EvoERP";

  const handleStart = () => {
    window.location.pathname = "/service";
    localStorage.setItem("activeNavItem", "Dịch vụ");
  };

  useEffect(() => {
    const typingSpeed = 200;
    const eraseSpeed = 100;
    const pauseBetween = 2000;

    let timeout;

    if (isTyping) {
      if (currentIndex < fullName.length) {
        timeout = setTimeout(() => {
          setDisplayedName(fullName.substring(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, pauseBetween);
      }
    } else {
      if (currentIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayedName(fullName.substring(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
        }, eraseSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(true);
        }, pauseBetween);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, isTyping, fullName]);

  return (
    <div className="flex flex-col md:flex-row sm:flex-row max-sm:flex-row items-center justify-between bg-gradient-to-r from-indigo-50 to-indigo-100 p-8 rounded-lg shadow-lg">
      <div className="w-full md:w-6/12 lg:w-5/12 sm:w-6/12 max-sm:w-6/12 p-6">
        <h3 className="text-2xl font-medium text-indigo-700 mb-2">Xin chào</h3>
        <h1 className="text-5xl font-bold text-gray-800 mb-4 whitespace-nowrap overflow-hidden">
          <span className="inline-block truncate">
            Tôi là <span className="text-indigo-700">{displayedName}</span>
          </span>
        </h1>
        <h4 className="font-medium text-lg text-gray-600 mb-6 transition-all duration-300 hover:text-gray-800 line-clamp-4 overflow-hidden text-ellipsis">
          EvoERP là giải pháp quản trị doanh nghiệp linh hoạt, được thiết kế để
          tùy chỉnh đa dạng theo nhu cầu riêng của từng người dùng. Ứng dụng
          tích hợp đầy đủ tính năng từ kế toán, nhân sự đến quản lý kho, giúp
          tối ưu hóa hiệu suất công việc một cách cá nhân hóa.
        </h4>
        <button className="btn" onClick={() => handleStart()}>
          Bắt đầu
        </button>
      </div>

      <div
        className="w-1/2 bg-indigo-700 absolute right-0 top-0 h-[462px] flex justify-center -z-10 overflow-hidden"
        style={{ clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
      >
        <div className="absolute w-80 h-80 rounded-full bg-indigo-600 opacity-20 blur-xl"></div>
        <div className="absolute w-6 h-6 rounded-full bg-white opacity-30 top-1/4 left-1/3 animate-float"></div>
        <div className="absolute w-4 h-4 rounded-full bg-yellow-300 opacity-40 bottom-1/2 right-1/4 animate-float-reverse"></div>
        <div className="absolute w-32 h-32 rounded-full bg-purple-400 opacity-15 blur-md top-1/3 right-1/4 animate-float-slow"></div>
        <div className="absolute w-60 h-60 rounded-full bg-indigo-500 opacity-10 blur-sm translate-x-[100px] animate-ripple z-0"></div>
        <div className="absolute w-72 h-72 rounded-full bg-indigo-500 opacity-5 blur-sm translate-x-[200px] translate-y-[300px] animate-ripple-slow z-0"></div>
        <div className="relative">
          <img
            src={logo}
            alt="Logo EvoERP"
            className="w-60 h-auto rounded-full ml-[75px] transform translate-y-[175px] z-10 relative 
                shadow-lg shadow-indigo-900/50 
                hover:shadow-2xl hover:shadow-indigo-500/70 transition-all duration-300
                animate-bounce-slow"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
