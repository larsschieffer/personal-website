import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import Profile from "~/components/profile";
import { db } from "~/utils/db.server";

export async function loader() {
  const resume = await db.resume.findFirst();
  const data = {
    copyright: {
      start: "2021",
      end: new Date().toLocaleDateString("en-GB", { year: "numeric" }),
    },
    resumeURL: `http://localhost:3000/assets/${resume?.path}`,
  };
  return json(data);
}

export default function ContentLayout() {
  const { copyright, resumeURL } = useLoaderData<typeof loader>();
  return (
    <div className="mx-6 mt-8 mb-2 md:mt-[198px]">
      <div className="grid place-items-center">
        <div className="grid max-w-[1170px] gap-8 md:grid-flow-col">
          <Profile resumeURL={resumeURL} />
          <Outlet />
        </div>
      </div>
      <div className="mx-auto mt-8 flex max-w-[1170px] justify-between rounded-xl bg-white/80 p-2 pl-10 pr-10 md:pl-8">
        <div>
          <span className="block md:inline-block">
            Copyright © {copyright.start}-{copyright.end}
          </span>
          <span className="block xs:inline-block md:ml-1">
            Lars Schieffer,{" "}
          </span>
          <span className="xs:ml-1">All rights reserved.</span>
        </div>
        <Link to="/imprint" className="self-top hover:underline">
          Imprint
        </Link>
      </div>
    </div>
  );
}
