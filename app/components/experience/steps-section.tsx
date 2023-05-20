export default function StepsSection({
  children,
  headline,
  icon,
}: {
  children?: React.ReactNode;
  headline: string;
  icon: React.ReactNode;
}) {
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
