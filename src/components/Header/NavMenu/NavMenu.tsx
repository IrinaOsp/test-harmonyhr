"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../../ui/navigation-menu";

const PAGES: { path: string; name: string }[] = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "my-info",
    name: "My Info",
  },
  {
    path: "people",
    name: "People",
  },
  {
    path: "hiring",
    name: "Hiring",
  },
  {
    path: "reports",
    name: "Reports",
  },
  {
    path: "files",
    name: "Files",
  },
];

export default function NavMenu({ isDropDown }: { isDropDown?: boolean }) {
  const pathname = usePathname();
  const firstLevelPage = pathname.split("/")[1];

  return (
    <NavigationMenu
      className={`${
        isDropDown ? "lg:hidden" : "max-lg:hidden"
      } self-end max-lg:w-full max-lg:max-w-80`}
    >
      <NavigationMenuList className="max-lg:flex-col max-lg:bg-slate-100 max-lg:w-1/2">
        {PAGES.map((page) => (
          <NavigationMenuItem
            key={page.path}
            className={isDropDown ? "w-full bg-white" : ""}
          >
            <Link
              className={`${
                (isDropDown && firstLevelPage !== page.path) ?? "bg-white"
              } ${isDropDown ?? "w-full"} ${
                firstLevelPage === page.path ? "bg-slate-200" : ""
              }  inline-block text-lg font-normal text-nowrap p-4 `}
              href={`/${page.path}`}
            >
              {page.name}
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
