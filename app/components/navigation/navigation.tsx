import { useState } from "react";
import NavigationFull from "./navigation-full";
import NavigationSmall from "./navigation-small";

export interface NavigationItem {
  title: string;
  link: string;
}

export default function Navigation({
  navigationItems,
}: {
  navigationItems: NavigationItem[];
}) {
  const [isMouseHover, setMouseHover] = useState(true);

  return (
    <div
      onMouseEnter={() => setMouseHover(true)}
      onMouseLeave={() => setMouseHover(true)}
    >
      {isMouseHover ? (
        <NavigationFull navigationItems={navigationItems}></NavigationFull>
      ) : (
        <NavigationSmall></NavigationSmall>
      )}
    </div>
  );
}
