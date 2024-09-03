import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import { useLocation } from "react-router-dom";

interface NavContextType {
  activeNav: string;
  setActiveNav: React.Dispatch<React.SetStateAction<string>>;
}

export const NavContext = createContext<NavContextType | undefined>(undefined);

export const NavProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [activeNav, setActiveNav] = useState(location.pathname);

  useEffect(() => {
    setActiveNav(location.pathname);
  }, [location]);

  const contextValue = useMemo(
    () => ({ activeNav, setActiveNav }),
    [activeNav],
  );

  return (
    <NavContext.Provider value={contextValue}>{children}</NavContext.Provider>
  );
};
