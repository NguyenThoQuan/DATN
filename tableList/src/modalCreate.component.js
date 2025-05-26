import { Box, Button, Grid, TextInput, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconCheck } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ModalCreate({ props, id, setData }) {
  const [dataValueProps, setDataValueProps] = useState();
  const [isLoading, setIsLoading] = useState(false);
  console.log(id);

  const handleInputChange = (key, value) => {
    setDataValueProps((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const createDataTable = async () => {
    setIsLoading(true);
    try {
      const url = `http://localhost:3000/api/build/${id}/dataTable`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataValueProps),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Có lỗi xảy ra ở máy chủ!");
        return;
      } else {
        setIsLoading(false);
        setData((prev) => [dataValueProps, ...prev]);
        toast.success("Hoàn tất thêm mới dữ liệu !");
      }
    } catch (error) {
      console.error("Lỗi:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initialState = props.reduce((att, item) => {
      att[item.accessorKey] = "";
      return att;
    }, {});

    setDataValueProps(initialState);
  }, [props]);

  return (
    <Box>
      <Toaster />
      <Grid grow>
        {props &&
          props?.length > 0 &&
          props?.map((item, index) => (
            <Grid.Col span={4} key={index}>
              <TextInput
                label={item.header}
                placeholder={item.header}
                value={dataValueProps?.[item.accessorKey] || ""}
                onChange={(event) =>
                  handleInputChange(item.accessorKey, event.currentTarget.value)
                }
              />
            </Grid.Col>
          ))}
      </Grid>
      <Flex justify={"center"} mt={"5px"}>
        <Button
          leftIcon={<IconCheck size={"15px"} />}
          disabled={isLoading}
          loading={isLoading}
          onClick={() => {
            createDataTable();
            modals.closeAll();
          }}
        >
          Lưu
        </Button>
      </Flex>
    </Box>
  );
}
