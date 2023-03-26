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
      <div className="mx-auto mt-8 flex max-w-[1170px] flex-col justify-between rounded-xl bg-white/75 p-2 sm:flex-row">
        <span>
          Copyright © {copyright.start}-{copyright.end} Lars Schieffer, All
          rights reserved.
        </span>
        <Link to="/imprint">Imprint</Link>
      </div>
    </div>
  );
}
