import { useMemo } from "react";
import { useEffect } from "react";
import { useContext, createContext, useState } from "react";

const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const defaultTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  const [theme, setTheme] = useState(defaultTheme);

  const value = useMemo(() => {
    return { theme, setTheme };
  }, [theme]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
