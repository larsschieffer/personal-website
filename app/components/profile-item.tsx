export default function ProfileItem({
  icon,
  description,
}: {
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      {description ? <span>{description}</span> : null}
    </div>
  );
}
