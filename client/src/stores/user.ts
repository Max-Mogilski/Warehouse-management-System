import { create } from 'zustand';
import type { UserStoreState } from './types';

export const useUserInfo = create<UserStoreState>((set) => ({
  user: null,
  setUser: (payload) => set(() => ({ user: payload })),
}));
