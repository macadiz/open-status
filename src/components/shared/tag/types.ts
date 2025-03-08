import { PropsWithChildren } from "react";

export type TagType = "success" | "warning" | "info" | "danger";

export type TragProps = PropsWithChildren & {
  type?: TagType;
};
