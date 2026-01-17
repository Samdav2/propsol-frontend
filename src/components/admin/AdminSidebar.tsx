"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    CreditCard,
    Settings,
    LogOut,
    Briefcase,
    ArrowUpRight,
    Share2,
    MessageCircle
} from "lucide-react";

export function AdminSidebar() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path || pathname.startsWith(`${path}/`);
    };

    const menuItems = [
        {
            title: "Dashboard",
            icon: LayoutDashboard,
            href: "/admin",
            exact: true
        },
        {
            title: "Users",
            icon: Users,
            href: "/admin/users"
        },
        {
            title: "Affiliates",
            icon: Share2,
            href: "/admin/affiliates"
        },
        {
            title: "Prop Firms",
            icon: Briefcase,
            href: "/admin/prop-firm"
        },
        {
            title: "Payments",
            icon: CreditCard,
            href: "/admin/payments"
        },
        {
            title: "Transactions",
            icon: ArrowUpRight,
            href: "/admin/transactions"
        },
        {
            title: "Support Messages",
            icon: MessageCircle,
            href: "/admin/support"
        },
        {
            title: "Assign Package",
            icon: Briefcase,
            href: "/admin/packages"
        },
        {
            title: "Settings",
            icon: Settings,
            href: "/admin/settings"
        },
        {
            title: "Register Admin",
            icon: Users,
            href: "/admin/register"
        }
    ];

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white transition-transform">
            <div className="flex h-full flex-col overflow-y-auto px-3 py-4">
                <div className="mb-10 flex items-center pl-2.5">
                    <span className="self-center whitespace-nowrap text-xl font-bold text-gray-900">
                        PROPSOL <span className="text-blue-600">Admin</span>
                    </span>
                </div>

                <ul className="space-y-2 font-medium">
                    {menuItems.map((item) => {
                        const active = item.exact
                            ? pathname === item.href
                            : isActive(item.href);

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`group flex items-center rounded-lg p-3 transition-all duration-200 ${active
                                        ? "bg-blue-600 text-white shadow-md"
                                        : "text-gray-600 hover:bg-gray-100"
                                        }`}
                                >
                                    <item.icon
                                        className={`h-5 w-5 flex-shrink-0 transition duration-75 ${active ? "text-white" : "text-gray-500 group-hover:text-gray-900"
                                            }`}
                                    />
                                    <span className="ml-3">{item.title}</span>
                                    {active && (
                                        <div className="ml-auto h-2 w-1 rounded-full bg-white/50" />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <div className="mt-auto border-t border-gray-200 pt-4">
                    <button
                        className="group flex w-full items-center rounded-lg p-3 text-gray-600 transition-colors duration-200 hover:bg-red-50 hover:text-red-600"
                        onClick={() => {
                            // Handle logout
                            localStorage.removeItem("access_token");
                            localStorage.removeItem("user_data");
                            window.location.href = "/signin";
                        }}
                    >
                        <LogOut className="h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-red-600" />
                        <span className="ml-3">Sign Out</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}
