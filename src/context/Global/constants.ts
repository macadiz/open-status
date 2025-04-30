import { add } from "date-fns";
import { GeneralStatus, GlobalContextState, Incident } from "./types";

export const STATUS_DATA = {
  uptime: [
    {
      id: "a37923d3-f8d1-4db3-800f-3e63f9b7a373",
      alias: "self",
      warningThreshold: 95,
      dangerThreshold: 90,
      uptime: 100,
      status: "success",
    },
    {
      id: "ef1fb180-9ebf-48f3-a014-6335e1e0fe3c",
      alias: "google",
      warningThreshold: 95,
      dangerThreshold: 90,
      uptime: 93.89671361502347,
      status: "warning",
    },
  ],
  generalStatus: "warning",
};

export const STATUS_MOCK: GeneralStatus = {
  status: "success",
  uptime: [],
  lastUpdated: new Date(),
};

export const INCIDENTS_MOCK: Incident[] = [
  {
    date: new Date(),
    details: "",
    level: "warning",
    title: "Storage performance degradation",
  },
  {
    date: new Date(),
    details: "",
    level: "success",
    title: "Brief API Outage",
  },
];

const NOW = new Date();
const ONE_WEEK_BACK = add(NOW, { weeks: -1 });

export const DEFAULT_GLOBAL_STATE: GlobalContextState = {
  generalStatus: STATUS_MOCK,
  isDarkMode: false,
  setDarkMode: () => {},
  incidents: INCIDENTS_MOCK,
  startDate: ONE_WEEK_BACK,
  setStartDate: () => {},
  endDate: NOW,
  setEndDate: () => {},
};
