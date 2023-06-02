import type { RoundedBoxProps } from "~/types/box";

export default function BoxRounded({
  children,
  className = "",
}: RoundedBoxProps) {
  return (
    <div className={`overflow-hidden rounded-3xl ${className}`}>{children}</div>
  );
}
