import React from "react";
import { useState } from "react";
import logo from "./images/logo-evoerp.png";
import "./index.css";

export default function Root() {
  const [activeTab, setActiveTab] = useState("info");

  const handleLogout = () => {
    window.location.pathname = "/account";
    localStorage.clear();
  };

  return (
    <div className="flex bg-gray-100 p-8">
      <div className="w-80 bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center border-b border-gray-200 pb-4 mb-4">
          <img src={logo} alt="User" className="w-10 h-10 rounded-full mr-3" />
          <span className="text-lg font-semibold text-gray-800">
            Nguyễn Thọ Quân
          </span>
        </div>
        <ul className="space-y-2">
          {["info", "password", "logout"].map((tab) => (
            <li
              key={tab}
              className={`p-3 rounded-md font-medium cursor-pointer text-gray-600 hover:bg-indigo-700 hover:text-white ${
                activeTab === tab ? "bg-indigo-700 text-white" : ""
              }`}
              onClick={() => {
                if (tab === "logout") {
                  handleLogout();
                } else {
                  setActiveTab(tab);
                }
              }}
            >
              {tab === "info" && "Thông tin người dùng"}
              {tab === "password" && "Đổi mật khẩu"}
              {tab === "logout" && "Đăng xuất"}
            </li>
          ))}
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 ml-8">
        {activeTab === "info" && (
          <div className="bg-white py-6 px-10 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Thông tin người dùng
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input
                  type="text"
                  name="username"
                  placeholder="Họ và tên"
                  className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-400 outline-none focus:border-indigo-700"
                />
                <input
                  type="date"
                  name="birthday"
                  placeholder="Ngày sinh"
                  className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-400 outline-none focus:border-indigo-700"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input
                  type="text"
                  name="username"
                  placeholder="Số điện thoại"
                  className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-400 outline-none focus:border-indigo-700"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-400 outline-none focus:border-indigo-700"
                />
              </div>
              <div className="flex gap-20">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="gender"
                      value="male"
                      className="form-checkbox h-5 w-5 text-indigo-700"
                    />
                    <span className="ml-2">Nam</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="gender"
                      value="female"
                      className="form-checkbox h-5 w-5 text-indigo-700"
                    />
                    <span className="ml-2">Nữ</span>
                  </label>
                </div>
                <input
                  type="text"
                  name="address"
                  placeholder="Địa chỉ"
                  className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-400 outline-none focus:border-indigo-700"
                />
              </div>
              <div className="flex justify-center">
                <button className="btn">Lưu thay đổi</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "password" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Đổi mật khẩu
            </h2>
            <div className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Mật khẩu hiện tại"
                  className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-400 outline-none focus:border-indigo-700"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Mật khẩu mới"
                  className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-400 outline-none focus:border-indigo-700"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Xác nhận mật khẩu mới"
                  className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-400 outline-none focus:border-indigo-700"
                />
              </div>
              <div className="flex justify-center">
                <button className="btn">Đổi mật khẩu</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
