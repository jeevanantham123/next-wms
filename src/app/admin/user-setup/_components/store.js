const { createStore } = require("zustand");

export const useUserList = createStore((set) => ({
  tableData: null,
  setTableData: (value) => set({ tableData: value }),
}));
