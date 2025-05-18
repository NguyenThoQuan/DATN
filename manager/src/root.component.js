import { PlusIcon, CircleStackIcon } from "@heroicons/react/24/solid";
import "regenerator-runtime/runtime";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Root() {
  const [nameModule, setNameModule] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/build", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: nameModule, mode: "edit" }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error("Có lỗi xảy ra ở máy chủ !");
      } else {
        window.location.href = `/build?id=${encodeURIComponent(data?.id)}`;
      }
    } catch (error) {
      console.error("Lỗi:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="px-4 py-6 sm:px-6 md:px-8 lg:px-10">
        <h1 className="text-2xl font-bold mb-4 text-indigo-700">
          Tạo hệ thống quản lý mới
        </h1>
        <div className="flex items-center rounded-[10px] bg-indigo-100 p-4 hover:bg-indigo-200 transition-colors">
          <input
            type="text"
            value={nameModule}
            onChange={(e) => setNameModule(e.currentTarget.value)}
            placeholder="Nhập tên hệ thống quản lý"
            className="w-[80%] p-2 mr-2 text-indigo-700 bg-white border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            className={`w-[20%] flex items-center justify-center p-2 rounded-md transition-colors ${
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
                <span className="font-medium">Tạo mới</span>
              </>
            )}
          </button>
        </div>
        <h1 className="text-2xl font-bold mb-4 text-indigo-700 mt-4">
          Các hệ thống quản lý hiện có
        </h1>
        <div className="flex justify-center">
          <h1 className="text-1xl font-bold mb-4 mt-4 text-gray-500 italic text-center max-w-3xl">
            Bạn chưa có hệ thống quản lý nào. Hãy tạo mới để thuận tiện cho việc
            quản lý dự án của mình.
          </h1>
        </div>
      </div>
    </>
  );
}
