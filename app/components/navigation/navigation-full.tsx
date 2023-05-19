import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";
import type { NavigationItem } from "./navigation";

function isHighlighted(pathname: string, linkTarget: string) {
  return pathname.startsWith(`/${linkTarget}`);
}

export default function NavigationFull({
  navigationItems,
}: {
  navigationItems: NavigationItem[];
}) {
  const [currentPathname, setCurrentPathname] = useState("");

  useEffect(() => {
    setCurrentPathname(window.location.pathname);
  }, []);

  return (
    <div className="hidden flex-row md:flex">
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
                  isHighlighted(currentPathname, navigationItem.link)
                    ? "rounded-2xl bg-accent text-white"
                    : "font-normal"
                }`}
              >
                {navigationItem.title}
              </Link>
            );
          }
        )}
      </div>
    </div>
  );
}
