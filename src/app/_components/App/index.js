"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Navbar from "../Header/navbar";
import { useAuthStore } from "@/store/auth";
import Login from "../Login";
import { Toaster } from "@/components/ui/sonner";
import UrqlWrapper from "../UrqlWrapper";

const queryClient = new QueryClient();

export const App = ({ children }) => {
  const authorizedUser = useAuthStore((state) => state.authorizedUser);

  return (
    <UrqlWrapper>
      <QueryClientProvider client={queryClient}>
        {/* {authorizedUser ? ( */}
        <>
          <Navbar />
          <div className="container mx-auto">{children}</div>
        </>
        {/* ) : (
        <Login />
      )} */}
        <Toaster />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </UrqlWrapper>
  );
};
