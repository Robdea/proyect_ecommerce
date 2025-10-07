import { create } from "zustand";
import { User } from "../../../lib/type";

interface AuthState{
    user: User | null,
    setAuth: (user: User) => void,
    clearAuth: () => void,
    loading: boolean;
    setLoading: (val: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setLoading: (val) => set({ loading: val }),
  loading: true,
  setAuth: (user) => set({ user }),
  clearAuth: () => set({ user: null}),
}));


