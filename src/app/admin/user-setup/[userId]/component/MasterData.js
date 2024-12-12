import { Checkbox } from "@/components/ui/checkbox";
import { useAvailableData, useUserDataStore } from "./store";
import { useEffect } from "react";

export default function MasterData() {
  const userData = useUserDataStore((state) => state.userData);
  const { selectedModule, setSelectedModule } = useUserDataStore(
    (state) => state
  );
  const globalData = useAvailableData((state) => state.availableData);
  const assignedMasterModules = userData?.userDetails?.["master_module"] || [];
  const availableMasterModules =
    globalData?.availableData?.["master_modules"] || [];

  useEffect(() => {
    setSelectedModule([...assignedMasterModules]);
  }, [assignedMasterModules]);

  const handleCheckedChange = (checked, module) => {
    if (checked) {
      setSelectedModule([...selectedModule, module]);
    } else {
      setSelectedModule(selectedModule.filter((mod) => mod !== module));
    }
  };

  return (
    <div className="flex bg-white mt-[16px] flex-col rounded-md border border-[#EAECF0]">
      <div className="h-[55px] border-b border-[#EAECF0] flex items-center px-[16px] text-[18px] font-medium text-pt">
        Master Module
      </div>
      <div className="p-[16px] gap-12 flex flex-wrap">
        {availableMasterModules?.map((module) => {
          return (
            <div className="flex gap-6 items-center" key={module}>
              <div className="text-[16px] text-pt">{module}</div>
              <Checkbox
                checked={selectedModule?.includes(module)}
                onCheckedChange={(e) => handleCheckedChange(e, module)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
