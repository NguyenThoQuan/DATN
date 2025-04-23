import "./index.css";
import logo from "./images/logo-evoerp.png";
import { useState, useRef, useEffect } from "react";

const Root = () => {
  const [activeItem, setActiveItem] = useState(
    localStorage.getItem("activeNavItem") || "Trang chủ"
  );
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const navItems = [
    { name: "Trang chủ", path: "/" },
    { name: "Dịch vụ", path: "/service" },
    { name: "Quản trị", path: "/admin" },
    { name: "Tài khoản", path: "/infor" },
    { name: "Đăng nhập", path: "/account" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    localStorage.setItem("activeNavItem", itemName);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-[1000] isolate top-0 noneNav">
      <div className="max-w-9/10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/">
              <div className="flex-shrink-0 flex items-center">
                <img className="w-[40px]" src={logo} alt="Logo" />
                <span className="ml-2 text-xl font-bold text-gray-800">
                  EvoERP
                </span>
              </div>
            </a>
          </div>

          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-1">
            {localStorage.getItem("token") &&
            localStorage.getItem("token") !== "undefined" ? (
              navItems
                .filter((item) => item.path !== "/account")
                .map((item) => (
                  <a
                    key={item.name}
                    href={item.path}
                    onClick={() => handleItemClick(item.name)}
                    className={`w-[110px] relative inline-flex justify-center items-center px-4 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out ${
                      activeItem === item.name
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    }`}
                  >
                    {item.name}
                  </a>
                ))
            ) : (
              <a
                href="/account"
                className={
                  "w-[110px] relative inline-flex justify-center items-center px-4 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out bg-indigo-100 text-indigo-700"
                }
              >
                Đăng nhập
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Root;
