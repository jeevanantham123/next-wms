"use client";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import AdminSidebar from "../_components/Sidebar/AdminSidebar";
import { useSidebarStore } from "@/store/sidebar";

export default function Layout({ children }) {
  const userPermissions = useAuthStore((state) => state.userPermissions);
  const openSidebar = useSidebarStore((state) => state.openSidebar);

  const router = useRouter();
  if (!userPermissions.includes("admin")) router.push("/unauthorized");
  return (
    <div className="sm:flex">
      <AdminSidebar />
      <div
        className={`${
          openSidebar ? "sm:w-[80%] sm:ml-[20%]" : "sm:w-[100%]"
        } duration-500 mt-[84px]`}
      >
        {children}
      </div>
    </div>
  );
}
