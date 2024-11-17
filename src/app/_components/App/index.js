"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Navbar from "../Header/navbar";
import { useAuthStore } from "@/store/auth";
import Login from "../Login";
import Sidebar from "../Sidebar";
import { useSidebarStore } from "@/store/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { usePathname } from "next/navigation";
import AdminSidebar from "../Sidebar/AdminSidebar";

const queryClient = new QueryClient();

export const App = ({ children }) => {
  const authorizedUser = useAuthStore((state) => state.authorizedUser);

  return (
    <QueryClientProvider client={queryClient}>
      {authorizedUser ? (
        <>
          <Navbar />
          {children}
        </>
       ) : (
        <Login />
      )}   
      <Toaster />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
