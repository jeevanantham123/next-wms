"use client";

import { AvatarIcon } from "@radix-ui/react-icons";
import React from "react";

const moduleList = [
  {
    id: 1,
    icon: "/icons/modules/customer.svg",
    title: "Customer relationship management",
    link: "/landing-page",
    background: "#E6F2FF",
    text: "#007AFF",
  },
  {
    id: 2,
    icon: "/icons/modules/warehouse.svg",
    title: "Warehouse management System",
    link: "/landing-page",
    background: "#E2FFEF",
    text: "#1EA159",
  },
  {
    id: 3,
    icon: "/icons/modules/auditing.svg",
    title: "Auditing Information",
    link: "/landing-page",
    background: "#FFECEC",
    text: "#FF5A5A",
  },
  {
    id: 4,
    icon: "/icons/modules/storage.svg",
    title: "Storage Management",
    link: "/landing-page",
    background: "#FFF6E3",
    text: "#BA861F",
  },
  {
    id: 5,
    icon: "/icons/modules/erp.svg",
    title: "ERP Management",
    link: "/landing-page",
    background: "#F0F0F0",
    text: "#182627",
  },
  {
    id: 6,
    icon: "/icons/modules/supply.svg",
    title: "Supply Chain Management",
    link: "/landing-page",
    background: "#FFF6E5",
    text: "#C26F25",
  },
];

export default function LandingPage() {
  const handleModuleClick = (link) => {
    console.log(link);
  };
  return (
    <div className="container flex flex-col w-full mb-[24px] md:mb-0 justify-center items-center min-h-[80vh] mt-[84px] mx-auto">
      <div className="text-[30px] mt-[24px] md:mt-0 md:text-[36px] font-medium text-black">
        Welcome to <span className="text-[#007AFF]">SV Stack</span>
      </div>
      <div className="text-[#787878] text-[20px] mt-[20px] md:w-[66%] text-center">
        Effortless, powerful, and designed to help you reach your goals. Find
        everything you need to work smarter and succeed right here
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] mt-[24px]">
        {moduleList?.map((module) => {
          return (
            <div
              key={module?.id}
              className={`flex flex-col cursor-pointer border rounded-[10px] p-[16px] w-full md:min-w-[280px] min-h-[170px] md:w-[280px] h-[170px]`}
              style={{
                borderColor: module.text,
                backgroundColor: module.background,
              }}
              onClick={() => handleModuleClick(module.link)}
            >
              <div
                className={`h-[70px] bg-white w-[70px] flex justify-center items-center border rounded-[7px]`}
                style={{ borderColor: module.text }}
              >
                <img src={module.icon} alt="logo" />
              </div>
              <div
                className="mt-[16px] text-[20px] text-wrap"
                style={{ color: module.text }}
              >
                {module.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
