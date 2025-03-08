import classNames from "classnames";
import { TragProps } from "./types";

export const Tag = (props: TragProps) => {
  const type = props.type ?? "info";

  const classes = classNames({
    "flex gap-2 items-center px-2 py-1 text-base font-normal rounded-full whitespace-nowrap h-8":
      true,
    "bg-amber-100 text-amber-600": type === "warning",
    "bg-green-100 text-green-600": type === "success",
    "bg-cyan-100 text-cyan-600": type === "info",
    "bg-rose-100 text-rose-600": type === "danger",
  });

  return <div className={classes}>{props.children}</div>;
};
