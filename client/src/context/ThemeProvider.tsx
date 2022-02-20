import { useContext, useState, createContext, useEffect } from "react";
import { toggleTheme, getTheme } from "../utils/useLocalStorage";
interface themeInterface {
  value: string;
  toggle: Function;
}
export const ThemeContext = createContext({} as themeInterface);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    setTheme(getTheme());
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        value: theme,
        toggle: () => setTheme(toggleTheme(theme)),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
