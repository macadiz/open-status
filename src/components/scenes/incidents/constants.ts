import { IncidentLevel, StatusLevel } from "../../../context/Global/types";

export const INCIDENT_LEVEL_STATUS_TAG: Record<IncidentLevel, StatusLevel> = {
  danger: "danger",
  info: "info",
  success: "success",
  warning: "warning",
};
