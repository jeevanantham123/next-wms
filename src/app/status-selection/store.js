const { createStore } = require("zustand");

export const useStatusChangeStore = createStore((set) => ({
  tableData: null,
  setTableData: (value) => set({ tableData: value }),
}));

export const useStatusFilterStore = createStore((set) => ({
  product: null,
  status: null,
  pallet: null,
  lot: null,
}));

export const setStatusFilters = (key, value) =>
  useStatusFilterStore.setState({ key: value });
