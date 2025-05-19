import { useEffect, useState, useMemo } from "react";
import { sharedState } from "shared-state";
import "./index.css";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import {
  IconChevronRight,
  IconChevronLeft,
  IconTrash,
} from "@tabler/icons-react";
import { Divider } from "@mantine/core";
import toast, { Toaster } from "react-hot-toast";

export default function Root() {
  const [build, setBuild] = useState(sharedState.data || {});
  const [data, setData] = useState([]);
  const [dataColumn, setDataColumn] = useState([]);
  const [col, setCol] = useState({ accessorKey: "", header: "" });
  const [isCheckAK, setIsCheckAK] = useState(true);
  const [isOpenEdit, setIsOpenEdit] = useState(true);
  console.log(isOpenEdit);

  const columns = useMemo(() => {
    if (!dataColumn || !Array.isArray(dataColumn)) return [];

    return dataColumn.map((col) => ({
      accessorKey: col.accessorKey || "defaultKey",
      header: col.header || "Default Header",
    }));
  }, [dataColumn]);

  const checkDuplicateAccessorKey = (key) => {
    if (!key) {
      setIsCheckAK(true);
      return;
    }
    const isDuplicate = dataColumn.some((item) => item.accessorKey === key);
    setIsCheckAK(!isDuplicate);
  };

  const handleInputChange = (field) => (event) => {
    const value = event.target?.value ?? "";
    setCol((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (field === "accessorKey") {
      checkDuplicateAccessorKey(value);
    }
  };

  const handleDeleteColumn = (accessorKey) => {
    setDataColumn((prev) =>
      prev.filter((item) => item.accessorKey !== accessorKey)
    );
  };

  const handleAddColumn = () => {
    if (col.accessorKey && col.header) {
      setDataColumn((prev) => [...prev, { ...col }]);
      setCol({ accessorKey: "", header: "" });
    }
  };

  const handleUpdateColumn = (oldAccessorKey, updatedFields) => {
    if (!updatedFields.accessorKey || !updatedFields.header) return;

    const isDuplicate = dataColumn.some(
      (item) =>
        item.accessorKey === updatedFields.accessorKey &&
        item.accessorKey !== oldAccessorKey
    );

    if (isDuplicate) {
      toast.error(
        "Khóa truy cập bạn vừa nhập đã tồn tại, vui lòng chọn khóa khác!"
      );
      return;
    }

    setDataColumn((prev) =>
      prev.map((item) =>
        item.accessorKey === oldAccessorKey
          ? { ...item, ...updatedFields }
          : item
      )
    );
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
    <>
      <Toaster />
      <div
        className={`${build.tableList === "on" ? "" : "hidden"} ${
          isOpenEdit ? "grid grid-cols-1 lg:grid-cols-3" : "flex justify-end"
        } gap-2 w-[100%] lg:h-[calc(100vh-75px)]`}
      >
        <div className="col-span-1 lg:col-span-2 w-full">
          <MantineReactTable table={table} />
        </div>
        <div
          className={`p-2 bg-indigo-50 rounded-lg shadow col-span-1 w-full transition-all duration-300 overflow-hidden ${
            isOpenEdit ? "w-full" : "w-[45px] flex items-center justify-center"
          }`}
        >
          {isOpenEdit ? (
            <>
              <div className="flex justify-between items-center w-full">
                <IconChevronRight
                  className="text-indigo-700 p-1 hover:bg-indigo-800 hover:text-white cursor-pointer rounded-3xl duration-200 hidden lg:block"
                  onClick={() => setIsOpenEdit(false)}
                />
                <h2 className="text-xl font-bold text-indigo-700 uppercase">
                  Tùy chỉnh
                </h2>
              </div>
              <Divider
                my="xs"
                label="Thêm trường dữ liệu"
                labelPosition="center"
                className="text-indigo-700 font-bold"
              />
              <div>
                <div className="flex flex-col gap-2 mt-1">
                  <input
                    type="text"
                    placeholder="Khóa truy cập"
                    value={col.accessorKey}
                    onChange={handleInputChange("accessorKey")}
                    className="flex-1 p-1 text-sm text-indigo-700 bg-white border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="text"
                    placeholder="Tên trường dữ liệu"
                    value={col.header}
                    onChange={handleInputChange("header")}
                    className="flex-1 p-1 text-sm text-indigo-700 bg-white border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    className={`text-white text-sm py-2 px-4 rounded-md transition-colors ${
                      isCheckAK
                        ? "bg-indigo-700 hover:bg-indigo-800"
                        : "bg-gray-500 cursor-not-allowed"
                    }`}
                    onClick={handleAddColumn}
                    disabled={!isCheckAK}
                  >
                    {isCheckAK
                      ? "Thêm mới"
                      : "Khóa truy cập không được trùng lặp !"}
                  </button>
                </div>
                <Divider
                  my="xs"
                  label="Chỉnh sửa trường dữ liệu"
                  labelPosition="center"
                  className="text-indigo-700 font-bold"
                />
                {dataColumn && dataColumn.length > 0 ? (
                  dataColumn.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-1 sm:flex-row sm:gap-4 items-start sm:items-center justify-between mt-1"
                    >
                      <label className="flex flex-col gap-1 w-full sm:flex-[3] sm:w-auto">
                        <span className="text-indigo-700 font-semibold text-sm">
                          Khóa truy cập
                        </span>
                        <input
                          type="text"
                          placeholder="Khóa truy cập"
                          value={item.accessorKey}
                          onChange={(e) =>
                            handleUpdateColumn(item.accessorKey, {
                              accessorKey: e.currentTarget.value,
                              header: item.header,
                            })
                          }
                          className="w-full p-1 text-sm text-indigo-700 bg-white border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </label>
                      <label className="flex flex-col gap-1 w-full sm:flex-[6] sm:w-auto">
                        <span className="text-indigo-700 font-semibold text-sm">
                          Trường dữ liệu
                        </span>
                        <input
                          type="text"
                          placeholder="Tên trường dữ liệu"
                          value={item.header}
                          onChange={(e) =>
                            handleUpdateColumn(item.accessorKey, {
                              accessorKey: item.accessorKey,
                              header: e.currentTarget.value,
                            })
                          }
                          className="w-full p-1 text-sm text-indigo-700 bg-white border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </label>
                      <div
                        className="flex flex-col gap-1 w-full sm:flex-[1] sm:w-auto"
                        onClick={() => handleDeleteColumn(item.accessorKey)}
                      >
                        <IconTrash className="text-indigo-700 p-[2px] hover:bg-indigo-800 hover:text-white cursor-pointer rounded-lg duration-200 mt-6" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center w-full">
                    <span className="text-1xl font-bold mb-4 mt-4 text-gray-500 italic text-center">
                      Bạn chưa thêm trường dữ liệu nào !
                    </span>
                  </div>
                )}
              </div>
            </>
          ) : (
            <IconChevronLeft
              className="text-indigo-700 p-1 hover:bg-indigo-800 hover:text-white cursor-pointer rounded-3xl duration-200"
              size={24}
              onClick={() => setIsOpenEdit(true)}
            />
          )}
        </div>
      </div>
    </>
  );
}
