import {
  DetailedStatus,
  GeneralStatus,
  GlobalContextState,
  Incident,
} from "./types";

export const STATUS_MOCK: GeneralStatus = {
  level: "success",
  message: "Everything is ok",
  lastUpdated: new Date(),
};

export const DETAILED_STATUSES_MOCK: DetailedStatus[] = [
  {
    name: "API",
    level: "success",
    message: "Everything is ok",
    lastUpdated: new Date(),
    uptime: 99.9,
  },
  {
    name: "Web App",
    level: "success",
    message: "Everything is ok",
    lastUpdated: new Date(),
    uptime: 99.9,
  },
  {
    name: "Database",
    level: "success",
    message: "Everything is ok",
    lastUpdated: new Date(),
    uptime: 99.9,
  },
  {
    name: "Auth",
    level: "info",
    message: "Everything is ok",
    lastUpdated: new Date(),
    uptime: 99.9,
  },
  {
    name: "Storage",
    level: "warning",
    message: "Everything is ok",
    lastUpdated: new Date(),
    uptime: 99.9,
  },
  {
    name: "CDN",
    level: "danger",
    message: "Everything is ok",
    lastUpdated: new Date(),
    uptime: 99.9,
  },
];

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

export const DEFAULT_GLOBAL_STATE: GlobalContextState = {
  generalStatus: STATUS_MOCK,
  detailedStatuses: DETAILED_STATUSES_MOCK,
  isDarkMode: false,
  setDarkMode: () => {},
  incidents: INCIDENTS_MOCK,
};
