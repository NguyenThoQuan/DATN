import { useEffect, useState, useMemo } from "react";
import { sharedState } from "shared-state";
import "./index.css";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";

export default function Root() {
  const [build, setBuild] = useState(sharedState.data);
  const [data, setData] = useState([]);
  console.log(build);

  const columns = useMemo(
    () => [
      // {
      //   accessorKey: 'name.firstName',
      //   header: 'First Name',
      // },
      // {
      //   accessorKey: 'name.lastName',
      //   header: 'Last Name',
      // },
      // {
      //   accessorKey: 'address',
      //   header: 'Address',
      // },
      // {
      //   accessorKey: 'city',
      //   header: 'City',
      // },
      // {
      //   accessorKey: 'state',
      //   header: 'State',
      // },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data,
  });

  useEffect(() => {
    const handleSharedStateUpdate = (event) => {
      setBuild(event.detail);
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
    <div className={`${build.tableList === "on" ? "" : "hidden"}`}>
      <MantineReactTable table={table} />
    </div>
  );
}
