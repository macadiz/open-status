import { PropsWithChildren } from "react";

export type StatusLevel = "success" | "warning" | "danger";
export type IncidentLevel = "success" | "warning" | "info" | "danger";

export type UptimeStatus = {
  id: string;
  alias: string;
  warningThreshold: number;
  dangerThreshold: number;
  uptime: number;
  status: StatusLevel;
  lastEventDate: Date;
};

export type GeneralStatus = {
  uptime: UptimeStatus[];
  status: StatusLevel;
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
  incidents: Incident[];
  isDarkMode: boolean;
  setDarkMode: (on: boolean) => void;
};

export type GlobalContextoProviderProps = PropsWithChildren;
