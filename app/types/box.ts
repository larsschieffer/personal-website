import type { PropsWithChildren } from "react";

export interface ContentBoxProps extends PropsWithChildren {
  headline: string;
  options?: {
    position: "left" | "center";
  };
}

export interface RoundedBoxProps extends PropsWithChildren {
  className?: string;
}
