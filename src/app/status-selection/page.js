/* eslint-disable @next/next/no-async-client-component */
"use client";

import React, { useState, useEffect } from "react";
import { DataTableDemo } from "./components/data-table";
import { getStatusList } from "./actions";

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
      <DataTableDemo data={data?.data?.tableData} />
    </div>
  );
}
