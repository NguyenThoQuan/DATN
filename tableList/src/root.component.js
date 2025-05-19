import { useEffect, useState } from "react";
import { sharedState } from "shared-state";

export default function Root() {
  const [build, setBuild] = useState(sharedState.data); // Khởi tạo với object

  useEffect(() => {
    const handleSharedStateUpdate = (event) => {
      setBuild(event.detail); // Cập nhật state với object mới
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
    <div>
      {build.tableList === "on" ? (
        <div>1 - Table List is ON</div>
      ) : (
        <div>2 - Table List is OFF</div>
      )}
    </div>
  );
}
