import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { Input } from "../ui/input";
import { Bell, Settings } from "lucide-react";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { AvatarFallback, Avatar, AvatarImage } from "../ui/avatar";

const PAGES: { path: string; name: string }[] = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/my-info",
    name: "My Info",
  },
  {
    path: "/people",
    name: "People",
  },
  {
    path: "/hiring",
    name: "Hiring",
  },
  {
    path: "/reports",
    name: "Reports",
  },
  {
    path: "/files",
    name: "Files",
  },
];

export default function Header() {
  return (
    <div className="w-full flex justify-center">
      <h1 className="font-semibold text-xl">HarmonyHR</h1>
      <NavigationMenu>
        <NavigationMenuList>
          {PAGES.map((page) => (
            <NavigationMenuItem key={page.path} className="text-lg">
              <Link href={page.path}>{page.name}</Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <Input className="max-w-[395px] text-lg" placeholder="Search" />
      <div className="flex justify-center items-center">
        <Settings />
        <QuestionMarkCircledIcon />
        <Bell />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
