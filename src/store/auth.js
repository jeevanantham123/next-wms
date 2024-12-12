import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authorizedUser: null,
  userPermissions: [],
  regUsername: "",
  regPassword: "",
  regEmail: "",
  password: "",
  email: "admin@germinit.com",
  userEmail: "",
  userData: [],
}));

export const setAuth = ({ key, value }) =>
  useAuthStore.setState({ [key]: value });
