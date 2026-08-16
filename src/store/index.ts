import { create } from 'zustand';

interface AppState {
  activeSection: string;
  setActiveSection: (section: string) => void;
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;
  isHeroVisible: boolean;
  setIsHeroVisible: (visible: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeSection: 'home',
  setActiveSection: (section) => set({ activeSection: section }),
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  isHeroVisible: true,
  setIsHeroVisible: (visible) => set({ isHeroVisible: visible }),
}));
