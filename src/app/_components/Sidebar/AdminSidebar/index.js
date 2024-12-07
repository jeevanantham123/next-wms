import { useSidebarStore } from "@/store/sidebar";
import { SidebarItems } from "./items";
import { usePathname, useRouter } from "next/navigation";
import classNames from "classnames";

export default function AdminSidebar() {
  const openSidebar = useSidebarStore((state) => state.openSidebar);
  const router = useRouter();
  const pathName = usePathname();

  return (
    <div
      className={`w-[20%] hidden sm:flex shadow-2xl h-screen z-[999] max-h-screen fixed  top-[84px] justify-start items-start bg-white ${
        openSidebar ? "left-0 " : "-left-[20%]"
      } duration-500`}
    >
      <div className="flex flex-col w-full">
        {/* <ModuleComboBox /> */}
        <div className="px-[12px] mb-[30px] flex items-center h-[40px] bg-theme/10 text-theme text-[16px]">
          Admin
        </div>
        {SidebarItems?.map((item) => {
          return (
            <div key={item.title} className="mb-[14px]">
              <div
                onClick={() => router.push(item.path)}
                className="px-[12px] cursor-pointer"
              >
                <div
                  className={classNames(
                    "text-[16px] h-[40px] pl-[12px] w-full flex items-center gap-4",
                    {
                      "rounded-md bg-theme text-white": item.path === pathName,
                      "text-[#4E617C]": item.path !== pathName,
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
