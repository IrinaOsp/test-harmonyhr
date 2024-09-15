"use client";
import Aside from "@/components/Aside/Aside";
import Dashboard from "@/components/Dashboard/Dashboard";
import Header from "@/components/Header/Header";

export default function MainPageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="bg-slate-100">
      <Header />
      <Dashboard />
      <div className="flex">
        <Aside />
        {children}
      </div>
    </div>
  );
}
