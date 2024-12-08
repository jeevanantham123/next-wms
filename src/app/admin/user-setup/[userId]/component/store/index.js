const { create } = require("zustand");

export const useUserDataStore = create((set) => ({
  userData: {},
  setUserData: (value) => set({ userData: value }),
}));

export const useAvailableData = create((set) => ({
  availableData: {},
  setAvailableData: (value) => set({ availableData: value }),
}));
