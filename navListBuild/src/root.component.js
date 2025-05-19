import "./index.css";
import { useEffect, useState } from "react";
import "regenerator-runtime/runtime";
import { FaEye } from "react-icons/fa";
import { FaChevronDown, FaChevronRight } from "react-icons/fa6";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
} from "react-icons/tb";
import logo from "./assets/logo-evoerp.png";

export default function Root() {
  const [id, setId] = useState();
  const [dataBuild, setDataBuild] = useState();

  const [open, setOpen] = useState(true);
  const [subMenus, setSubMenus] = useState({
    calendar: false,
    support: false,
    tables: false,
    analytics: false,
  });

  const toggleSubMenu = (menu) => {
    setSubMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const Menus = [
    {
      title: "Chế độ",
      icon: <FaEye />,
      subMenu: ["Chỉnh sửa", "Người dùng"],
      key: "regime",
    },
  ];

  const handleChangeValue = (value, key) => {
    setDataBuild((prevData) => ({ ...prevData, [key]: value }));
  };

  const getModule = async (id) => {
    try {
      const url = `http://localhost:3000/api/build?id=${id}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Có lỗi xảy ra ở máy chủ!");
        return;
      } else {
        setDataBuild(data[0]);
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idFromUrl = params.get("id");
    if (idFromUrl) {
      setId(decodeURIComponent(idFromUrl));
    }
  }, []);

  useEffect(() => {
    if (id) {
      getModule(id);
    }
  }, [id]);

  return (
    <>
      <div className="w-full flex">
        <div
          className={`${
            open ? "w-72 p-5" : "w-20 p-4"
          } bg-indigo-700 h-screen pt-8 relative duration-300 ease-in-out`}
        >
          <div
            className={`absolute cursor-pointer -right-4 top-9 w-8 h-8 p-0.5 bg-zinc-50 border-zinc-50 border-2 rounded-full text-xl flex items-center justify-center ${
              !open && "rotate-180"
            } transition-all ease-in-out duration-300`}
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <TbLayoutSidebarLeftExpand />
            ) : (
              <TbLayoutSidebarLeftCollapse />
            )}
          </div>

          <div className="flex gap-x-4 items-center">
            <img
              src={logo}
              alt="logo"
              className={`w-10 h-10 rounded-full object-cover object-center cursor-pointer ease-in-out duration-3 ${
                open && "rotate-[360deg]"
              }`}
            />
            <h1
              className={`text-zinc-50 origin-left text-lg duration-200 ease-in-out font-bold uppercase ${
                !open && "scale-0"
              }`}
            >
              {dataBuild?.name || "Tên trang"}
            </h1>
          </div>

          <ul className="pt-6 space-y-0.5">
            {Menus.map((Menu, index) => (
              <li
                key={index}
                className={`flex flex-col rounded-md py-3 px-4 cursor-pointer hover:text-white text-zinc-50 hover:bg-zinc-800/50 transition-all ease-in-out duration-300 ${
                  Menu.gap ? "mt-9" : "mt-2"
                }`}
                onClick={() => setOpen(true)}
              >
                <div
                  className="flex items-center justify-between gap-x-4"
                  onClick={() => toggleSubMenu(Menu.key)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{Menu.icon}</span>
                    <span
                      className={`${
                        !open && "hidden"
                      } origin-left ease-in-out duration-300 font-semibold`}
                    >
                      {Menu.title}
                    </span>
                  </div>

                  {Menu.subMenu && (
                    <span
                      className={`ml-auto cursor-pointer text-sm ${
                        subMenus[Menu.key] ? "rotate-360" : ""
                      } transition-transform ease-in-out duration-300 ${
                        !open ? "hidden" : ""
                      }`}
                    >
                      {subMenus[Menu.key] ? (
                        <FaChevronDown />
                      ) : (
                        <FaChevronRight />
                      )}
                    </span>
                  )}
                </div>

                {Menu.subMenu && subMenus[Menu.key] && (
                  <ul className="pl-3 pt-4 text-zinc-300">
                    {Menu.subMenu.map((subMenu, subIndex) => (
                      <li
                        key={subIndex}
                        className="text-sm flex items-center gap-x-2 py-3 px-2 hover:bg-zinc-800 rounded-lg"
                      >
                        <span className="text-zinc-4">
                          <FaChevronRight className="text-xs" />
                        </span>
                        {subMenu}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
