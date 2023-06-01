import type { PropsWithChildren } from "react";

export interface RoundedBoxProps {
  className?: string;
}

export default function RoundedBox({
  children,
  className,
}: PropsWithChildren<RoundedBoxProps>) {
  return (
    <div className={`overflow-hidden rounded-3xl ${className ?? ""}`}>
      {children}
    </div>
  );
}
