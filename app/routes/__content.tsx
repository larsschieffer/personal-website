import { Outlet } from "@remix-run/react";
import Profile from "~/components/profile";

export default function ContentLayout() {
  return (
    <div className="mt-32 grid place-items-center px-12 pb-16">
      <div className="grid max-w-6xl grid-flow-col gap-8">
        <Profile />
        <Outlet />
      </div>
    </div>
  );
}
