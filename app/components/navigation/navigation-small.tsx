import { GoThreeBars } from "@react-icons/all-files/go/GoThreeBars";
import { GoX } from "@react-icons/all-files/go/GoX";
import { Link, useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import type { NavigationItem } from "~/types/navigation-item";
import { isLinkTargetingPathname as isHighlighted } from "~/utils/path";

export default function NavigationSmall({
  navigationItems,
}: {
  navigationItems: NavigationItem[];
}) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  function toggleMenuState() {
    setMenuOpen((menuState: boolean) => !menuState);
  }

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMenuOpen]);

  return (
    <div
      className={`relative ${isMenuOpen ? "h-screen w-screen bg-accent" : ""}`}
    >
      <button
        className={`${
          isMenuOpen ? "absolute right-0 top-0" : "rounded-4xl rounded-tr-none"
        } bg-accent p-4 text-white`}
        onClick={toggleMenuState}
      >
        {isMenuOpen ? (
          <GoX className="text-2xl" />
        ) : (
          <GoThreeBars className="text-2xl" />
        )}
      </button>
      {isMenuOpen ? (
        <div className="flex h-full w-full flex-col justify-center pl-7 text-2xl text-white">
          {navigationItems.map(
            (navigationItem: NavigationItem, index: number) => (
              <Link
                key={index}
                to={`/${navigationItem.link}`}
                className={`rounded-l-3xl py-4 pl-8 ${
                  isHighlighted(location.pathname, navigationItem.link)
                    ? "bg-accent-secondary"
                    : ""
                }`}
              >
                <FormattedMessage
                  id={navigationItem.titleKey}
                ></FormattedMessage>
              </Link>
            )
          )}
        </div>
      ) : null}
    </div>
  );
}
