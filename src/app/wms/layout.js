"use client";

import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import React from "react";
import Sidebar from "../_components/Sidebar";
import { useSidebarStore } from "@/store/sidebar";

export default function Layout({ children }) {
  const userPermissions = useAuthStore((state) => state.userPermissions);
  const openSidebar = useSidebarStore((state) => state.openSidebar);
  const router = useRouter();
  if (!userPermissions.includes("wms")) router.push("/unauthorized");
  return (
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
  );
}
