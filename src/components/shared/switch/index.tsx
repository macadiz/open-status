import classNames from "classnames";
import { SwitchProps } from "./types";
import { ChangeEvent, useEffect, useState } from "react";

export const Switch = (props: SwitchProps) => {
  const [isOn, setIsOn] = useState(!!props.on);

  const classes = classNames({
    "flex items-center rounded-full p-1 h-6 bg-gray-500 w-12 before:w-4 before:h-4 before:rounded-full before:bg-white":
      true,
    "justify-end": isOn,
    "justify-start": !isOn,
  });

  useEffect(() => {
    setIsOn(!!props.on);
  }, [props.on]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.onChange?.(event.target.checked);
  };

  return (
    <label className="flex gap-2">
      <span>{props.label}</span>
      <div className={classes}></div>
      <input
        type="checkbox"
        className="hidden"
        onChange={onChange}
        checked={isOn}
      />
    </label>
  );
};
