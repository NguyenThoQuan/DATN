import "./index.css";
import { useEffect, useState } from "react";
import "regenerator-runtime/runtime";
import { FaEye, FaCheck, FaEllipsisH, FaChartArea } from "react-icons/fa";
import { FaChevronDown, FaChevronRight } from "react-icons/fa6";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
} from "react-icons/tb";
import { GrTableAdd } from "react-icons/gr";
import logo from "./assets/logo-evoerp.png";
import {
  sharedStateTableList,
  sharedStateTableListBuild,
  sharedStateMode,
  sharedStateCreate,
  sharedStateEdit,
  sharedStateDelete,
} from "shared-state";
import toast, { Toaster } from "react-hot-toast";

export default function Root() {
  const [id, setId] = useState();
  const [dataBuild, setDataBuild] = useState();
  const [dataTableListBuild, setDataTableListBuild] = useState();
  const [modeCreate, setModeCreate] = useState();
  const [modeEdit, setModeEdit] = useState();
  const [modeDelete, setModeDelete] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeValue = (value, key) => {
    setDataBuild((prevData) => ({ ...prevData, [key]: value }));
  };

  const [open, setOpen] = useState(true);
  const [subMenus, setSubMenus] = useState({
    regime: false,
  });
  const Menus = [
    {
      title: "Bảng danh sách",
      icon: <GrTableAdd />,
      subMenu: ["Tạo bảng", "Thêm mới", "Chỉnh sửa", "Xóa", "Xuất Excel"],
      value: "tableList",
      key: "tableList",
    },
    {
      title: "Biểu đồ phân tích",
      icon: <FaChartArea />,
      subMenu: ["Biểu đồ cột", "Biểu đồ miền", "Biểu đồ tròn", "Biểu đồ đường"],
      value: "chart",
      key: "chart",
    },
    {
      title: "Chế độ",
      icon: <FaEye />,
      subMenu: ["Tùy chỉnh", "Người dùng"],
      key: "regime",
    },
  ];

  const toggleSubMenu = (menu) => {
    setSubMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const selectModule = (module) => {
    if (module === "Tạo bảng") {
      sharedStateTableList.setData({ tableListMode: "on" });
    }
    if (module === "Thêm mới") {
      sharedStateCreate.setData({ createTable: "on" });
    }
    if (module === "Chỉnh sửa") {
      sharedStateEdit.setData({ editTable: "on" });
    }
    if (module === "Xóa") {
      sharedStateDelete.setData({ deleteTable: "on" });
    }
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
        sharedStateMode.setData({ mode: data[0]?.mode });
        sharedStateTableList.setData({
          tableListMode: data[0]?.tableList,
          dataTable: data[0]?.dataTable,
        });
        sharedStateCreate.setData({ createTable: data[0]?.createTable });
        sharedStateEdit.setData({ editTable: data[0]?.editTable });
        sharedStateDelete.setData({ deleteTable: data[0]?.deleteTable });
        sharedStateTableListBuild.setData({ dataColumn: data[0]?.dataColumn });
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const updateModule = async () => {
    setIsLoading(true);
    try {
      const url = `http://localhost:3000/api/build/${id}`;
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode: dataBuild?.mode,
          tableList: dataBuild?.tableList,
          createTable: modeCreate?.createTable,
          editTable: modeEdit?.editTable,
          deleteTable: modeDelete?.deleteTable,
          dataColumn: dataTableListBuild?.dataColumn || [],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Có lỗi xảy ra ở máy chủ!");
        return;
      } else {
        setIsLoading(false);
        setTimeout(() => {
          window.location.href = "/service";
        }, 1000);
        toast.success("Hoàn tất lưu tùy chỉnh !");
      }
    } catch (error) {
      console.error("Lỗi:", error);
    } finally {
      setIsLoading(false);
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

  useEffect(() => {
    if (dataBuild?.mode === "user") {
      setOpen(false);
    }
  }, [dataBuild]);

  useEffect(() => {
    const handleSharedStateUpdate = (event) => {
      setDataBuild((prev) => ({
        ...prev,
        tableList: event.detail?.tableListMode,
      }));
    };

    window.addEventListener(
      "sharedStateTableList:updated",
      handleSharedStateUpdate
    );

    return () => {
      window.removeEventListener(
        "sharedStateTableList:updated",
        handleSharedStateUpdate
      );
    };
  }, []);

  useEffect(() => {
    const handleSharedStateUpdate = (event) => {
      setDataTableListBuild(event.detail || {});
    };

    window.addEventListener(
      "sharedStateTableListBuild:updated",
      handleSharedStateUpdate
    );

    return () => {
      window.removeEventListener(
        "sharedStateTableListBuild:updated",
        handleSharedStateUpdate
      );
    };
  }, []);

  useEffect(() => {
    const handleSharedStateUpdate = (event) => {
      setModeCreate(event.detail || {});
    };

    window.addEventListener(
      "sharedStateCreate:updated",
      handleSharedStateUpdate
    );

    return () => {
      window.removeEventListener(
        "sharedStateCreate:updated",
        handleSharedStateUpdate
      );
    };
  }, []);

  useEffect(() => {
    const handleSharedStateUpdate = (event) => {
      setModeEdit(event.detail || {});
    };

    window.addEventListener("sharedStateEdit:updated", handleSharedStateUpdate);

    return () => {
      window.removeEventListener(
        "sharedStateEdit:updated",
        handleSharedStateUpdate
      );
    };
  }, []);

  useEffect(() => {
    const handleSharedStateUpdate = (event) => {
      setModeDelete(event.detail || {});
    };

    window.addEventListener(
      "sharedStateDelete:updated",
      handleSharedStateUpdate
    );

    return () => {
      window.removeEventListener(
        "sharedStateDelete:updated",
        handleSharedStateUpdate
      );
    };
  }, []);

  return (
    <>
      <Toaster />
      <div
        className={`${
          dataBuild?.createById &&
          dataBuild?.createById !==
            JSON.parse(localStorage.getItem("userLogin")).id &&
          dataBuild.mode === "user"
            ? "hidden"
            : ""
        } w-full flex relative`}
      >
        <div
          className={`${
            open ? "w-72 p-5" : "w-20 p-4"
          } bg-indigo-700 h-[calc(100vh-65px)] pt-8 relative duration-300 ease-in-out`}
        >
          <div
            className={`absolute cursor-pointer -right-4 top-9 w-8 h-8 p-0.5 bg-zinc-50 border-zinc-50 border-2 rounded-full text-xl flex items-center justify-center ${
              !open && "rotate-180"
            } transition-all ease-in-out duration-300 z-[1000]`}
            onClick={() => {
              setOpen(!open);
            }}
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
                open ? "rotate-[360deg]" : "pl-[2.5px]"
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
            {Menus.filter((item) => {
              if (
                dataBuild?.createById &&
                dataBuild?.createById !==
                  JSON.parse(localStorage.getItem("userLogin")).id
              ) {
                return item.key !== "regime";
              }

              return true;
            }).map((Menu, index) => (
              <li
                key={index}
                className={`flex flex-col rounded-md py-3 px-4 cursor-pointer hover:text-white text-zinc-50 hover:bg-zinc-800/50 transition-all ease-in-out duration-300 ${
                  Menu.gap ? "mt-9" : "mt-2"
                }`}
                onClick={() => {
                  setOpen(true);
                }}
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
                        className={`text-sm flex items-center gap-x-2 py-3 px-2 hover:bg-zinc-800 rounded-lg ${
                          open ? "" : "hidden"
                        }`}
                        onClick={() => {
                          if (subMenu === "Tùy chỉnh") {
                            handleChangeValue("edit", "mode");
                            sharedStateMode.setData({ mode: "edit" });
                          } else if (subMenu === "Người dùng") {
                            handleChangeValue("user", "mode");
                            sharedStateMode.setData({ mode: "user" });
                          } else {
                            selectModule(subMenu);
                            console.log(subMenu);
                          }
                        }}
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
        <div className="absolute bottom-0 flex justify-center w-full p-2">
          {open ? (
            <button
              className={`${
                isLoading ? "cursor-not-allowed" : ""
              } bg-white text-indigo-700 px-4 py-2 rounded w-full font-bold transition duration-200 hover:bg-indigo-700 hover:text-white hover:border hover:border-white hover:border-2`}
              disabled={isLoading}
              onClick={() => updateModule()}
            >
              {isLoading ? "Đang lưu ..." : "Lưu tùy chỉnh"}
            </button>
          ) : (
            <div
              className={`${
                isLoading ? "cursor-not-allowed" : ""
              } text-sm flex items-center py-3 px-4 hover:bg-zinc-800/50 transition-all ease-in-out duration-300 rounded-lg text-white cursor-pointer`}
              onClick={() => updateModule()}
            >
              {isLoading ? <FaEllipsisH /> : <FaCheck />}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
