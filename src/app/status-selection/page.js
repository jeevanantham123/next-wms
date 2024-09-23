/* eslint-disable @next/next/no-async-client-component */
"use client";

import React, { useState, useEffect } from "react";
import { DataTableDemo } from "./components/data-table";
import { getStatusList } from "./actions";

export default function StatusSelection() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStatusList();
      setData(data);
    };
    fetchData();
  }, []);

  if (!data) return null;

  return (
    <div className="container mx-auto p-10">
      <DataTableDemo data={data?.data?.tableData} />
    </div>
  );
}
