import { createContext, useEffect, useState } from "react";

export const WidthSide = createContext();
export const WidthContext = ({ children }) => {
  const [widthSide, setWidthSide] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", function handelWidth() {
      setWidthSide(window.innerWidth);
    });
    // cleanUP Function
    return ()=> {
      window.removeEventListener("resize", function handelWidth() {
        setWidthSide(window.innerWidth);
      });
    }
  }, []);
  return (
    <WidthSide.Provider value={{ widthSide }}>{children}</WidthSide.Provider>
  );
};
