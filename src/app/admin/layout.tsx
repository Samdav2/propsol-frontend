"use client";

import AdminGuard from "@/components/admin/AdminGuard";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { usePathname } from "next/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    if (pathname === "/admin/login" || pathname === "/admin/register") {
        return <>{children}</>;
    }

    return (
        <AdminGuard>
            <div className="min-h-screen bg-gray-50">
                <AdminSidebar />
                <div className="ml-64">
                    <AdminHeader />
                    <main className="mt-20 p-8">
                        {children}
                    </main>
                </div>
            </div>
        </AdminGuard>
    );
}
