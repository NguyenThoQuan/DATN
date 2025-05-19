import { useEffect, useState } from "react";
import { sharedStateTableList } from "shared-state";

export default function Root() {
  const [build, setBuild] = useState(sharedStateTableList.data);

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

  return <div>{build === "on" ? 1 : 2}</div>;
}
