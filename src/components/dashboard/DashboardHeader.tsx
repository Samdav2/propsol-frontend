"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { User } from "@/services/user.service";
import { authService } from "@/services/auth.service";

interface DashboardHeaderProps {
    user?: User;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
    const router = useRouter();

    const handleLogout = () => {
        authService.logout();
        router.push("/signin");
    };

    return (
        <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
            <div className="container mx-auto flex h-20 items-center justify-between px-4">
                {/* Left Section: Logo & Nav */}
                <div className="flex items-center gap-12">
                    <Link href="/" className="flex items-center gap-0.5">
                        <span className="text-2xl font-bold text-blue-600">Prop</span>
                        <span className="text-2xl font-bold text-gray-900">Sol</span>
                    </Link>

                    <nav className="hidden items-center gap-8 md:flex">
                        <Link
                            href="/"
                            className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
                        >
                            Home
                        </Link>
                        <Link
                            href="/support"
                            className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
                        >
                            Support/Contact
                        </Link>
                        <Link
                            href="/faq"
                            className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
                        >
                            FAQ
                        </Link>
                        <Link
                            href="/about"
                            className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
                        >
                            About
                        </Link>
                    </nav>
                </div>

                {/* Right Section: User Profile & Action Button */}
                <div className="flex items-center gap-4">
                    {/* Quick Action Icons */}


                    {/* User Profile */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </button>
                    </div>


                </div>
            </div>
        </header>
    );
}
