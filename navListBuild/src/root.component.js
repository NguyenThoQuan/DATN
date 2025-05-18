import "./index.css";
import { useEffect, useState } from "react";
import "regenerator-runtime/runtime";

export default function Root() {
  const [id, setId] = useState();
  const [dataBuild, setDataBuild] = useState();

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
      toast.error("Đã có lỗi xảy ra khi gọi API!");
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
    <div className="bg-white px-10 py-2 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold uppercase">
        {dataBuild?.name || "Tên trang"}
      </h1>
      <select
        className="bg-white border border-black rounded-md px-2 py-1 text-sm focus:outline-none w-48"
        value={dataBuild?.mode}
        onChange={(e) => handleChangeValue(e.target.value, "mode")}
      >
        <option value="" disabled>
          Chọn chế độ
        </option>
        <option
          className="bg-white hover:bg-indigo-700 hover:text-white rounded-md"
          value="edit"
        >
          Chế độ chỉnh sửa
        </option>
        <option
          className="bg-white hover:bg-indigo-700 hover:text-white rounded-md"
          value="user"
        >
          Chế độ người dùng
        </option>
        <option
          className="bg-white hover:bg-indigo-700 hover:text-white rounded-md"
          value="inactive"
        >
          Dừng hoạt động
        </option>
      </select>
    </div>
  );
}
