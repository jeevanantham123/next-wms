import { CalendarIcon, PlayIcon } from "@radix-ui/react-icons";
import { MockData } from "../constant";

export default function DataTable() {
  return (
    <div className="">
      {MockData?.map((item) => {
        return (
          <div
            key={item.id}
            className="border-t border-[#E9EAEB] h-[72px] flex items-center px-[18px] last:border-b last:border-[#E9EAEB]"
          >
            <div className="flex flex-col w-[300px]">
              <div className="text-[18px] text-pt font-normal">
                {item.module}
              </div>
              <div className="text-[14px] mt-[2px] text-st">
                Last Sync Date : {item.lastSyncDate}
              </div>
            </div>
            <div className="flex gap-2 justify-start items-center">
              <div className="border border-theme bg-theme/10 rounded-sm h-[30px] w-[30px] flex justify-center items-center">
                <CalendarIcon className="h-[18px] w-[18px] text-theme" />
              </div>
              <div className="border border-theme bg-theme/10 rounded-sm h-[30px] w-[30px] flex justify-center items-center">
                <PlayIcon className="h-[18px] w-[18px] text-theme" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
