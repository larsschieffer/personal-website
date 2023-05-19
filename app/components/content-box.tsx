import RoundedBox from "./rounded-box";

export default function ContentBox({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <RoundedBox className="md:rounded-tr-none">{children}</RoundedBox>;
}
