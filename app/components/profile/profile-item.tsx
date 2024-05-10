import type { ProfileItemProps } from "~/types/profile";

export const ProfileItem = ({
  icon,
  description,
}: ProfileItemProps): JSX.Element => {
  return (
    <div className="flex items-center gap-3">
      {icon}
      {description ? <span>{description}</span> : null}
    </div>
  );
};

export default ProfileItem;
