const { create } = require("zustand");

export const useUserDataStore = create((set) => ({
  userData: {},
  setUserData: (value) => set({ userData: value }),
  selectedData: {},
  setSelectedData: (value) => set({ selectedData: value }),
  selectedRole: {},
  setSelectedRole: (value) => set({ selectedRole: value }),
  selectedModule: [],
  setSelectedModule: (value) => set({ selectedModule: value }),
}));

export const useAvailableData = create((set) => ({
  availableData: {},
  setAvailableData: (value) => set({ availableData: value }),
}));
