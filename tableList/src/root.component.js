import { useEffect, useState } from "react";

export default function Root() {
  const [build, setBuild] = useState();
  console.log(build);

  useEffect(() => {
    if (
      localStorage.getItem("buildModule") &&
      JSON.parse(localStorage.getItem("buildModule"))?.tableList
    ) {
      setBuild(JSON.parse(localStorage.getItem("buildModule"))?.tableList);
    }
  }, [JSON.parse(localStorage.getItem("buildModule"))]);

  return <div>{build === "on" ? 1 : 2}</div>;
}
