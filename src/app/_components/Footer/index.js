"use client";

import { Button } from "@/components/ui/button";
import { useCounterStore } from "@/store/counter";
import React from "react";

export default function Footer() {
  const increasePopulation = useCounterStore(
    (state) => state.increasePopulation
  );
  return (
    <div>
      <Button className="mt-1" onClick={() => increasePopulation()}>
        Click me !
      </Button>
    </div>
  );
}
