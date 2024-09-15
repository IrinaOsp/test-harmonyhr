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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import TimeOff from "../TimeOff/TimeOff";
import EmptySection from "../EmptySection/EmptySection";

const TABS = [
  "Personal",
  "Job",
  "Time Off",
  "Emergency",
  "Documents",
  "Notes",
  "Benefits",
  "Training",
  "Assets",
  "More",
];

export default function Dashboard() {
  const { avatar, name } = useAuthStore((state) => state.profileData);

  return (
    <div className="w-lvw flex bg-slate-200 pt-[34px] px-[72px]">
      <Avatar className={`${avatar ? "" : "animate-pulse"} size-[150px]`}>
        <AvatarImage src={avatar || ""} alt="user photo" />
      </Avatar>
      <div className="w-full">
        <div className="flex justify-between">
          <h2 className="my-[34px] font-semibold text-3xl text-[28px]">
            {name}
          </h2>
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
        <Tabs defaultValue="account" className="w-full bg-slate-200">
          <TabsList className="flex w-full">
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                data-state={tab === "Time Off" ? "active" : "inactive"}
                className={`$${
                  tab === "Time Off" ? "bg-white" : "bg-slate-200"
                } p-4 rounded-t-xl`}
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
          {TABS.map((tab) => (
            <TabsContent key={tab} value={tab}>
              {tab === "Time Off" ? <TimeOff /> : <EmptySection />}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
