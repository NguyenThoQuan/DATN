import { useEffect, useState } from "react";
import logo from "./images/logo-evoerp.png";
import "regenerator-runtime/runtime";
import "./index.css";
import toast, { Toaster } from "react-hot-toast";

export default function Root() {
  const [activeTab, setActiveTab] = useState("moduleManager");

  return (
    <>
      <Toaster />
      <div className="flex bg-gray-100 p-8">
        <div className="w-80 bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center border-b border-gray-200 pb-4 mb-4">
            <img
              src={logo}
              alt="User"
              className="w-10 h-10 rounded-full mr-3"
            />
            <span className="text-lg font-semibold text-gray-800">
              Quản trị hệ thống
            </span>
          </div>
          <ul className="space-y-2">
            {["moduleManager"].map((tab) => (
              <li
                key={tab}
                className={`p-3 rounded-md font-medium cursor-pointer text-gray-600 hover:bg-indigo-700 hover:text-white ${
                  activeTab === tab ? "bg-indigo-700 text-white" : ""
                }`}
                onClick={() => {
                  setActiveTab(tab);
                }}
              >
                {tab === "moduleManager" && "Quản trị hệ thống"}
              </li>
            ))}
          </ul>
        </div>

        {/* Content */}
        <div className="flex-1 ml-8 h-[calc(100vh-130px)]">
          {activeTab === "moduleManager" && (
            <div className="bg-white py-6 px-10 rounded-lg shadow-md h-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Quản trị hệ thống
              </h2>
            </div>
          )}

          {activeTab === "password" && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Đổi mật khẩu
              </h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
