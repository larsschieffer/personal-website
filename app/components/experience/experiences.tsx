import type { ExperiencesProps } from "~/types/experience";

export default function Experiences({
  children,
  headline,
  icon,
}: ExperiencesProps) {
  return (
    <div className="pl-[17px]">
      <div className="-ml-[17px] mb-4 flex flex-row items-center gap-3">
        <div className="-mt-1 text-4xl">{icon}</div>
        <h2 className="text-2xl font-semibold leading-6">{headline}</h2>
      </div>
      {children}
    </div>
  );
}
