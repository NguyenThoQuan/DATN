import { useEffect, useState } from "react";
import logo from "./images/logo-evoerp.png";
import "regenerator-runtime/runtime";
import "./index.css";
import toast, { Toaster } from "react-hot-toast";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Divider, Menu, Text } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";

export default function Root() {
  const [activeTab, setActiveTab] = useState("moduleManager");
  const [activeFunc, setActiveFunc] = useState("addManager");
  const [listModule, setListModule] = useState();
  const [moduleManager, setModuleManager] = useState();
  const [dataUser, setDataUser] = useState([]);
  const [search, setSearch] = useState("");
  const [searchUser, setSearchUser] = useDebouncedState("", 300);

  const getModule = async () => {
    const idUser = JSON.parse(localStorage.getItem("userLogin"))?.id;
    let url = `http://localhost:3000/api/build?_sort=mode&createById=${idUser}&_limit=4`;

    if (search.length > 0) {
      url += `&name_like=${search}`;
    }

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error("Có lỗi xảy ra ở máy chủ !");
      } else {
        setListModule(data?.data);
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const getUsers = async () => {
    let url = `http://localhost:3000/api/users?`;

    if (searchUser.length >= 3) {
      url += `email_like=${searchUser}&_limit=5`;
    }

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error("Có lỗi xảy ra ở máy chủ !");
        setDataUser([]);
      } else {
        setDataUser(data?.data || []);
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  useEffect(() => {
    getModule();
  }, []);

  useEffect(() => {
    if (searchUser.length >= 3) {
      getUsers();
    } else {
      setDataUser([]);
    }
  }, [searchUser]);

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

        <div className="flex-1 ml-8 h-[calc(100vh-130px)]">
          {activeTab === "moduleManager" && (
            <div className="bg-white py-6 px-10 rounded-lg shadow-md h-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Quản trị hệ thống
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 items-center rounded-[10px] bg-indigo-100 p-2 hover:bg-indigo-200 transition-colors">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.currentTarget.value)}
                  placeholder="Nhập tên hệ thống quản lý"
                  className="col-span-1 lg:col-span-5 p-1 text-sm text-indigo-700 bg-white border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  className="flex items-center justify-center p-1 text-sm rounded-md transition-colors bg-indigo-700 text-white hover:bg-indigo-800 col-span-1 lg:col-span-2"
                  onClick={() => getModule()}
                >
                  <MagnifyingGlassIcon className="w-4 h-4 mr-1" />
                  <span className="font-medium">Tìm kiếm</span>
                </button>
              </div>
              {listModule && listModule.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xs:grid-cols-1 mt-2">
                  {listModule.map((item, index) => (
                    <div
                      key={index}
                      className={`group text-center shadow-md p-1 rounded-md duration-200
                        ${
                          item.mode === "inactive"
                            ? "bg-gray-400 text-white"
                            : "bg-indigo-700 text-white hover:bg-white hover:text-indigo-700 cursor-pointer"
                        }
                      `}
                      onClick={() => setModuleManager(item)}
                    >
                      <span className="uppercase font-bold truncate text-sm">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <></>
              )}
              <Divider
                my="xs"
                label="Thông tin hệ thống quản lý"
                labelPosition="center"
                className="text-indigo-700 font-bold"
              />
              {moduleManager ? (
                <div className="flex gap-2 w-full h-[calc(100vh-360px)]">
                  <div className="flex flex-col gap-2 w-[20%]">
                    <div className="text-indigo-700 text-center">
                      <span className="font-bold truncate text-sm uppercase">
                        {moduleManager?.name}
                      </span>
                    </div>
                    <Divider
                      labelPosition="center"
                      className="text-indigo-700 font-bold"
                    />
                    {["addManager", "decentralization"].map((item, index) => (
                      <div
                        key={index}
                        className="bg-white text-indigo-700 border border-indigo-700 hover:bg-indigo-700 hover:text-white hover:border-white cursor-pointer text-center shadow-md p-1 rounded-md duration-200"
                      >
                        <span className="font-bold truncate text-sm">
                          {item === "addManager" && "Thêm quản lý"}
                          {item === "decentralization" &&
                            "Phân quyền chức năng"}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="w-[80%] border border-indigo-700 shadow-md p-2 rounded-lg duration-200">
                    {activeFunc === "addManager" && (
                      <>
                        <div className="flex items-center rounded-[10px] bg-indigo-100 p-2 hover:bg-indigo-200 transition-colors">
                          <Menu trigger="hover" closeDelay={400} width={500}>
                            <Menu.Target>
                              <input
                                type="text"
                                defaultValue={searchUser}
                                onChange={(e) =>
                                  setSearchUser(e.currentTarget.value)
                                }
                                placeholder="Nhập email người dùng"
                                className="w-full p-1 text-sm text-indigo-700 bg-white border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />
                            </Menu.Target>
                            <Menu.Dropdown className="w-full">
                              {searchUser.length < 3 ? (
                                <Menu.Item className="text-center">
                                  <Text className="text-indigo-700">
                                    Vui lòng nhập tối thiểu 3 kí tự
                                  </Text>
                                </Menu.Item>
                              ) : searchUser.length >= 3 &&
                                dataUser.length > 0 ? (
                                dataUser.map((item, index) => (
                                  <Menu.Item
                                    key={index}
                                    className="text-indigo-700"
                                  >
                                    {item.fullName} - {item.email}
                                  </Menu.Item>
                                ))
                              ) : searchUser.length >= 3 &&
                                dataUser.length === 0 ? (
                                <Menu.Item className="text-indigo-700 text-center">
                                  Không tìm thấy người dùng này !
                                </Menu.Item>
                              ) : (
                                <></>
                              )}
                            </Menu.Dropdown>
                          </Menu>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <></>
              )}
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
