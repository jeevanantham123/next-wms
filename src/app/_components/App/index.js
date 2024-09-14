"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Navbar from "../Header/navbar";

const queryClient = new QueryClient();

export const App = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
