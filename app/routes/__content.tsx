import { Outlet } from "@remix-run/react";
import Profile from "~/components/profile";

export default function ContentLayout() {
  return (
    <div className="mt-32 grid h-screen place-items-center px-12">
      <div className="grid max-w-7xl grid-flow-col gap-8">
        <Profile />
        <Outlet />
      </div>
    </div>
  );
}
