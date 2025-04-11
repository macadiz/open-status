import { IncidentLevel } from "../../../context/Global/types";
import { TagType } from "../tag/types";

export const LEVEL_ICON_MAP: Record<IncidentLevel, string> = {
  success: "check_circle",
  warning: "warning",
  info: "help",
  danger: "report",
};

export const LEVEL_TAG_TYPE_MAP: Record<IncidentLevel, TagType> = {
  success: "success",
  warning: "warning",
  info: "info",
  danger: "danger",
};

export const LEVEL_TAG_MESSAGE: Record<IncidentLevel, string> = {
  success: "Everything is ok!",
  warning: "Warning",
  info: "Information",
  danger: "Danger",
};
