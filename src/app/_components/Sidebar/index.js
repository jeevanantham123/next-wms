import { useSidebarStore } from "@/store/sidebar";
import React from "react";
import { SidebarItems } from "./items";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const openSidebar = useSidebarStore((state) => state.openSidebar);
  const router = useRouter();

  return (
    <div
      className={`w-[15%] hidden sm:flex shadow-2xl h-screen z-[999] max-h-screen fixed  top-[64px] justify-start items-start bg-gray-800 ${
        openSidebar ? "left-0 " : "-left-[15%]"
      } duration-500`}
    >
      <div className="flex flex-col w-full">
        {SidebarItems?.map((item) => {
          return (
            <div key={item.title} className="mt-2">
              <div
                onClick={() => router.push(item.path)}
                className="text-[14px] p-[16px] cursor-pointer hover:bg-white/20 hover:font-semibold w-full flex  items-center gap-4 font-medium text-white "
              >
                {item.icon}
                {item.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
