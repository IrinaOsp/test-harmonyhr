"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCookies } from "next-client-cookies";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";

import { useAuthStore } from "@/zustand/store";
import { MY_PROFILE_QUERY } from "@/apollo/myProfile";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { EllipsisVertical, Settings } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { PAGES } from "./dataPages";
import { Button } from "../ui/button";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export default function Dashboard() {
  const { avatar, name } = useAuthStore((state) => state.profileData);
  const { setTokens, refreshAccessToken, clearTokens } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const cookies = useCookies();
  const [isVisible, setIsVisible] = useState(false);

  const currentPage = pathname.split("/").pop();
  const accessToken = cookies.get("access_token");
  const refreshToken = cookies.get("refresh_token");

  const [fetchProfile] = useLazyQuery(MY_PROFILE_QUERY, {
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    onCompleted: (data) => {
      useAuthStore.getState().setProfileData(data.myProfile);
    },
  });

  useEffect(() => {
    const performRequestWithToken = async () => {
      if (!accessToken) {
        router.push("/login");
        return;
      }

      try {
        await fetchProfile();
      } catch (err) {
        if (accessToken && refreshToken) {
          try {
            setTokens(accessToken, refreshToken);
            await refreshAccessToken();
            await fetchProfile();
          } catch (refreshErr) {
            clearTokens();
            router.push("/login");
          }
        } else {
          clearTokens();
          router.push("/login");
        }
      }
    };

    performRequestWithToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, refreshToken]);

  return (
    <div className="w-screen relative max-w-full flex justify-start bg-slate-200 pt-[34px] px-[72px] max-sm:p-0">
      <Avatar
        className={`${
          avatar ? "animate-pulse" : ""
        } absolute bg-slate-300 lg:relative z-20 size-[60px] max-lg:top-6 max-lg:left-20 max-sm:left-6 sm:size-[100px] lg:size-[150px] lg:ml-[37px] lg:mr-[63px]`}
      >
        <AvatarImage src={avatar || ""} alt="user photo" />
      </Avatar>
      <div className="max-w-full lg:max-w-[calc(100%-225px)] flex flex-col justify-between mt-[33px]">
        <div className="flex justify-between">
          <h2 className="font-semibold text-3xl text-[28px] max-lg:ml-32 max-sm:ml-[106px]">
            {name}
          </h2>
          <div
            className={`flex ${
              isVisible
                ? "max-sm:flex-col gap-2 bg-white p-3 items-center rounded-lg border border-slate-400 z-30"
                : "hidden"
            } max-sm:absolute top-0 right-1 gap-4 justify-center items-end max-sm:mr-24 max-sm:mt-1 sm:items-center`}
          >
            <Select>
              <SelectTrigger className="w-[162px] h-8 border border-slate-400">
                <SelectValue placeholder="Request a Change" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="change1">Change 1</SelectItem>
                  <SelectItem value="change1">Change 2</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-14 h-8  border border-slate-400">
                <SelectValue />
                <Settings className="size-6" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="settings">settings</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button
          variant="ghost"
          onClick={() => setIsVisible(!isVisible)}
          className="absolute right-6 sm:hidden align-top"
        >
          <EllipsisVertical size={16} />
        </Button>
        <ScrollArea className="max-sm:w-lvw">
          <NavigationMenu className="justify-start flex-1 mt-[30px] bg-slate-200">
            <NavigationMenuList className="flex -mb-1 gap-4 ">
              {PAGES.map(({ path, name }) =>
                path !== "more" ? (
                  <NavigationMenuItem key={name}>
                    <Link
                      href={`/my-info/${path}`}
                      className={`${
                        currentPage === path ? "bg-white" : ""
                      } inline-block text-nowrap text-sm font-medium p-4 rounded-t-xl`}
                    >
                      {name}
                    </Link>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={name}>
                    <NavigationMenuTrigger className="bg-slate-200 text-sm font-medium p-4 rounded-t-xl">
                      {name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="p-2">more...</div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
