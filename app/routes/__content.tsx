import { Outlet } from "@remix-run/react";
import Profile from "~/components/profile";

export default function ContentLayout() {
  return (
    <div className="mx-6 my-8 grid place-items-center md:mt-[198px] md:mb-[130px]">
      <div className="grid max-w-[1170px] gap-8 md:grid-flow-col">
        <Profile />
        <Outlet />
      </div>
    </div>
  );
}
