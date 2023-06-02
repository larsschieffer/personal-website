import type { ProfileItemProps } from "~/types/profile";

export default function ProfileItem({ icon, description }: ProfileItemProps) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      {description ? <span>{description}</span> : null}
    </div>
  );
}
