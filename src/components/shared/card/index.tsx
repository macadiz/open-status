import classNames from "classnames";
import { CardProps } from "./types";

export const Card = (props: CardProps) => {
  const spacing = props.spacing ?? "md";

  const classes = classNames({
    "border border-gray-300 rounded-lg": true,
    "p-2": spacing === "sm",
    "p-4": spacing === "md",
    "p-6": spacing === "lg",
  });

  return <div className={classes}>{props.children}</div>;
};
