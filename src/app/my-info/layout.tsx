"use client";
import Header from "@/components/Header/Header";

export default function MainPageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
