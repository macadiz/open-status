import {
  DetailedStatus,
  GeneralStatus,
  StatusLevel,
} from "../../../context/Global/types";

export type StatusTagProps = {
  status?: GeneralStatus | DetailedStatus;
  level?: StatusLevel;
  showMessage?: boolean;
};
