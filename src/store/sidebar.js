import { create } from "zustand";

export const useSidebarStore = create((set) => ({
  openSidebar: true,
  setOpenSidebar: (value) => set({ openSidebar: value }),
}));
