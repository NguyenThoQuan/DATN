import React, { useEffect, useState, useMemo } from "react";
import {
  sharedStateTableList,
  sharedStateTableListBuild,
  sharedStateCreate,
  sharedStateEdit,
  sharedStateDelete,
} from "shared-state";
import "./index.css";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import {
  IconChevronRight,
  IconChevronLeft,
  IconTrash,
  IconSearch,
  IconPlus,
  IconEdit,
} from "@tabler/icons-react";
import {
  Divider,
  Flex,
  TextInput,
  Button,
  Text,
  ScrollArea,
  Grid,
  Checkbox,
  Tooltip,
  ActionIcon,
} from "@mantine/core";
import toast, { Toaster } from "react-hot-toast";
import "regenerator-runtime/runtime";
import { useDebouncedState } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { ModalsProvider } from "@mantine/modals";
import ModalCreate from "./modalCreate.component";

export default function Root() {
  const headerRef = React.useRef(null);
  const [id, setId] = useState();
  const [mode, setMode] = useState();
  const [modeCreate, setModeCreate] = useState();
  const [modeEdit, setModeEdit] = useState();
  const [modeDelete, setModeDelete] = useState();
  const [build, setBuild] = useState(sharedStateTableList || {});
  const [height, setHeight] = useState(0);
  const [data, setData] = useState([]);
  const [dataColumn, setDataColumn] = useState(
    sharedStateTableListBuild.dataColumn || []
  );
  const [col, setCol] = useState({ accessorKey: "", header: "" });
  const [isCheckAK, setIsCheckAK] = useState(true);
  const [isOpenEdit, setIsOpenEdit] = useState(true);

  const [search, setSearch] = useDebouncedState(
    {
      keySearch: "",
    },
    300
  );

  const columns = useMemo(() => {
    if (!dataColumn || !Array.isArray(dataColumn)) return [];

    return dataColumn.map((col) => ({
      accessorKey: col.accessorKey || "defaultKey",
      header: col.header || "Default Header",
      ...(col.accessorKey === "action" && {
        Cell: ({ row }) => (
          <Flex justify={"start"} align={"center"} gap={"xs"}>
            <Tooltip
              label="Chỉnh sửa"
              className={`${modeEdit?.editTable === "on" ? "" : "hidden"}`}
            >
              <ActionIcon variant="light" aria-label="Settings" color="yellow">
                <IconEdit size={"20px"} />
              </ActionIcon>
            </Tooltip>
            <Tooltip
              label="Xóa"
              className={`${modeDelete?.deleteTable === "on" ? "" : "hidden"}`}
            >
              <ActionIcon variant="light" aria-label="Settings" color="red">
                <IconTrash size={"20px"} />
              </ActionIcon>
            </Tooltip>
          </Flex>
        ),
      }),
    }));
  }, [dataColumn, modeEdit, modeDelete]);

  const checkDuplicateAccessorKey = (key) => {
    if (!key) {
      setIsCheckAK(true);
      return;
    }
    const isDuplicate = dataColumn.some((item) => item.accessorKey === key);
    setIsCheckAK(!isDuplicate);
  };

  const handleChangeSearch = (field) => (event) => {
    const value = event.currentTarget?.value ?? "";
    setSearch((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleInputChange = (field) => (event) => {
    const value = event.currentTarget?.value ?? "";
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

  const modalCreate = (props) => {
    modals.openConfirmModal({
      title: <Text className="font-bold">Thêm mới</Text>,
      size: "auto",
      centered: true,
      zIndex: 1000,
      children: <ModalCreate props={props} id={id} setData={setData} />,
      confirmProps: { display: "none" },
      cancelProps: { display: "none" },
    });
  };

  useEffect(() => {
    const headerHeight = headerRef.current?.offsetHeight || 0;
    const handleResize = () => {
      // 190 là chiều cao của phần phân trang
      // headerHeight là chiều cao của phần header
      setHeight(window.innerHeight - (187.5 + headerHeight));
    };

    handleResize(); // Set initial height
    window.addEventListener("resize", handleResize); // Update height on window resize

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up event listener
    };
  }, [height]);

  useEffect(() => {
    const handleSharedStateUpdate = (event) => {
      setBuild(event.detail || {});
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

  useEffect(() => {
    const handleSharedStateUpdate = (event) => {
      setMode(event.detail?.mode || {});
    };

    window.addEventListener("sharedStateMode:updated", handleSharedStateUpdate);

    return () => {
      window.removeEventListener(
        "sharedStateMode:updated",
        handleSharedStateUpdate
      );
    };
  }, []);

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
    if (dataColumn.length > 0) {
      sharedStateTableListBuild.setData({ dataColumn: dataColumn });
    }
  }, [dataColumn]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idFromUrl = params.get("id");
    if (idFromUrl) {
      setId(decodeURIComponent(idFromUrl));
    }
  }, []);

  useEffect(() => {
    if (modeEdit?.editTable === "on" || modeDelete?.deleteTable === "on") {
      setDataColumn((prev) => {
        const hasActionColumn = prev.some(
          (col) => col.accessorKey === "action"
        );
        if (hasActionColumn) {
          return prev;
        }
        return [...prev, { accessorKey: "action", header: "Thao tác" }];
      });
    } else {
      handleDeleteColumn("action");
    }
  }, [modeEdit, modeDelete]);

  const table = useMantineReactTable({
    columns,
    data: data || [],
    renderTopToolbarCustomActions: () => (
      <Flex justify={"space-between"} w={"100%"}>
        <Flex gap="md">
          <TextInput
            placeholder="Nhập từ khóa"
            defaultValue={search.keySearch}
            onChange={() => handleChangeSearch("keySearch")}
          />
          <Button leftIcon={<IconSearch size={"15px"} />}>Tìm kiếm</Button>
        </Flex>
        <Flex gap={"md"} justify={"flex-end"} align={"center"}>
          <Button
            leftIcon={<IconPlus size={"15px"} />}
            className={`${modeCreate?.createTable === "on" ? "" : "hidden"}`}
            onClick={() => modalCreate(dataColumn)}
          >
            Thêm mới
          </Button>
        </Flex>
      </Flex>
    ),
    renderToolbarInternalActions: () => <></>,
    mantineTableContainerProps: {
      style: { maxHeight: height, minHeight: height },
    },
  });

  return (
    <ModalsProvider>
      <Toaster />
      <div
        className={`${build.tableListMode === "on" ? "" : "hidden"} ${
          isOpenEdit ? "grid grid-cols-1 lg:grid-cols-3" : "flex justify-end"
        } gap-2 w-[100%] lg:h-[calc(100vh-75px)] duration-200`}
      >
        <div
          className={`${
            mode === "user" ? "col-span-3" : "col-span-1 lg:col-span-2"
          } w-full`}
        >
          <MantineReactTable table={table} />
        </div>
        <div
          className={`relative p-2 bg-indigo-50 rounded-lg shadow col-span-1 w-full transition-all duration-300 overflow-hidden ${
            isOpenEdit ? "w-full" : "w-[45px] flex items-center justify-center"
          } ${mode === "user" ? "hidden" : ""}`}
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
              <ScrollArea h={1050}>
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
                    label="Thao tác trường dữ liệu"
                    labelPosition="center"
                    className="text-indigo-700 font-bold"
                  />
                  {dataColumn && dataColumn.length > 0 ? (
                    dataColumn
                      .filter((item) => item.accessorKey !== "action")
                      .map((item, index) => (
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
                            <Tooltip label="Xóa">
                              <IconTrash className="text-indigo-700 p-[2px] hover:bg-indigo-800 hover:text-white cursor-pointer rounded-lg duration-200 mt-6" />
                            </Tooltip>
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
                <Divider
                  my="xs"
                  label="Thêm bộ lọc"
                  labelPosition="center"
                  className="text-indigo-700 font-bold"
                />
                <Grid>
                  {dataColumn && dataColumn.length > 0 ? (
                    dataColumn
                      .filter((item) => item.accessorKey !== "action")
                      .map((item, index) => (
                        <Grid.Col span={6}>
                          <Checkbox
                            label={item.header}
                            classNames={{
                              label: "text-indigo-700",
                              input: "text-indigo-700 checked:bg-indigo-700",
                            }}
                          />
                        </Grid.Col>
                      ))
                  ) : (
                    <div className="text-center w-full">
                      <span className="text-1xl font-bold mb-4 mt-4 text-gray-500 italic text-center">
                        Bạn chưa thêm trường dữ liệu nào !
                      </span>
                    </div>
                  )}
                </Grid>
                <Divider
                  my="xs"
                  label="Thao tác bảng"
                  labelPosition="center"
                  className="text-indigo-700 font-bold"
                />
                <Grid grow>
                  <Grid.Col span={6}>
                    <Checkbox
                      label="Thêm mới"
                      checked={modeCreate?.createTable === "on" ? true : false}
                      classNames={{
                        label: "text-indigo-700",
                        input: "text-indigo-700 checked:bg-indigo-700",
                      }}
                      onClick={() => {
                        if (modeCreate?.createTable === "on") {
                          setModeCreate("off");
                          sharedStateCreate.setData({ createTable: "off" });
                        } else {
                          setModeCreate("on");
                          sharedStateCreate.setData({ createTable: "on" });
                        }
                      }}
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Checkbox
                      label="Chỉnh sửa"
                      checked={modeEdit?.editTable === "on" ? true : false}
                      classNames={{
                        label: "text-indigo-700",
                        input: "text-indigo-700 checked:bg-indigo-700",
                      }}
                      onClick={() => {
                        if (modeEdit?.editTable === "on") {
                          setModeEdit("off");
                          sharedStateEdit.setData({ editTable: "off" });
                        } else {
                          setModeEdit("on");
                          sharedStateEdit.setData({ editTable: "on" });
                        }
                      }}
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Checkbox
                      label="Xóa"
                      checked={modeDelete?.deleteTable === "on" ? true : false}
                      classNames={{
                        label: "text-indigo-700",
                        input: "text-indigo-700 checked:bg-indigo-700",
                      }}
                      onClick={() => {
                        if (modeDelete?.deleteTable === "on") {
                          setModeDelete("off");
                          sharedStateDelete.setData({ deleteTable: "off" });
                        } else {
                          setModeDelete("on");
                          sharedStateDelete.setData({ deleteTable: "on" });
                        }
                      }}
                    />
                  </Grid.Col>
                </Grid>
              </ScrollArea>
            </>
          ) : (
            <IconChevronLeft
              className="text-indigo-700 p-1 hover:bg-indigo-800 hover:text-white cursor-pointer rounded-3xl duration-200"
              size={24}
              onClick={() => setIsOpenEdit(true)}
            />
          )}
          <div
            className="absolute bottom-0 flex justify-center w-full py-2 pr-4"
            onClick={() =>
              sharedStateTableList.setData({ tableListMode: "off" })
            }
          >
            <button
              className={`${
                isOpenEdit ? "" : "hidden"
              } bg-indigo-700 text-white px-4 py-2 rounded w-full font-bold transition duration-200 hover:bg-white hover:text-indigo-700 hover:border hover:border-indigo-700 hover:border-2`}
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </ModalsProvider>
  );
}
