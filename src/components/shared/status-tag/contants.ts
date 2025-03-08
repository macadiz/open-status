import { StatusLevel } from "../../../context/Global/types";
import { TagType } from "../tag/types";

export const LEVEL_ICON_MAP: Record<StatusLevel, string> = {
  success: "check_circle",
  warning: "warning",
  info: "help",
  danger: "report",
};

export const LEVEL_TAG_TYPE_MAP: Record<StatusLevel, TagType> = {
  success: "success",
  warning: "warning",
  info: "info",
  danger: "danger",
};
