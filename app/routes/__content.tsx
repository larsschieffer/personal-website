import { Outlet } from "@remix-run/react";
import Profile from "~/components/profile";

export default function ContentLayout() {
  return (
    <div className="my-8 mx-6 grid place-items-center md:mt-36">
      <div className="grid max-w-7xl gap-8 md:grid-flow-col">
        <Profile />
        <Outlet />
      </div>
    </div>
  );
}
