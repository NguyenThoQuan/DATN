import { useEffect, useState, useMemo } from "react";
import { sharedState } from "shared-state";
import "./index.css";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";

export default function Root() {
  const [build, setBuild] = useState(sharedState.data);

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

  return <div></div>;
}
