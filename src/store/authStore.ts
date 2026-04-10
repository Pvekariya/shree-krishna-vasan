import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  token: string | null;
  isAdmin: boolean;
  setToken: (t: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      isAdmin: false,
      setToken: (t) => set({ token: t, isAdmin: true }),
      logout: () => set({ token: null, isAdmin: false }),
    }),
    { name: "skvb-auth" }
  )
);