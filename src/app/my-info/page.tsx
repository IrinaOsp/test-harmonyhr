"use client";

import { useAuthStore } from "@/zustand/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MainPage from "@/components/MainPage/MainPage";

export default function MyInfo() {
  const { accessToken } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      router.push("/");
    }
  }, [accessToken]);

  return <MainPage />;
}
