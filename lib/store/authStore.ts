// lib/store/authStore.ts
import { create } from "zustand";

import { User } from "@/types/user";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  clearIsAuthenticated: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) => {
    console.log("[authStore] setUser called with:", user);
    set({ user });
  },

  clearIsAuthenticated: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));
