import { PropsWithChildren } from "react";

export type CardSpacing = "sm" | "md" | "lg";

export type CardProps = PropsWithChildren & {
  spacing?: CardSpacing;
};
