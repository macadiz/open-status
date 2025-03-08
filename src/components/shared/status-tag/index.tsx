import { StatusLevel } from "../../../context/Global/types";
import { Icon } from "../icon";
import { Tag } from "../tag";
import { LEVEL_ICON_MAP } from "./contants";
import { StatusTagProps } from "./types";

export const StatusTag = (props: StatusTagProps) => {
  if (!props.status?.level && !props.level) {
    console.error("WRONG TAG CONFIGURATION");
    return <>No tag</>;
  }

  const level = props.status?.level ?? (props.level as StatusLevel);

  return (
    <Tag type={level}>
      <Icon name={LEVEL_ICON_MAP[level]} />
      {props.showMessage && <span>{props.status?.message}</span>}
    </Tag>
  );
};
