import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Box, Grid, TextInput, Flex, Button } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { modals } from "@mantine/modals";

export default function ModalEdit({ props, idData, id, setIsFetch }) {
  const [dataValueProps, setDataValueProps] = useState();
  const [isCallAPI, setIsCallAPI] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (key, value) => {
    setDataValueProps((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const getDataDetail = async () => {
    try {
      let url = `http://localhost:3000/api/dataTable${id}/${idData}`;

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
        if (dataValueProps !== undefined) {
          setDataValueProps(data);
          setIsCallAPI(false);
        }
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const updateData = async () => {
    setIsLoading(true);
    try {
      const url = `http://localhost:3000/api/build/${id}/dataTable/${idData}`;
      const response = await fetch(url, {
        method: "PUT",
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
        setIsFetch((prev) => !prev);
        toast.success("Hoàn tất lưu tùy chỉnh !");
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

  useEffect(() => {
    if (dataValueProps !== undefined && isCallAPI) {
      getDataDetail();
    }
  }, [dataValueProps]);

  return (
    <Box>
      <Grid grow>
        {props &&
          props?.length > 0 &&
          props
            ?.filter((item) => item.accessorKey !== "action")
            ?.map((item, index) => (
              <Grid.Col span={4} key={index}>
                <TextInput
                  label={item.header}
                  placeholder={item.header}
                  value={dataValueProps?.[item.accessorKey] || ""}
                  onChange={(event) =>
                    handleInputChange(
                      item.accessorKey,
                      event.currentTarget.value
                    )
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
            updateData();
            modals.closeAll();
          }}
        >
          Lưu
        </Button>
      </Flex>
    </Box>
  );
}
