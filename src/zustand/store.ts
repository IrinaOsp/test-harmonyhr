import apolloClient from "@/apollo/client";
import { REFRESH_TOKEN_MUTATION } from "@/apollo/refresh-token";
import { create } from "zustand";

type ProfileData = {
  name: string | null;
  avatar: string | null;
};

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  profileData: ProfileData;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
  refreshAccessToken: () => Promise<void>;
  setProfileData: (profileData: ProfileData) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  refreshToken: null,
  profileData: { name: null, avatar: null },
  setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
  clearTokens: () => set({ accessToken: null, refreshToken: null }),
  refreshAccessToken: async () => {
    const refreshToken = get().refreshToken;
    if (!refreshToken) return;

    try {
      const { data } = await apolloClient.mutate({
        mutation: REFRESH_TOKEN_MUTATION,
        variables: { refreshToken },
      });
      if (data && data.refreshToken) {
        set({
          accessToken: data.refreshToken.access_token,
          refreshToken: data.refreshToken.refresh_token,
        });
      } else {
        get().clearTokens();
      }
    } catch (error) {
      get().clearTokens();
    }
  },
  setProfileData: (profileData) => set({ profileData }),
}));
