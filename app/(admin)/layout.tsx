"use client";

import { useSession } from "../lib/auth-client";
// import { useRouter } from "next/router";
import { useEffect, ReactNode } from "react";
import { requireAdmin } from "../lib/admin";
import { AdminSidebar } from "../components/admin/AdminSidebar";
export default function AdminLayout({ children }: { children: ReactNode }) {
  const { data: session, isPending } = useSession();
  // const router = useRouter();

  useEffect(() => {
    requireAdmin();
  }, [session, isPending]);

  if (isPending) {
    return <div>Loading</div>;
  }

  if (!session || session.user.role !== "admin") {
    return null;
  }
  return (
    <>
      <div className="min-h-screen bg-[#0f1117] flex">
        <AdminSidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </>
  );
}
