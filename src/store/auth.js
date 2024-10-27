import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authorizedUser: null,
  regUsername: "",
  regPassword: "",
  regEmail: "",
  password: "",
  email: "",
}));

export const setAuth = ({ key, value }) =>
  useAuthStore.setState({ [key]: value });
