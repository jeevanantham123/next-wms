/* eslint-disable @next/next/no-async-client-component */
import React from "react";
import { mockData } from "./constants";
import { DataTableDemo } from "./components/data-table";

export default async function StatusSelection() {
  ("use server");
  const apiData = await fetch("http:localhost:3000/api/soap-api", {
    cache: "no-store",
  });
  const data = await apiData.json();

  return (
    <div className="container mx-auto p-10">
      <DataTableDemo data={data?.data?.tableData} />
    </div>
  );
}
