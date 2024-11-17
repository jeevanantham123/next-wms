import { useSidebarStore } from "@/store/sidebar";
import React from "react";
import { SidebarItems } from "./items";
import { useRouter,usePathname } from "next/navigation";

export default function AuditingSidebar() {
  const openSidebar = useSidebarStore((state) => state.openSidebar);
  const router = useRouter();
  const pathname = usePathname(); // Get the current path

  return (
    <div
      className={`w-[15%] hidden sm:flex shadow-2xl h-screen z-[999] max-h-screen fixed  top-[64px] justify-start items-start bg-gray-800 ${
        openSidebar ? "left-0 " : "-left-[15%]"
      } duration-500`}
    >
      <div className="flex flex-col w-full">
        <div className="p-[12px] mt-[16px] text-[16px] text-white font-semibold bg-gray-600 rounded">
          Auditing Management
        </div>

        {SidebarItems?.map((item) => {
          const isActive = pathname === item.path; // Check if the item is active

          return (
            <div key={item.title} className="mt-2">
              <div
                onClick={() => router.push(item.path)}
                className={`text-[14px] p-[16px] cursor-pointer w-full flex items-center gap-2 font-medium ${
                  isActive
                    ? "bg-blue-100 text-gray-800 shadow-md rounded"
                    : "text-white hover:bg-white/20 hover:font-semibold"
                }`}
              >
                {item.icon}
                {item.title}
              </div>
            </div>
          );
        })}


        {/* {SidebarItems?.map((item) => {
          return (
            <div key={item.title} className="mt-2">
              <div
                onClick={() => router.push(item.path)}
                className="text-[14px] p-[16px] cursor-pointer hover:bg-white/20 hover:font-semibold w-full flex  items-center gap-2 font-medium text-white "
              >
                {item.icon}
                {item.title}
              </div>
            </div>
          );
        })} */}
      </div>
    </div>
  );
}


