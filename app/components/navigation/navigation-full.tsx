import { Link, useLocation } from "@remix-run/react";
import { FormattedMessage } from "react-intl";
import { isLinkTargetingPathname as isHighlighted } from "~/services/path";
import type { NavigationItem, NavigationProps } from "~/types/navigation";

export default function NavigationFull({
  navigationItems,
}: NavigationProps): JSX.Element {
  const { pathname } = useLocation();

  return (
    <div className="flex-row md:flex">
      <svg viewBox="0 0 200 100" width="112" height="56">
        <path
          fill="#FFFFFF"
          transform="rotate(180, 100, 50)"
          d="M0,0 L200,0 C25,25 100,100 0,100z"
        />
      </svg>
      <div className="flex flex-row rounded-tr-3xl bg-white pr-6">
        {navigationItems.map(
          ({ link, titleKey }: NavigationItem, index: number) => {
            return (
              <Link
                key={index}
                to={`/${link}`}
                className={`my-3 px-4 py-1 first:-ml-4 ${
                  isHighlighted(pathname, link)
                    ? "rounded-2xl bg-accent text-white"
                    : "font-normal"
                }`}
              >
                <FormattedMessage id={titleKey}></FormattedMessage>
              </Link>
            );
          }
        )}
      </div>
    </div>
  );
}
