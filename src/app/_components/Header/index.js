import { Button } from "@/components/ui/button";
import React from "react";

export default function Header() {
  return (
    <div className="flex flex-col h-full w-full justify-center items-center text-12 font-semibold">
      Welcome to Warehouse management system
      <Button className="mt-1">Click me !</Button>
    </div>
  );
}
