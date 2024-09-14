"use client";

import React from "react";
import { mockData } from "./constants";
import { columns } from "./components/columns";
import { DataTableDemo } from "./components/data-table";

export default function StatusSelection() {
  const data = mockData;

  return (
    <div className="container mx-auto p-10">
      <DataTableDemo />
    </div>
  );
}
