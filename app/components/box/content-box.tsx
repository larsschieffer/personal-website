import type { PropsWithChildren } from "react";
import RoundedBox from "./rounded-box";

export default function ContentBox({
  children,
  headline,
  options: { position } = { position: "left" },
}: PropsWithChildren<{
  headline: string;
  options?: {
    position: "left" | "center";
  };
}>) {
  return (
    <RoundedBox className="bg-white md:rounded-tr-none [&>*:first-child]:pb-0 [&>*:first-child]:pt-6 sm:[&>*:first-child]:pt-10 [&>*:last-child]:pb-6 sm:[&>*:last-child]:pb-10 [&>*]:px-6 [&>*]:py-5 sm:[&>*]:px-10 [&>section:nth-child(odd)]:bg-gray-lighter">
      <h1
        className={`capitalize text-3xl font-bold after:block after:h-1 after:w-12 after:rounded-md after:bg-accent after:content-[''] ${
          position === "center" ? "text-center after:hidden" : ""
        }`}
      >
        {headline}
      </h1>
      {children}
    </RoundedBox>
  );
}
