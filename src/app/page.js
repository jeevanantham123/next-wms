"use client";
import { useRouter } from "next/navigation";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";

export default function Home() {
  const router = useRouter();
  const userPermissions = useAuthStore((state) => state.userPermissions);

  useEffect(() => {
    if (userPermissions.includes("wms")) {
      router.push("/wms/dashboard");
    }
    else if (userPermissions.includes("auditing")) { router.push("/auditing/dashboard"); }
    else (userPermissions.includes("admin"))
    {
      router.push("/admin/dashboard");
    }
  }, []);

  return (
    <>
      <Header />
    </>
  );
}
