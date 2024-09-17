"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { Input } from "../ui/input";
import { Bell, Menu, Search, Settings } from "lucide-react";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { AvatarFallback, Avatar, AvatarImage } from "../ui/avatar";
import { useAuthStore } from "@/zustand/store";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "../ui/dropdown-menu";
import NavMenu from "./NavMenu/NavMenu";

export default function Header() {
  const { avatar, name } = useAuthStore((state) => state.profileData);
  const { clearTokens } = useAuthStore();
  const pathname = usePathname();
  const firstLevelPage = pathname.split("/")[1];
  const cookies = useCookies();
  const router = useRouter();
  const [isInputVisible, setIsInputVisible] = useState(false);

  const handleLogout = () => {
    cookies.remove("access_token");
    cookies.remove("refresh_token");
    clearTokens();
    router.push("/login");
  };

  return (
    firstLevelPage &&
    firstLevelPage !== "login" && (
      <header className="relative overflow-hidden w-full flex justify-between items-start max-lg:py-2 pt-8 px-6">
        <h1 className="font-semibold text-xl">HarmonyHR</h1>
        <NavMenu />
        <div className="relative mx-8">
          <Input
            className="max-w-auto max-sm:hidden xl:max-w-[395px] pl-8 text-lg border border-black rounded-lg"
            placeholder="Search"
          ></Input>
          <Search className="absolute top-2.5 left-2.5 z-10 max-sm:hidden size-4 max-sm:border border-black rounded-lg" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="sm:hidden">
              <Button
                variant="outline"
                onClick={() => setIsInputVisible(!isInputVisible)}
                className="sm:hidden bg-inherit border border-black rounded-2xl"
              >
                <Search className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Input
                className="max-w-auto max-w-[250px] pl-8 text-lg border border-black rounded-lg"
                placeholder="Search"
              ></Input>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex gap-6 justify-center items-center">
          <Settings className="size-6 max-lg:hidden" />
          <QuestionMarkCircledIcon className="size-6 max-lg:hidden" />
          <Bell className="size-6 max-lg:hidden" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-0 lg:hidden">
                <Menu className="size-6 " />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <NavMenu isDropDown={true} />
            </DropdownMenuContent>
          </DropdownMenu>
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
