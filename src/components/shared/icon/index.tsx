import { IconProps } from "./types";

export const Icon = (props: IconProps) => {
  return (
    <span className="material-symbols-outlined notranslate !text-[length:inherit]">
      {props.name}
    </span>
  );
};
