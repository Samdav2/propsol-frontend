"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${isHomePage
            ? "bg-[#0a0e27]/90 border-slate-700/30"
            : "bg-white/90 border-slate-200/50"
            }`}>
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                <div className="flex items-center gap-12">
                    <Link href="/" className="flex items-center gap-0.5">
                        <span className="text-2xl font-bold text-primary">Prop</span>
                        <span className={`text-2xl font-bold ${isHomePage ? "text-white" : "text-slate-900"}`}>Sol</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {[
                            { name: "Home", href: "/" },
                            { name: "Pricing", href: "/pricing" },
                            { name: "Support/Contact", href: "/support" },
                            { name: "FAQ", href: "/faq" },
                            { name: "About", href: "/about" },
                        ].map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-medium transition-colors ${isHomePage
                                    ? "text-slate-200 hover:text-white"
                                    : "text-slate-600 hover:text-primary"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Desktop Auth Buttons */}
                <div className="hidden md:flex items-center gap-4 ml-auto">
                    <Link
                        href="/signup"
                        className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-colors ${isHomePage
                            ? "text-white bg-white/10 hover:bg-white/20"
                            : "text-primary bg-primary/10 hover:bg-primary/20"
                            }`}
                    >
                        Sign Up
                    </Link>
                    <Link
                        href="/signin"
                        className="px-6 py-2.5 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
                    >
                        Sign In
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={`md:hidden p-2 transition-colors ${isHomePage ? "text-slate-200 hover:text-white" : "text-slate-600 hover:text-primary"
                        }`}
                    onClick={() => setIsMenuOpen(true)}
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed top-0 left-0 w-full h-auto pb-8 bg-white md:hidden shadow-2xl" style={{ backgroundColor: '#ffffff', opacity: 1, zIndex: 9999 }}>
                    <div className="container mx-auto px-4 h-20 flex items-center justify-between border-b border-slate-100">
                        <Link href="/" className="flex items-center gap-0.5" onClick={() => setIsMenuOpen(false)}>
                            <span className="text-2xl font-bold text-primary">Prop</span>
                            <span className="text-2xl font-bold text-slate-900">Sol</span>
                        </Link>
                        <button
                            className="p-2 text-slate-600 hover:text-primary transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-8 pt-12">
                        {/* Mobile Navigation Links */}
                        <Link href="/" className="text-lg font-medium text-slate-900 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                            Home
                        </Link>
                        <Link href="/pricing" className="text-lg font-medium text-slate-900 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                            Pricing
                        </Link>
                        <Link href="/support" className="text-lg font-medium text-slate-900 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                            Support/Contact
                        </Link>
                        <Link href="/faq" className="text-lg font-medium text-slate-900 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                            FAQ
                        </Link>
                        <Link href="/about" className="text-lg font-medium text-slate-900 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                            About
                        </Link>
                        <div className="flex flex-col gap-4 w-full px-8 mt-4">
                            <Link
                                href="/signin"
                                className="w-full py-3 text-center text-lg font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/signup"
                                className="w-full py-3 text-center text-lg font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
