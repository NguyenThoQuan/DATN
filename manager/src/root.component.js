import {
  PlusIcon,
  CircleStackIcon,
  EllipsisVerticalIcon,
  PencilSquareIcon,
  NoSymbolIcon,
  TrashIcon,
  XMarkIcon,
  LockOpenIcon,
  MagnifyingGlassIcon,
  WrenchScrewdriverIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import "regenerator-runtime/runtime";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Root() {
  const [nameModule, setNameModule] = useState("");
  const [nameEdit, setNameEdit] = useState("");
  const [search, setSearch] = useState("");
  const [searchCollab, setSearchCollab] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [listModule, setListModule] = useState();
  const [listModuleCollab, setListModuleCollab] = useState();
  console.log(listModuleCollab);
  const [indexItem, setIndexItem] = useState();
  const [typeAction, setTypeAction] = useState();
  const [isClose, setIsClose] = useState(true);

  const getModule = async () => {
    const idUser = JSON.parse(localStorage.getItem("userLogin"))?.id;
    let url = `http://localhost:3000/api/build?_sort=mode&createById=${idUser}`;

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
        setListModule(data);
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const getModuleCollab = async () => {
    const idUser = JSON.parse(localStorage.getItem("userLogin"))?.id;
    let url = `http://localhost:3000/api/build/collab/${idUser}`;

    if (searchCollab.length > 0) {
      url += `?keySearch=${searchCollab}`;
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
        setListModuleCollab(data?.data);
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const deleteModule = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/build/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error("Có lỗi xảy ra ở máy chủ !");
      } else {
        toast.success("Hoàn tất xóa hệ thống !");
        setIndexItem(null);
        setTypeAction("");
        getModule();
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const handleAction = async (id) => {
    let dataSubmit;

    if (typeAction === "stop") {
      dataSubmit = {
        mode: "inactive",
      };
    } else if (typeAction === "edit") {
      dataSubmit = {
        name: nameEdit,
      };
    } else if (typeAction === "open") {
      dataSubmit = {
        mode: "user",
      };
    }

    try {
      const response = await fetch(`http://localhost:3000/api/build/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataSubmit),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error("Có lỗi xảy ra ở máy chủ !");
      } else {
        if (typeAction === "stop") {
          setIndexItem(null);
          setTypeAction("");
          toast.success("Hoàn tất dừng hoạt động !");
          getModule();
        } else if (typeAction === "edit") {
          setIndexItem(null);
          setTypeAction("");
          toast.success("Hoàn tất chỉnh sửa !");
          getModule();
        } else if (typeAction === "open") {
          setIndexItem(null);
          setTypeAction("");
          toast.success("Hoàn tất mở hoạt động !");
          getModule();
        }
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const idUser = JSON.parse(localStorage.getItem("userLogin"))?.id;

      if (!token) {
        toast.error("Vui lòng đăng nhập để thực hiện hành động này!");
        setIsLoading(false);
        return;
      }

      const response = await fetch("http://localhost:3000/api/build", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-Id": `${idUser}`,
        },
        body: JSON.stringify({ name: nameModule, mode: "edit" }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Có lỗi xảy ra ở máy chủ!");
      } else {
        window.location.href = `/build?id=${encodeURIComponent(data?.id)}`;
      }
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error("Có lỗi xảy ra khi gửi yêu cầu!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getModule();
    getModuleCollab();
  }, []);

  return (
    <>
      <Toaster />
      <div className="px-4 py-6 sm:px-6 md:px-8 lg:px-10">
        <h1 className="text-2xl font-bold mb-4 text-indigo-700">
          Tạo hệ thống quản lý mới
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-center rounded-[10px] bg-indigo-100 p-4 hover:bg-indigo-200 transition-colors">
          <input
            type="text"
            value={nameModule}
            onChange={(e) => setNameModule(e.currentTarget.value)}
            placeholder="Nhập tên hệ thống quản lý"
            className="p-2 col-span-1 lg:col-span-5 text-indigo-700 bg-white border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            className={`flex items-center justify-center p-2 rounded-md transition-colors ${
              nameModule.length === 0 || isLoading
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-indigo-700 text-white hover:bg-indigo-800"
            }`}
            disabled={nameModule.length === 0 || isLoading}
            onClick={() => handleSubmit()}
          >
            {!isLoading ? (
              <>
                <PlusIcon className="w-6 h-6 mr-1" />
                <span className="font-medium">Tạo mới</span>
              </>
            ) : (
              <>
                <CircleStackIcon className="w-6 h-6 mr-1" />
                <span className="font-medium">Đang xử lý</span>
              </>
            )}
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center py-2">
          <h1 className="text-2xl font-bold mb-4 text-indigo-700 mt-4">
            Các hệ thống quản lý hiện có
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 items-center rounded-[10px] bg-indigo-100 p-2 hover:bg-indigo-200 transition-colors">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
              placeholder="Nhập tên hệ thống quản lý"
              className="col-span-1 lg:col-span-5 p-2 text-indigo-700 bg-white border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              className="flex items-center justify-center p-2 rounded-md transition-colors bg-indigo-700 text-white hover:bg-indigo-800 col-span-1 lg:col-span-2"
              onClick={() => getModule()}
            >
              <MagnifyingGlassIcon className="w-6 h-6 mr-1" />
              <span className="font-medium">Tìm kiếm</span>
            </button>
          </div>
        </div>

        {listModule && listModule.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xs:grid-cols-1">
            {listModule.map((item, index) => (
              <div
                key={index}
                className={`relative group flex items-center justify-between shadow-md p-4 rounded-md duration-200
        ${
          item.mode === "inactive"
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-indigo-700 text-white hover:bg-white hover:text-indigo-700 cursor-pointer"
        }
      `}
                onClick={() => {
                  if (item.mode !== "inactive") {
                    window.location.href = `/build?id=${encodeURIComponent(
                      item.id
                    )}`;
                  }
                }}
              >
                {index === indexItem && typeAction === "delete" ? (
                  <div className="flex gap-2 justify-between w-full items-center">
                    <TrashIcon className="w-6 h-6" />
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 w-[45%]"
                      onClick={(e) => {
                        deleteModule(item.id);
                        e.stopPropagation();
                      }}
                    >
                      Xác nhận
                    </button>
                    <button
                      className="bg-white text-black border border-gray-300 px-3 pt-[2px] pb-[2px] rounded-lg hover:bg-gray-100 w-[45%]"
                      onClick={(e) => {
                        setIndexItem(null);
                        setTypeAction("");
                        e.stopPropagation();
                      }}
                    >
                      Hủy
                    </button>
                  </div>
                ) : index === indexItem && typeAction === "stop" ? (
                  <div className="flex gap-2 justify-between w-full items-center">
                    <NoSymbolIcon className="w-6 h-6" />
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 w-[45%]"
                      onClick={(e) => {
                        handleAction(item.id);
                        e.stopPropagation();
                      }}
                    >
                      Xác nhận
                    </button>
                    <button
                      className="bg-white text-black border border-gray-300 px-3 pt-[2px] pb-[2px] rounded-lg hover:bg-gray-100 w-[45%]"
                      onClick={(e) => {
                        setIndexItem(null);
                        setTypeAction("");
                        e.stopPropagation();
                      }}
                    >
                      Hủy
                    </button>
                  </div>
                ) : index === indexItem && typeAction === "open" ? (
                  <div className="flex gap-2 justify-between w-full items-center">
                    <LockOpenIcon className="w-6 h-6" />
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 w-[45%]"
                      onClick={(e) => {
                        handleAction(item.id);
                        e.stopPropagation();
                      }}
                    >
                      Xác nhận
                    </button>
                    <button
                      className="bg-white text-black border border-gray-300 px-3 pt-[2px] pb-[2px] rounded-lg hover:bg-gray-100 w-[45%]"
                      onClick={(e) => {
                        setIndexItem(null);
                        setTypeAction("");
                        e.stopPropagation();
                      }}
                    >
                      Hủy
                    </button>
                  </div>
                ) : index === indexItem && typeAction === "edit" ? (
                  <div className="flex gap-2 justify-between w-full items-center">
                    <PencilSquareIcon className="w-6 h-6" />
                    <input
                      type="text"
                      value={nameEdit}
                      onChange={(e) => setNameEdit(e.currentTarget.value)}
                      placeholder="Nhập tên hệ thống quản lý"
                      className="py-[2.5px] px-2 mr-2 text-indigo-700 bg-white border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-[70%]"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <button
                      className="bg-green-700 text-white px-3 pt-[4px] pb-[4px] rounded-lg hover:bg-green-600 w-[20%]"
                      onClick={(e) => {
                        handleAction(item.id);
                        e.stopPropagation();
                      }}
                    >
                      Lưu
                    </button>
                  </div>
                ) : (
                  <>
                    {item.mode === "edit" ? (
                      <WrenchScrewdriverIcon className="w-6 h-6" />
                    ) : item.mode === "user" ? (
                      <UserCircleIcon className="w-6 h-6" />
                    ) : item.mode === "inactive" ? (
                      <NoSymbolIcon className="w-6 h-6" />
                    ) : (
                      <></>
                    )}
                    <span className="uppercase font-bold truncate">
                      {item.name}
                    </span>
                    <div
                      className="p-1 rounded-lg transition-colors duration-200 cursor-pointer hover:bg-indigo-700"
                      onClick={(e) => {
                        setIndexItem(index);
                        setIsClose(false);
                        setTypeAction("");
                        setNameEdit("");
                        e.stopPropagation();
                      }}
                    >
                      <EllipsisVerticalIcon className="w-6 h-6 transition-colors duration-200 text-white group-hover:text-indigo-700 hover:text-white hover:!text-white" />
                    </div>
                  </>
                )}
                {index === indexItem && !isClose ? (
                  <div className="absolute top-full right-0 mt-2 z-10 bg-white/50 backdrop-blur-sm text-black shadow-lg rounded-md p-2">
                    {item.mode === "inactive" ? (
                      <div
                        className="flex items-center rounded-md px-2 py-1 hover:bg-indigo-700 hover:text-white transition-colors duration-150 cursor-pointer"
                        onClick={(e) => {
                          setTypeAction("open");
                          setIsClose(true);
                          e.stopPropagation();
                        }}
                      >
                        <LockOpenIcon className="w-6 h-6 mr-1" />
                        <span className="font-semibold">Hoạt động</span>
                      </div>
                    ) : (
                      <>
                        <div
                          className="flex items-center rounded-md px-2 py-1 hover:bg-indigo-700 hover:text-white transition-colors duration-150 cursor-pointer"
                          onClick={(e) => {
                            setTypeAction("edit");
                            setIsClose(true);
                            setNameEdit(item.name);
                            e.stopPropagation();
                          }}
                        >
                          <PencilSquareIcon className="w-6 h-6 mr-1" />
                          <span className="font-semibold">
                            Sửa tên hệ thống
                          </span>
                        </div>
                        <div
                          className="flex items-center rounded-md px-2 py-1 hover:bg-indigo-700 hover:text-white transition-colors duration-150 cursor-pointer"
                          onClick={(e) => {
                            setTypeAction("stop");
                            setIsClose(true);
                            e.stopPropagation();
                          }}
                        >
                          <NoSymbolIcon className="w-6 h-6 mr-1" />
                          <span className="font-semibold">Dừng hoạt động</span>
                        </div>
                        <div
                          className="flex items-center rounded-md px-2 py-1 hover:bg-indigo-700 hover:text-white transition-colors duration-150 cursor-pointer"
                          onClick={(e) => {
                            setTypeAction("delete");
                            setIsClose(true);
                            e.stopPropagation();
                          }}
                        >
                          <TrashIcon className="w-6 h-6 mr-1" />
                          <span className="font-semibold">Xóa hệ thống</span>
                        </div>
                      </>
                    )}
                    <div
                      className="flex items-center rounded-md px-2 py-1 hover:bg-indigo-700 hover:text-white transition-colors duration-150 cursor-pointer"
                      onClick={(e) => {
                        setIndexItem(null);
                        e.stopPropagation();
                      }}
                    >
                      <XMarkIcon className="w-6 h-6 mr-1" />
                      <span className="font-semibold">Đóng</span>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center">
            <h1 className="text-1xl font-bold mb-4 mt-4 text-gray-500 italic text-center max-w-3xl">
              Bạn chưa có hệ thống quản lý nào. Hãy tạo mới để thuận tiện cho
              việc quản lý dự án của mình.
            </h1>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center py-2">
          <h1 className="text-2xl font-bold mb-4 text-indigo-700 mt-4">
            Các hệ thống quản lý tham gia
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 items-center rounded-[10px] bg-indigo-100 p-2 hover:bg-indigo-200 transition-colors">
            <input
              type="text"
              placeholder="Nhập tên hệ thống quản lý"
              value={searchCollab}
              onChange={(e) => setSearchCollab(e.currentTarget.value)}
              className="col-span-1 lg:col-span-5 p-2 text-indigo-700 bg-white border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              className="flex items-center justify-center p-2 rounded-md transition-colors bg-indigo-700 text-white hover:bg-indigo-800 col-span-1 lg:col-span-2"
              onClick={() => getModuleCollab()}
            >
              <MagnifyingGlassIcon className="w-6 h-6 mr-1" />
              <span className="font-medium">Tìm kiếm</span>
            </button>
          </div>
        </div>
        {listModuleCollab && listModuleCollab.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xs:grid-cols-1">
            {listModuleCollab.map((item, index) => (
              <div
                key={index}
                className={
                  "group flex justify-between items-center shadow-md p-4 rounded-md duration-200 bg-indigo-700 text-white hover:bg-white hover:text-indigo-700 cursor-pointer"
                }
                onClick={() => {
                  window.location.href = `/build?id=${encodeURIComponent(
                    item.id
                  )}`;
                }}
              >
                {item.mode === "edit" ? (
                  <WrenchScrewdriverIcon className="w-6 h-6" />
                ) : item.mode === "user" ? (
                  <UserCircleIcon className="w-6 h-6" />
                ) : item.mode === "inactive" ? (
                  <NoSymbolIcon className="w-6 h-6" />
                ) : (
                  <></>
                )}
                <span className="uppercase font-bold truncate">
                  {item.name}
                </span>
                <div></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center">
            <h1 className="text-1xl font-bold mb-4 mt-4 text-gray-500 italic text-center max-w-3xl">
              Bạn chưa được thêm vào hệ thống quản lý khác nào !
            </h1>
          </div>
        )}
      </div>
    </>
  );
}
