"use client";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useSidebarStore } from "@/store/sidebar";
import AuditingSidebar from "../_components/Sidebar/AuditingSidebar";

export default function Layout({ children }) {
  const userPermissions = useAuthStore((state) => state.userPermissions);
  const openSidebar = useSidebarStore((state) => state.openSidebar);
  const router = useRouter();
  if (!userPermissions.includes("auditing")) router.push("/unauthorized");
  return (
    <div className="sm:flex">
      <AuditingSidebar />
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
