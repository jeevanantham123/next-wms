"use client";

import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

export default function Unauthorized() {
  const router = useRouter();
  const userPermissions = useAuthStore((state) => state.userPermissions);

  useEffect(() => {
    toast.error("User is not authorized");
    if (userPermissions.includes("admin")) router.push("/admin/dashboard");
    if (userPermissions.includes("wms")) router.push("/wms/dashboard");
    if (userPermissions.includes("auditing"))
      router.push("/auditing/dashboard");
  }, []);

  const handleGoback = () => {
    if (userPermissions.includes("admin")) router.push("/admin/dashboard");
    if (userPermissions.includes("wms")) router.push("/wms/dashboard");
    if (userPermissions.includes("auditing"))
      router.push("/auditing/dashboard");
  };
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <div class="text-center p-6 max-w-md mx-auto bg-white shadow-md rounded-lg">
        <h1 class="text-3xl font-bold text-red-600 mb-4">Unauthorized</h1>
        <p class="text-gray-700 mb-6">
          You do not have permission to access this page.
        </p>

        <Button onClick={() => handleGoback()}>Go to Homepage</Button>
      </div>
    </div>
  );
}
