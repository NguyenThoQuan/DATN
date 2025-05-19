import { useEffect, useState, useMemo } from "react";
import { sharedState } from "shared-state";
import "./index.css";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { IconChevronDown } from "@tabler/icons-react";

export default function Root() {
  const [build, setBuild] = useState(sharedState.data || {}); // Ensure build is not null/undefined
  const [data, setData] = useState([]);
  const [dataColumn, setDataColumn] = useState([]);
  console.log(dataColumn);
  const [col, setCol] = useState({ accessorKey: "", header: "" });
  const [isOpenEdit, setIsOpenEdit] = useState(true);

  const columns = useMemo(() => {
    if (!dataColumn || !Array.isArray(dataColumn)) return [];

    return dataColumn.map((col) => ({
      accessorKey: col.accessorKey || "defaultKey",
      header: col.header || "Default Header",
    }));
  }, [dataColumn]);

  const handleInputChange = (field) => (event) => {
    const value = event.target?.value ?? "";
    setCol((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddColumn = () => {
    if (col.accessorKey && col.header) {
      setDataColumn((prev) => [...prev, { ...col }]);
      setCol({ accessorKey: "", header: "" });
    }
  };

  const table = useMantineReactTable({
    columns,
    data: data || [],
  });

  useEffect(() => {
    const handleSharedStateUpdate = (event) => {
      setBuild(event.detail || {});
    };

    window.addEventListener("sharedState:updated", handleSharedStateUpdate);

    return () => {
      window.removeEventListener(
        "sharedState:updated",
        handleSharedStateUpdate
      );
    };
  }, []);

  return (
    <div
      className={`${
        build.tableList === "on" ? "" : "hidden"
      } grid grid-cols-1 lg:grid-cols-3 gap-2 w-[100%]`}
    >
      <div className="col-span-1 lg:col-span-2 w-full">
        <MantineReactTable table={table} />
      </div>
      <div className="p-2 bg-indigo-50 rounded-lg shadow col-span-1 w-full">
        <div className="flex justify-between items-center w-full">
          <h2 className="text-xl font-bold text-indigo-700 mb-1 uppercase">
            Tùy chỉnh
          </h2>
          <IconChevronDown
            className="text-indigo-700 p-1 hover:bg-indigo-800 hover:text-white cursor-pointer rounded-3xl duration-200"
            onClick={() => setIsOpenEdit(false)}
          />
        </div>
        <div className="border-t border-indigo-700 mt-1">
          <span className="text-indigo-700 font-semibold text-sm">
            Thêm trường
          </span>
          <div className="flex flex-col gap-2 mt-1">
            <input
              type="text"
              placeholder="Khóa (Key)"
              value={col.accessorKey}
              onChange={handleInputChange("accessorKey")}
              className="flex-1 p-2 text-indigo-700 bg-white border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Tên trường dữ liệu"
              value={col.header}
              onChange={handleInputChange("header")}
              className="flex-1 p-2 text-indigo-700 bg-white border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              className="bg-indigo-700 text-white py-2 px-4 rounded-md hover:bg-indigo-800 transition-colors"
              onClick={handleAddColumn}
            >
              Thêm mới
            </button>
          </div>
          <span className="text-indigo-700 font-semibold text-sm">
            Các trường đã thêm
          </span>
          {dataColumn && dataColumn.length > 0 ? (
            dataColumn.map((item, index) => <div key={index}></div>)
          ) : (
            <div className="text-center w-full">
              <span className="text-1xl font-bold mb-4 mt-4 text-gray-500 italic text-center">
                Bạn chưa thêm trường dữ liệu nào !
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
