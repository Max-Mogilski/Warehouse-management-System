import { create } from 'zustand';
import type { ScannerStoreState} from './types';

export const useScanner = create<ScannerStoreState>((set) => ({
  onScanned() {},
  setOnScanned: (payload) => set(() => ({ onScanned: payload })),
}));
