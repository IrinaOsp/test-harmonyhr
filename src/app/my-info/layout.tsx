"use client";

import Aside from "@/components/Aside/Aside";
import Dashboard from "@/components/Dashboard/Dashboard";

export default function MainPageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="bg-slate-100">
      <Dashboard />
      <div className="flex justify-start gap-6 sm:px-[72px]">
        <Aside />
        {children}
      </div>
    </div>
  );
}
