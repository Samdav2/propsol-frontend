import Image from "next/image";
import Link from "next/link";
import { Headphones, Plus, Wallet } from "lucide-react";
import { User } from "@/services/user.service";

interface DashboardHeroProps {
    user?: User;
}

export function DashboardHero({ user }: DashboardHeroProps) {
    return (
        <div className="w-full bg-blue-50 py-6 md:py-8">
            <div className="container mx-auto flex flex-col gap-4 px-4 md:flex-row md:items-center md:justify-between">
                <div className="flex w-full flex-row items-center justify-between gap-4 md:w-auto md:justify-start md:gap-6">
                    <div className="flex items-center gap-3 md:gap-4">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow-sm bg-gray-200 md:h-16 md:w-16">
                            <Image
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=random&color=fff`}
                                alt={user?.name || "User"}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-base font-bold text-gray-900 md:text-lg">{user?.name || "Loading..."}</span>
                            <span className="text-xs text-gray-500 md:text-sm">{user?.email || "..."}</span>
                        </div>
                    </div>

                    <Link
                        href="/dashboard/wallet"
                        className="group flex flex-col items-center justify-center gap-1 rounded-xl bg-blue-50 px-3 py-1.5 transition-all duration-200 hover:bg-blue-100 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 border border-blue-100 md:px-4 md:py-2"
                    >
                        <div className="rounded-full bg-blue-100 p-1.5 group-hover:bg-blue-200 transition-colors md:p-2">
                            <Wallet className="h-5 w-5 text-blue-600 md:h-6 md:w-6" />
                        </div>
                        <span className="text-[10px] font-bold text-blue-700 md:text-xs">Wallet</span>
                    </Link>

                    <Link
                        href="/dashboard/support"
                        className="group flex flex-col items-center justify-center gap-1 rounded-xl bg-red-50 px-3 py-1.5 transition-all duration-200 hover:bg-red-100 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 border border-red-100 md:px-4 md:py-2"
                        title="Support"
                    >
                        <div className="rounded-full bg-red-100 p-1.5 group-hover:bg-red-200 transition-colors md:p-2">
                            <Headphones className="h-5 w-5 text-red-600 md:h-6 md:w-6" />
                        </div>
                        <span className="text-[10px] font-bold text-red-700 md:text-xs">Support</span>
                        </Link>

                </div>

                <Link href="/checkout" className="w-full md:w-auto">
                    <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 shadow-md md:w-auto md:px-6 md:py-3">
                        <span>Pass New Account</span>
                        <Plus className="h-4 w-4" />
                    </button>
                </Link>
            </div>
        </div>
    );
}
