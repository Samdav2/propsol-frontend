"use client";

import { Bell, Search, User } from "lucide-react";
import { useState, useEffect } from "react";
import { adminService, Admin } from "@/services/admin.service";
import Link from "next/link";

export function AdminHeader() {
    const [admin, setAdmin] = useState<Admin | null>(null);

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const data = await adminService.getMe();
                setAdmin(data);
            } catch (error) {
                console.error("Failed to fetch admin data", error);
            }
        };
        fetchAdmin();
    }, []);

    return (
        <header className="fixed left-64 right-0 top-0 z-30 flex h-20 items-center justify-between border-b border-gray-100 bg-white/80 px-8 backdrop-blur-sm">
            <div className="flex items-center gap-4">
                <div className="text-sm text-gray-500">
                    Pages / <span className="font-semibold text-gray-900">Dashboard</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Main Dashboard</h1>
            </div>

            <div className="flex items-center gap-4 rounded-full bg-white p-2 shadow-sm ring-1 ring-gray-100">
                <div className="relative hidden md:block">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full rounded-full bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Search..."
                    />
                </div>

                <Link href="/admin/notifications" className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                </Link>

                <div className="flex items-center gap-3 pl-2">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-gray-900">{admin?.name || "Admin"}</p>
                        <p className="text-xs text-gray-500">Administrator</p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <User className="h-5 w-5" />
                    </div>
                </div>
            </div>
        </header>
    );
}
