import { Link, Outlet, useLoaderData, useLocation } from "@remix-run/react";
import type { V2_ServerRuntimeMetaArgs } from "@remix-run/server-runtime";
import type { TypedResponse, V2_MetaFunction } from "@vercel/remix";
import { json } from "@vercel/remix";
import { FormattedMessage } from "react-intl";
import { NavigationFull } from "~/components/navigation/navigation-full";
import { NavigationSmall } from "~/components/navigation/navigation-small";
import { Profile } from "~/components/profile/profile";
import { navigationItems } from "~/constants/navigation-items";
import { WEBSITE_URL } from "~/constants/sitemap";
import { metaFunctionFactory } from "~/services/meta";
import { isLinkTargetingPathname } from "~/services/path";
import type { ContentData } from "~/types/content";
import type { NavigationItem } from "~/types/navigation";

export const meta: V2_MetaFunction = (args: V2_ServerRuntimeMetaArgs) => {
  const { translationKey = "" } =
    navigationItems.find(({ link }: NavigationItem) => {
      return isLinkTargetingPathname(args.location.pathname, link);
    }) ?? {};

  return metaFunctionFactory({
    url: `${WEBSITE_URL}${args.location.pathname.substring(1)}`,
    locationKey: `${translationKey}.title`,
    descriptionKey: `${translationKey}.description`,
  })(args);
};

export const loader = (): TypedResponse<ContentData> => {
  const data = {
    copyright: {
      start: "2021",
      end: new Date().getUTCFullYear(),
    },
  };
  return json(data);
};

export const ContentLayout = (): JSX.Element => {
  const { copyright } = useLoaderData<typeof loader>();
  const { pathname } = useLocation();
  const isBlogContent = isLinkTargetingPathname(pathname, "blog");
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
            <div
              className={`relative${
                isBlogContent ? " -order-1 md:order-none" : ""
              } `}
            >
              <div className="absolute bottom-full right-0 hidden md:block">
                <NavigationFull
                  navigationItems={navigationItems}
                ></NavigationFull>
              </div>
              <div className="h-full [&>*]:h-full">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-8 flex max-w-[1170px] justify-between rounded-xl bg-white/80 p-2 px-6 sm:px-10 md:pr-6">
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
};

export default ContentLayout;
