/* eslint-disable @next/next/no-async-client-component */
"use client";

import React, { useState, useEffect } from "react";
import { DataTableDemo } from "./components/data-table";
import { getStatusList } from "./actions";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export default function StatusSelection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    console.log("Loading", loading, data);
    const fetchData = async () => {
      const data = await getStatusList();
      setData(data);
      setLoading(false);
    };
    setLoading(true);
    fetchData();
  }, []);

  if (!data) return null;
  if (loading)
    return (
      <div className="flex justify-center items-center h-full w-full">
        Loading...
      </div>
    );

  return (
    <div className="container sm:mx-auto p-10">
      <div className="flex justify-end my-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Site <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {[
              { id: 1, siteName: "Site1" },
              { id: 2, siteName: "Site2" },
            ].map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  // checked={column.getIsVisible()}
                  // onCheckedChange={
                  //   (value) =>
                  //   column.toggleVisibility(!!value)
                  // }
                >
                  {column.siteName}
                </DropdownMenuCheckboxItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <DataTableDemo data={data?.data?.tableData} />
    </div>
  );
}
