import { BrowserRouter } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { Toaster } from 'sonner';
import "./i18next";

import Routeur from "./Routeur";

export const ThemeContext = createContext("light");

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      // @ts-ignore
      value={{
        SetTheme: setTheme,
        Theme: theme,
      }}
    >
      <BrowserRouter>
        <Toaster position="top-center" richColors />
        <Routeur />
      </BrowserRouter>
    </ThemeContext.Provider>
  );
};

export default App;
