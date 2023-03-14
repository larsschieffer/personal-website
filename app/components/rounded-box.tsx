type RoundedBoxProps = {
  children?: React.ReactNode;
};

export default function RoundedBox({ children }: RoundedBoxProps) {
  return <div className="overflow-hidden rounded-3xl">{children}</div>;
}
