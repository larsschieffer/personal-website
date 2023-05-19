import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import { FormattedMessage } from "react-intl";
import Profile from "~/components/profile";

export function loader() {
  const data = {
    copyright: {
      start: "2021",
      end: new Date().getUTCFullYear(),
    },
  };
  return json(data);
}

export default function ContentLayout() {
  const { copyright } = useLoaderData<typeof loader>();
  return (
    <div className="mx-6 mb-2 mt-8 md:mt-[198px]">
      <div className="grid place-items-center">
        <div className="grid max-w-[1170px] gap-8 md:grid-flow-col">
          <Profile />
          <Outlet />
        </div>
      </div>
      <div className="mx-auto mt-8 flex max-w-[1170px] justify-between rounded-xl bg-white/80 p-2 pl-10 pr-10 md:pl-8">
        <div>
          <span className="block md:inline-block">
            Copyright© {copyright.start}-{copyright.end}
          </span>
          <span className="block xs:inline-block md:ml-1">
            Lars Schieffer,{" "}
          </span>
          <span className="xs:ml-1">
            <FormattedMessage id="copyright.rightsReserved"></FormattedMessage>.
          </span>
        </div>
        <Link to="/imprint" className="self-start hover:underline">
          <FormattedMessage id="imprint.title"></FormattedMessage>
        </Link>
      </div>
    </div>
  );
}
