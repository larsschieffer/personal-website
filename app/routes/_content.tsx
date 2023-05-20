import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import { FormattedMessage, useIntl } from "react-intl";
import NavigationFull from "~/components/navigation/navigation-full";
import NavigationSmall from "~/components/navigation/navigation-small";
import Profile from "~/components/profile";
import type { NavigationItem } from "~/types/navigation-item";

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
  const intl = useIntl();

  const navigationItems: NavigationItem[] = [
    { title: intl.formatMessage({ id: "navigation.aboutMe" }), link: "about" },
    { title: intl.formatMessage({ id: "navigation.resume" }), link: "resume" },
  ];

  const { copyright } = useLoaderData<typeof loader>();
  return (
    <div>
      <div className="sticky top-0 z-50 md:hidden">
        <div className="flex w-full justify-end">
          <NavigationSmall navigationItems={navigationItems}></NavigationSmall>
        </div>
      </div>
      <div className="mx-6 pb-2 pt-6 md:mt-[198px]">
        <div className="grid place-items-center">
          <div className="grid max-w-[1170px] gap-8 md:grid-flow-col">
            <Profile />
            <div className="relative">
              <div className="absolute bottom-full right-0 hidden md:block">
                <NavigationFull
                  navigationItems={navigationItems}
                ></NavigationFull>
              </div>
              <Outlet />
            </div>
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
              <FormattedMessage id="copyright.rightsReserved"></FormattedMessage>
              .
            </span>
          </div>
          <Link to="/imprint" className="self-start hover:underline">
            <FormattedMessage id="imprint.title"></FormattedMessage>
          </Link>
        </div>
      </div>
    </div>
  );
}
