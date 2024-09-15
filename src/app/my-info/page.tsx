"use client";

import { MY_PROFILE_QUERY } from "@/apollo/myProfile";
import { useAuthStore } from "@/zustand/store";
import { useLazyQuery } from "@apollo/client";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MyInfo() {
  const { setTokens, refreshAccessToken, clearTokens, setProfileData } =
    useAuthStore();
  const router = useRouter();
  const cookies = useCookies();
  const accessToken = cookies.get("access_token");
  const refreshToken = cookies.get("refresh_token");

  const [fetchProfile, { loading }] = useLazyQuery(MY_PROFILE_QUERY, {
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    onCompleted: (data) => {
      console.log(data);
      setProfileData(data);
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
  }, [accessToken, refreshToken]);

  if (loading) return <p>Loading...</p>;

  return <div>MainPage</div>;
}
