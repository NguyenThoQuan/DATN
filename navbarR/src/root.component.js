import "./index.css";
import logo from "./images/logo-evoerp.png";
import { useState, useRef, useEffect } from "react";
import { BrowserRouter, Link } from "react-router-dom";

const Root = () => {
  const [activeItem, setActiveItem] = useState("Trang chủ");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const navItems = [
    { name: "Trang chủ", path: "/" },
    { name: "Chức năng", path: "/function" },
    { name: "Quản trị", path: "/admin" },
    { name: "Liên hệ", path: "/contact" },
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

  return (
    <BrowserRouter>
      <nav className="bg-white shadow-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to={"/"}>
                <div className="flex-shrink-0 flex items-center">
                  <img className="w-[40px]" src={logo} alt="Logo" />
                  <span className="ml-2 text-xl font-bold text-gray-800">
                    EvoERP
                  </span>
                </div>
              </Link>
            </div>

            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveItem(item.name)}
                  className={`relative inline-flex items-center px-1 pt-1 pb-2 text-sm font-medium transition duration-300 ease-in-out ${
                    activeItem === item.name
                      ? "text-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Link to={item.path}>
                    {item.name}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-indigo-500 transition-all duration-300 ease-in-out ${
                        activeItem === item.name ? "w-full" : "w-0"
                      }`}
                    ></span>
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-gray-300 transition-all duration-300 ease-in-out ${
                        activeItem !== item.name ? "hover:w-full" : ""
                      }`}
                    ></span>
                  </Link>
                </button>
              ))}
            </div>
            <div className="flex items-center">
              <div className="ml-4 relative flex-shrink-0" ref={profileRef}>
                <button
                  onClick={() => {
                    setIsProfileOpen(!isProfileOpen);
                  }}
                  className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  id="user-menu"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src={logo}
                    alt="User avatar"
                  />
                </button>
                {isProfileOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Thông tin cá nhân
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Cài đặt
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Đăng xuất
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </BrowserRouter>
  );
};

export default Root;
