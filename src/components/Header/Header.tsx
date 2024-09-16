"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useCookies } from "next-client-cookies";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { Input } from "../ui/input";
import { Bell, Settings } from "lucide-react";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { AvatarFallback, Avatar, AvatarImage } from "../ui/avatar";
import { useAuthStore } from "@/zustand/store";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "../ui/dropdown-menu";

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

export default function Header() {
  const { avatar, name } = useAuthStore((state) => state.profileData);
  const { clearTokens } = useAuthStore();
  const pathname = usePathname();
  const firstLevelPage = pathname.split("/")[1];
  const cookies = useCookies();
  const router = useRouter();

  const handleLogout = () => {
    cookies.remove("access_token");
    cookies.remove("refresh_token");
    clearTokens();
    router.push("/login");
  };

  return (
    firstLevelPage &&
    firstLevelPage !== "login" && (
      <header className="w-full flex justify-between items-start pt-8 px-6">
        <h1 className="font-semibold text-xl">HarmonyHR</h1>
        <NavigationMenu className="self-end">
          <NavigationMenuList>
            {PAGES.map((page) => (
              <NavigationMenuItem key={page.path}>
                <Link
                  className={`${
                    firstLevelPage === page.path ? "bg-slate-200" : ""
                  } inline-block text-lg p-4 rounded-t-xl`}
                  href={`/${page.path}`}
                >
                  {page.name}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <Input
          className="max-w-[395px] text-lg border border-black"
          placeholder="Search"
        />
        <div className="flex gap-6 justify-center items-center">
          <Settings className="size-6" />
          <QuestionMarkCircledIcon className="size-6" />
          <Bell className="size-6" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar
                className={`${avatar ? "" : "animate-pulse"} size-[38px]`}
              >
                <AvatarImage src={avatar || ""} alt="user photo" />
                <AvatarFallback>
                  {name ? name!.charAt(0).toUpperCase() : ""}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-max">
              <Button variant="outline" onClick={handleLogout}>
                Log out
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    )
  );
}
