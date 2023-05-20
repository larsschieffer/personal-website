import RoundedBox from "./rounded-box";

export default function ContentBox({
  children,
  headline,
}: {
  children?: React.ReactNode;
  headline: string;
}) {
  return (
    <RoundedBox className="bg-white md:rounded-tr-none [&>*:first-child]:pb-0 [&>*:first-child]:pt-10 [&>*:last-child]:pb-10 [&>*]:px-10 [&>*]:py-5 [&>section:nth-child(odd)]:bg-gray-lighter">
      <h1 className="text-3xl font-bold after:block after:h-1 after:w-12 after:rounded-md after:bg-accent after:content-['']">
        {headline}
      </h1>
      {children}
    </RoundedBox>
  );
}
