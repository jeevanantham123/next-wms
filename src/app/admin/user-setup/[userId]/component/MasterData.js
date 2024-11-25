import { Checkbox } from "@/components/ui/checkbox";

export default function MasterData() {
  return (
    <div className="flex bg-white mt-[16px] flex-col rounded-md border border-[#EAECF0]">
      <div className="h-[55px] border-b border-[#EAECF0] flex items-center px-[16px] text-[18px] font-medium text-pt">
        Master Module
      </div>
      <div className="p-[16px] gap-12 flex flex-wrap">
        <div className="flex gap-6 items-center">
          <div className="text-[16px] text-pt">Product Category</div>
          <Checkbox />
        </div>
        <div className="flex gap-6 items-center">
          <div className="text-[16px] text-pt">Product</div>
          <Checkbox />
        </div>
        <div className="flex gap-6 items-center">
          <div className="text-[16px] text-pt">BOM</div>
          <Checkbox />
        </div>
        <div className="flex gap-6 items-center">
          <div className="text-[16px] text-pt">Routing</div>
          <Checkbox />
        </div>
        <div className="flex gap-6 items-center">
          <div className="text-[16px] text-pt">Location Type</div>
          <Checkbox />
        </div>
        <div className="flex gap-6 items-center">
          <div className="text-[16px] text-pt">Location</div>
          <Checkbox />
        </div>
      </div>
    </div>
  );
}
