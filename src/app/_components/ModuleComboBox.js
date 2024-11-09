"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname, useRouter } from "next/navigation";

const frameworks = [
  {
    value: "wms",
    label: "Warehouse Management",
    path: "/wms/dashboard",
  },
  {
    value: "auditing",
    label: "Auditing",
    path: "/auditing/dashboard",
  },
  {
    value: "admin",
    label: "Authentication",
    path: "/admin/dashboard",
  },
];

export function ModuleComboBox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const router = useRouter();
  const pathName = usePathname();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[230px] text-[14px] h-[42px] mb-[12px] mt-[20px] ml-[12px] justify-between border border-theme"
        >
          {pathName
            ? frameworks.find((framework) => pathName.includes(framework.value))
                ?.label
            : "Select Module..."}
          <ChevronsUpDown className="opacity-80 h-[20px]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[230px] p-0 bg-white z-[999]">
        <Command>
          <CommandList>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    router.push(framework.path);
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      pathName?.includes(framework.value)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
