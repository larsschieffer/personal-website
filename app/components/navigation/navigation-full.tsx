import { Link, useLocation } from "@remix-run/react";
import { FormattedMessage } from "react-intl";
import type { NavigationItem } from "~/types/navigation-item";
import { isLinkTargetingPathname as isHighlighted } from "~/utils/path";

export default function NavigationFull({
  navigationItems,
}: {
  navigationItems: NavigationItem[];
}) {
  const location = useLocation();

  return (
    <div className="flex-row md:flex">
      <svg viewBox="0 0 200 100" width="112" height="56">
        <path
          fill="#FFFFFF"
          transform="rotate(180, 100, 50)"
          d="M0,0 L200,0 C25,25 100,100 0,100z"
        />
      </svg>
      <div className="flex flex-row gap-4 rounded-tr-3xl bg-white pr-10">
        {navigationItems.map(
          (navigationItem: NavigationItem, index: number) => {
            return (
              <Link
                key={index}
                to={`/${navigationItem.link}`}
                className={`my-3 px-4 py-1 ${
                  isHighlighted(location.pathname, navigationItem.link)
                    ? "rounded-2xl bg-accent text-white"
                    : "font-normal"
                }`}
              >
                <FormattedMessage
                  id={navigationItem.titleKey}
                ></FormattedMessage>
              </Link>
            );
          }
        )}
      </div>
    </div>
  );
}
