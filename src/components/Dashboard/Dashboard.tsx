"use client";

import { useAuthStore } from "@/zustand/store";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Settings } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PAGES: { path: string; name: string }[] = [
  {
    path: "personal",
    name: "Personal",
  },
  {
    path: "job",
    name: "Job",
  },
  {
    path: "time-off",
    name: "Time Off",
  },
  {
    path: "emergency",
    name: "Emergency",
  },
  {
    path: "documents",
    name: "Documents",
  },
  {
    path: "notes",
    name: "Notes",
  },
  {
    path: "benefits",
    name: "Benefits",
  },
  {
    path: "training",
    name: "Training",
  },
  {
    path: "assets",
    name: "Assets",
  },
  {
    path: "more",
    name: "More",
  },
];

export default function Dashboard() {
  const { avatar, name } = useAuthStore((state) => state.profileData);
  const pathname = usePathname();
  const currentPage = pathname.split("/").pop();

  return (
    <div className="w-lvw flex justify-between bg-slate-200 pt-[34px] px-[72px]">
      <Avatar
        className={`${
          avatar ? "" : "animate-pulse"
        } relative z-20 size-[150px]`}
      >
        <AvatarImage src={avatar || ""} alt="user photo" />
      </Avatar>
      <div className="w-[calc(100% - 72px)] flex flex-col justify-between mt-[33px]">
        <div className="flex justify-between">
          <h2 className="font-semibold text-3xl text-[28px]">{name}</h2>
          <div className="flex gap-4 justify-center items-center">
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
        <NavigationMenu className="max-w-full flex-1 mt-[30px] children:w-full bg-slate-200">
          <NavigationMenuList className="flex -mb-1 gap-4 justify-between">
            {PAGES.map(({ path, name }) =>
              path !== "more" ? (
                <NavigationMenuItem key={name}>
                  <Link
                    href={`/my-info/${path}`}
                    className={`${
                      currentPage === path ? "bg-white" : ""
                    } inline-block text-sm font-medium p-4 rounded-t-xl`}
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
      </div>
    </div>
  );
}
