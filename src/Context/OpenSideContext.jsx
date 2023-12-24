import { createContext, useState } from "react";
export const ContextSide = createContext();
const OpenSideContext = ({ children }) => {
  const [side, setSide] = useState(false);
  return (
    <ContextSide.Provider value={{ side, setSide }}>
      {children}
    </ContextSide.Provider>
  );
};

export default OpenSideContext;
