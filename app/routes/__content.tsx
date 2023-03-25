import { Outlet, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import Profile from "~/components/profile";

export function loader() {
  const data = {
    copyright: {
      start: "2021",
      end: new Date().toLocaleDateString("en-GB", { year: "numeric" }),
    },
  };
  return json(data);
}

export default function ContentLayout() {
  const { copyright } = useLoaderData<typeof loader>();
  return (
    <div className="mx-6 mt-8 mb-2 md:mt-[198px]">
      <div className="grid place-items-center ">
        <div className="grid max-w-[1170px] gap-8 md:grid-flow-col">
          <Profile />
          <Outlet />
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-[1170px] rounded-xl bg-white/75 p-2 text-justify">
        Copyright © {copyright.start}-{copyright.end} Lars Schieffer, All rights
        reserved.
      </p>
    </div>
  );
}
