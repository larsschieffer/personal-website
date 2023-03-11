import { Outlet } from "@remix-run/react";

export default function ContentLayout() {
  return (
    <div className="h-screen">
      <Outlet />
    </div>
  );
}
