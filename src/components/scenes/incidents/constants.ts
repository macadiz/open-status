import { IncidentLevel, StatusLevel } from "../../../context/Global/types";

export const INCIDENT_LEVEL_STATUS_TAG: Record<
  IncidentLevel,
  StatusLevel | undefined
> = {
  danger: "danger",
  info: undefined,
  success: "success",
  warning: "warning",
};
