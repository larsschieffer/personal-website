export interface RoundedBoxProps {
  children?: React.ReactNode;
  className?: string;
}

export default function RoundedBox({ children, className }: RoundedBoxProps) {
  return (
    <div className={`overflow-hidden rounded-3xl ${className ?? ""}`}>
      {children}
    </div>
  );
}
