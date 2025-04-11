/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { DEFAULT_GLOBAL_STATE, INCIDENTS_MOCK, STATUS_MOCK } from "./constants";
import { GlobalContextoProviderProps } from "./types";
import { add } from "date-fns";

export const GlobalContext = createContext(DEFAULT_GLOBAL_STATE);

const solveColorScheme = (setModeFunction: VoidFunction) => {
  if (!localStorage.getItem("dark")) {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setModeFunction();
    }
  } else {
    if (localStorage.getItem("dark") === "true") {
      setModeFunction();
    }
  }
};

export const GlobalContextProvider = (props: GlobalContextoProviderProps) => {
  const [generalStatus, setGeneralStatus] = useState(STATUS_MOCK);
  const [incidents] = useState(INCIDENTS_MOCK);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const fetchGeneralStatus = useCallback(() => {
    const now = new Date();
    const oneWeekBack = add(now, { weeks: -1 });

    fetch(
      `/api/services/summary?startDate=${oneWeekBack.toISOString()}&endDate=${now.toISOString()}`
    ).then((response) => {
      response.json().then((data) => {
        setGeneralStatus(data);
      });
    });
  }, []);

  useEffect(() => {
    solveColorScheme(() => {
      setDarkMode(true);
    });
    fetchGeneralStatus();
  }, [fetchGeneralStatus]);

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
