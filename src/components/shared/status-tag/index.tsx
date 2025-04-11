import { StatusLevel } from "../../../context/Global/types";
import { Icon } from "../icon";
import { Tag } from "../tag";
import { LEVEL_ICON_MAP, LEVEL_TAG_MESSAGE } from "./contants";
import { StatusTagProps } from "./types";

export const StatusTag = (props: StatusTagProps) => {
  if (!props.level) {
    console.error("WRONG TAG CONFIGURATION");
    return <>No tag</>;
  }

  const level = props.level as StatusLevel;

  return (
    <Tag type={level}>
      <Icon name={LEVEL_ICON_MAP[level]} />
      {props.showMessage && <span>{LEVEL_TAG_MESSAGE[level]}</span>}
    </Tag>
  );
};
