import { Box, Text, Flex, Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconCheck } from "@tabler/icons-react";
import toast, { Toaster } from "react-hot-toast";

export default function ModalDelete({ idBuild, idData, setIsFetch }) {
  const deleteDataTable = async () => {
    try {
      const url = `http://localhost:3000/api/build/${idBuild}/dataTable/${idData}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Có lỗi xảy ra ở máy chủ!");
        return;
      } else {
        setIsFetch((prev) => !prev);
        toast.success("Hoàn tất xóa dữ liệu !");
        modals.closeAll();
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  return (
    <Box>
      <Toaster />
      <Text>Bạn chắc chắn muốn xóa dữ liệu này ?</Text>
      <Flex justify={"center"} mt={10}>
        <Button
          leftIcon={<IconCheck size={20} />}
          onClick={() => deleteDataTable()}
          color="red"
        >
          Xác nhận
        </Button>
      </Flex>
    </Box>
  );
}
