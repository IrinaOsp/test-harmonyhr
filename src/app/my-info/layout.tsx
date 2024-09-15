"use client";
import Dashboard from "@/components/Dashboard/Dashboard";
import Header from "@/components/Header/Header";

export default function MainPageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <Dashboard />
      {children}
    </>
  );
}
