import { create } from "zustand";

interface AuthState{
    user: string | null,
    setAuth: (user: string) => void,
    clearAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setAuth: (user) => set({ user }),
  clearAuth: () => set({ user: null}),
}));


