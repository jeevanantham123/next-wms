import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authorizedUser: null,
  regUsername: null,
  regPassword: null,
  regEmail: null,
  password: null,
  email: null,
}));

export const setAuth = ({ key, value }) =>
  useAuthStore.setState({ [key]: value });
