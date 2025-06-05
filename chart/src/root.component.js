import "@mantine/core/styles.css";
import { createTheme, MantineProvider, Divider, Tooltip } from "@mantine/core";
import { AreaChart, BarChart } from "@mantine/charts";
import {
  IconChevronRight,
  IconChevronLeft,
  IconKey,
  IconGraph,
  IconGraphOff,
} from "@tabler/icons-react";
import { useState, useEffect } from "react";
import "./index.css";
import {
  sharedStateBarChart,
  sharedStateDataBarChart,
} from "../../shared-state";
import { LineChart } from "recharts";

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function Root() {
  const [data, setData] = useState();
  const [dataColumn, setDataColumn] = useState();
  const [typeChart, setTypeChart] = useState("");
  const [dataKey, setDataKey] = useState("");
  const [series, setSeries] = useState([]);

  const [barChartMode, setBarChartMode] = useState();

  const [isOpenEdit, setIsOpenEdit] = useState(true);

  const handleDeleteColumn = (accessorKey) => {
    setSeries((prev) => prev.filter((item) => item.name !== accessorKey));
  };

  useEffect(() => {
    const handleSharedStateUpdate = (event) => {
      setDataColumn(event.detail?.dataColumn || []);
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
      setData(event.detail?.dataTable || []);
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
      setBarChartMode(event.detail?.barChart || []);
    };

    window.addEventListener(
      "sharedStateBarChart:updated",
      handleSharedStateUpdate
    );

    return () => {
      window.removeEventListener(
        "sharedStateBarChart:updated",
        handleSharedStateUpdate
      );
    };
  }, []);

  useEffect(() => {
    const handleSharedStateUpdate = (event) => {
      setSeries(event.detail.series || []);
      setDataKey(event.detail.dataKey);
    };

    window.addEventListener(
      "sharedStateDataBarChart:updated",
      handleSharedStateUpdate
    );

    return () => {
      window.removeEventListener(
        "sharedStateDataBarChart:updated",
        handleSharedStateUpdate
      );
    };
  }, []);

  useEffect(() => {
    const handleSharedStateUpdate = (event) => {
      setTypeChart(event.detail.type);
    };

    window.addEventListener(
      "sharedStateTypeChart:updated",
      handleSharedStateUpdate
    );

    return () => {
      window.removeEventListener(
        "sharedStateTypeChart:updated",
        handleSharedStateUpdate
      );
    };
  }, []);

  useEffect(() => {
    if (dataKey?.length > 0 || series?.length > 0) {
      sharedStateDataBarChart.setData({ dataKey: dataKey, series: series });
    }
  }, [dataKey, series]);

  return (
    <MantineProvider theme={theme}>
      {barChartMode === "on" ? (
        <div
          className={`${
            isOpenEdit
              ? "grid grid-cols-1 lg:grid-cols-3 items-end"
              : "flex justify-end items-end"
          } gap-2 w-[100%] duration-200 mb-8`}
        >
          {typeChart === "bar" ? (
            <BarChart
              h={300}
              data={data}
              dataKey={dataKey}
              series={series}
              tickLine="x"
              gridAxis="xy"
              className="col-span-2"
            />
          ) : typeChart === "area" ? (
            <AreaChart
              h={300}
              data={data}
              dataKey={dataKey}
              series={series}
              tickLine="x"
              gridAxis="xy"
              className="col-span-2"
            />
          ) : (
            <LineChart
              h={300}
              data={data}
              dataKey={dataKey}
              series={series}
              tickLine="x"
              gridAxis="xy"
              className="col-span-2"
            />
          )}

          <div
            className={`relative p-2 bg-indigo-50 rounded-lg shadow col-span-1 w-full transition-all duration-300 overflow-hidden ${
              isOpenEdit
                ? "w-full"
                : "w-[45px] flex items-center justify-center"
            }`}
          >
            {isOpenEdit ? (
              <div className="relative overflow-auto max-h-[calc(100vh-140px)] scrollbar-custom col-span-1">
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
                  label="Điều chỉnh biểu đồ"
                  labelPosition="center"
                  className="text-indigo-700 font-bold"
                />
                {dataColumn &&
                dataColumn?.filter((item) => item.accessorKey !== "action")
                  ?.length > 0 ? (
                  dataColumn
                    .filter((item) => item.accessorKey !== "action")
                    .map((item, index) => (
                      <div
                        className={`flex flex-col gap-2 ${
                          index ===
                          dataColumn?.filter(
                            (item) => item.accessorKey !== "action"
                          )?.length -
                            1
                            ? ""
                            : "border-b-2"
                        } pb-2`}
                        key={index}
                      >
                        <div className="flex flex-col gap-1 sm:flex-row sm:gap-2 items-start sm:items-center justify-between mt-1">
                          <label className="flex flex-col gap-1 w-full sm:flex-[3] sm:w-auto">
                            <span className="text-indigo-700 font-semibold text-sm">
                              Khóa truy cập
                            </span>
                            <input
                              type="text"
                              placeholder="Khóa truy cập"
                              value={item.accessorKey}
                              readOnly
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
                              readOnly
                              className="w-full p-1 text-sm text-indigo-700 bg-white border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </label>
                          <Tooltip label="Key">
                            <IconKey
                              onClick={() => setDataKey(item.accessorKey)}
                              className="text-indigo-700 p-[1px] hover:bg-indigo-800 hover:text-white cursor-pointer rounded-lg duration-200 mt-6"
                            />
                          </Tooltip>
                          {series.some((i) => i.name === item.accessorKey) ? (
                            <Tooltip label="Cột dữ liệu">
                              <IconGraphOff
                                onClick={() =>
                                  handleDeleteColumn(item.accessorKey)
                                }
                                className="text-indigo-700 p-[1px] hover:bg-indigo-800 hover:text-white cursor-pointer rounded-lg duration-200 mt-6"
                              />
                            </Tooltip>
                          ) : (
                            <Tooltip label="Cột dữ liệu">
                              <IconGraph
                                onClick={() =>
                                  setSeries((prev) => [
                                    ...prev,
                                    { name: item.accessorKey, color: "blue.6" },
                                  ])
                                }
                                className="text-indigo-700 p-[1px] hover:bg-indigo-800 hover:text-white cursor-pointer rounded-lg duration-200 mt-6"
                              />
                            </Tooltip>
                          )}
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
                <div
                  className="flex justify-center w-full py-2 pr-4"
                  onClick={() =>
                    sharedStateBarChart.setData({ barChart: "off" })
                  }
                >
                  <button
                    onClick={() =>
                      sharedStateBarChart.setData({ barChart: "off" })
                    }
                    className={`${
                      isOpenEdit ? "" : "hidden"
                    } bg-indigo-700 text-white z-50 px-4 py-2 rounded w-full font-bold transition duration-200 hover:bg-white hover:text-indigo-700`}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ) : (
              <IconChevronLeft
                className="text-indigo-700 p-1 hover:bg-indigo-800 hover:text-white cursor-pointer rounded-3xl duration-200"
                size={24}
                onClick={() => setIsOpenEdit(true)}
              />
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </MantineProvider>
  );
}
