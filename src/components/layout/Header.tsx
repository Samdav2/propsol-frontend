"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                <div className="flex items-center gap-12">
                    <Link href="/" className="flex items-center gap-0.5">
                        <span className="text-2xl font-bold text-primary">Prop</span>
                        <span className="text-2xl font-bold text-slate-900">Sol</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
                            Home
                        </Link>
                        <Link href="/support" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
                            Support/Contact
                        </Link>
                        <Link href="/faq" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
                            FAQ
                        </Link>
                        <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
                            About
                        </Link>
                    </nav>
                </div>

                {/* Desktop Auth Buttons */}
                <div className="hidden md:flex items-center gap-4 ml-auto">
                    <Link
                        href="/signup"
                        className="px-6 py-2.5 text-sm font-semibold text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
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
                    className="md:hidden p-2 text-slate-600 hover:text-primary transition-colors"
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
                        <Link href="/features" className="text-lg font-medium text-slate-900 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                            Features
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
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
