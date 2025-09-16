import { useEffect, useState } from "react";

export default function useWindowWidth(breakpoint = 768) {
  const [wide, setWide] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= breakpoint : true
  );

  useEffect(() => {
    const onResize = () => setWide(window.innerWidth >= breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);

  return wide;
}
