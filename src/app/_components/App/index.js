"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Navbar from "../Header/navbar";
import { useAuthStore } from "@/store/auth";
import Login from "../Login";
import Sidebar from "../Sidebar";
import { useSidebarStore } from "@/store/sidebar";
import { Toaster } from "@/components/ui/sonner";

const queryClient = new QueryClient();

export const App = ({ children }) => {
  const authorizedUser = useAuthStore((state) => state.authorizedUser);
  const openSidebar = useSidebarStore((state) => state.openSidebar);

  return (
    <QueryClientProvider client={queryClient}>
      {authorizedUser ? (
        <>
          <Navbar />
          <div className="sm:flex">
            <Sidebar />
            <div
              className={`${
                openSidebar ? "sm:w-[85%] sm:ml-[15%]" : "sm:w-[100%]"
              } duration-500`}
            >
              {children}
            </div>
          </div>
        </>
      ) : (
        <Login />
      )}
      <Toaster />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
