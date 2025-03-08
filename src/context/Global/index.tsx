/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import {
  DEFAULT_GLOBAL_STATE,
  DETAILED_STATUSES_MOCK,
  INCIDENTS_MOCK,
  STATUS_MOCK,
} from "./constants";
import { GlobalContextoProviderProps } from "./types";

export const GlobalContext = createContext(DEFAULT_GLOBAL_STATE);

export const GlobalContextProvider = (props: GlobalContextoProviderProps) => {
  const [generalStatus] = useState(STATUS_MOCK);
  const [detailedStatuses] = useState(DETAILED_STATUSES_MOCK);
  const [incidents] = useState(INCIDENTS_MOCK);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("dark")) {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setIsDarkMode(true);
      }
    } else {
      if (localStorage.getItem("dark") === "true") {
        setIsDarkMode(true);
      }
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      localStorage.setItem("dark", "true");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("dark", "false");
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const setDarkMode = (on: boolean) => {
    setIsDarkMode(on);
  };

  return (
    <GlobalContext.Provider
      value={{
        generalStatus,
        detailedStatuses,
        isDarkMode,
        setDarkMode,
        incidents,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  return useContext(GlobalContext);
};
