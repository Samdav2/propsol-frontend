"use client";

import Link from "next/link";
import Image from "next/image";
import { User as UserIcon } from "lucide-react";
import { User } from "@/services/user.service";

interface DashboardHeaderProps {
    user?: User;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
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
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gray-200 bg-gray-100">
                            <Image
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=random&color=fff`}
                                alt={user?.name || "User"}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="hidden flex-col sm:flex">
                            <span className="text-sm font-bold text-gray-900">{user?.name || "Loading..."}</span>
                            <span className="text-xs text-gray-500">{user?.email || ""}</span>
                        </div>
                    </div>


                </div>
            </div>
        </header>
    );
}
