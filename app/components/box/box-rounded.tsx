import type { RoundedBoxProps } from "~/types/box";

export default function BoxRounded({
  children,
  className = "",
}: RoundedBoxProps): JSX.Element {
  return (
    <div className={`overflow-hidden rounded-3xl ${className}`}>{children}</div>
  );
}
