"use client";

import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";

export function DashboardHeader() {
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
                        <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gray-200">
                            <Image
                                src="/assets/avatar-placeholder.png" // Placeholder, will need a real asset or generic one
                                alt="Jude Mike"
                                fill
                                className="object-cover"
                            />
                            {/* Fallback if image fails or for now */}
                            <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-500">
                                JM
                            </div>
                        </div>
                        <div className="hidden flex-col sm:flex">
                            <span className="text-sm font-bold text-gray-900">Jude Mike</span>
                            {/* <span className="text-xs text-gray-500">@jde321@gmail.com</span> - Mockup shows name on right, but also name/email on left in another view?
                  The mockup shows "Jude Mike" on the right.
                  Wait, the mockup shows "Jude Mike" and avatar on the right.
                  AND "Jude Mike" and email on the left below the header? No, that's a separate section.
                  Actually, looking closely at the first mockup image:
                  Top right: Avatar + "Jude Mike".
                  Below header, left: Avatar + "Jude Mike" + email.
                  I will implement the Top Right part here.
              */}
                        </div>
                    </div>

                    <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 shadow-lg shadow-blue-200">
                        <span>Pass New Account</span>
                        <Plus className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </header>
    );
}
