import { useMemo } from "react";
import { useEffect } from "react";
import { useContext, createContext, useState } from "react";

export const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  let defaultTheme = window.localStorage.getItem("theme");
  defaultTheme =
    !defaultTheme && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : defaultTheme;

  const [theme, setTheme] = useState(defaultTheme);

  const updateTheme = (newTheme) => {
    if (newTheme === theme) return;
    localStorage.setItem("theme", newTheme);
    setTheme((prev) => newTheme);
  };

  const value = useMemo(() => {
    return { theme, updateTheme };
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
