"use client";

import { useCounterStore } from "@/store/counter";
import React from "react";
import Footer from "../Footer";

export default function Header() {
  const bears = useCounterStore((store) => store.bears);
  return (
    <div className="flex flex-col h-full w-full justify-center items-center text-12 font-semibold">
      Welcome to Warehouse management system {bears}
      <Footer />
    </div>
  );
}
