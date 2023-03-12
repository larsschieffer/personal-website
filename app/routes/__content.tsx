import { Outlet } from "@remix-run/react";
import Profile from "~/components/profile";

export default function ContentLayout() {
  return (
    <div className="grid h-screen place-items-center">
      <div className="flex gap-8">
        <Profile />
        <Outlet />
      </div>
    </div>
  );
}
