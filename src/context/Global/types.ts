import { PropsWithChildren } from "react";

export type StatusLevel = "success" | "warning" | "info" | "danger";
export type IncidentLevel = "success" | "warning" | "info" | "danger";

export type GeneralStatus = {
  level: StatusLevel;
  message: string;
  lastUpdated: Date;
};

export type DetailedStatus = GeneralStatus & {
  name: string;
  uptime: number;
};

export type Incident = {
  level: IncidentLevel;
  title: string;
  details: string;
  date: Date;
};

export type GlobalContextState = {
  generalStatus: GeneralStatus;
  detailedStatuses: DetailedStatus[];
  incidents: Incident[];
  isDarkMode: boolean;
  setDarkMode: (on: boolean) => void;
};

export type GlobalContextoProviderProps = PropsWithChildren;
