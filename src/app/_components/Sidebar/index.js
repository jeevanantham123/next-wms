import { useSidebarStore } from "@/store/sidebar";
import { SidebarItems } from "./items";
import { usePathname, useRouter } from "next/navigation";
import classNames from "classnames";
import { ModuleComboBox } from "../ModuleComboBox";

export default function Sidebar() {
  const openSidebar = useSidebarStore((state) => state.openSidebar);
  const router = useRouter();
  const pathName = usePathname();

  return (
    <div
      className={`w-[15%] hidden sm:flex shadow-2xl h-screen z-[999] max-h-screen fixed  top-[64px] justify-start items-start bg-white ${
        openSidebar ? "left-0 " : "-left-[15%]"
      } duration-500`}
    >
      <div className="flex flex-col w-full">
        <ModuleComboBox />
        {/* <div className="p-[12px] mt-[16px] text-[16px] text-black font-semibold">
          Warehouse Management
        </div> */}
        {SidebarItems?.map((item) => {
          return (
            <div key={item.title} className="mt-2">
              <div
                onClick={() => router.push(item.path)}
                className="px-[12px] cursor-pointer"
              >
                <div
                  className={classNames(
                    "text-[12px] h-[48px] pl-[12px] w-full flex items-center gap-4 font-medium text-black",
                    {
                      "rounded-md bg-theme text-white font-semibold":
                        item.path === pathName,
                    }
                  )}
                >
                  {item.icon}
                  {item.title}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
