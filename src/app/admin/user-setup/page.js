"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";
import { Cross2Icon } from "@radix-ui/react-icons";
import { LoadingSpinner } from "@/components/ui/loader";
import { get } from "@/api";
import { UserDatatable } from "./_components/data-table";
import { useUserList } from "./_components/store";

export default function UserSetup() {
  const { isLoading, error, isError, data, refetch } = useQuery({
    queryKey: ["get-users-list"],
    queryFn: () => get("/admin/users"),
  });

  if (isError && !isLoading) {
    toast("Error fetching user list!", {
      action: {
        label: <Cross2Icon className="rounded-full" />,
      },
    });
    console.error("User fetching error", error);
  }
  if (isLoading)
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="container min-h-screen sm:mx-auto p-10">
      <UserDatatable refetch={refetch} data={data?.data} />
    </div>
  );
}
