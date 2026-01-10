"use client";

import Link from "next/link";
import Image from "next/image";

const HeroNew = () => {
    return (
        <section className="relative bg-[#0a0e27] overflow-hidden min-h-[100svh] sm:min-h-[850px] flex items-center pb-16 sm:pb-0">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/images/hero-bg.jpg"
                    alt="Background Pattern"
                    fill
                    className="object-cover opacity-100"
                    priority
                />
                {/* Overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-[#0a0e27]/95 via-[#0a0e27]/70 to-[#0a0e27]/50 sm:from-[#0a0e27]/90 sm:via-[#0a0e27]/40 sm:to-transparent" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24 sm:pt-20">
                <div className="flex flex-col lg:flex-row items-center lg:items-end gap-8 lg:gap-0">
                    {/* Left Content */}
                    <div className="flex-1 w-full max-w-none lg:w-[60%] z-40 mb-8 sm:mb-20 lg:mb-32 text-center sm:text-left">
                        {/* Main Headline */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] font-bold text-white leading-[1.15] mb-4 tracking-tight">
                            We Pass Your Prop Firm Challenge -
                        </h1>

                        {/* Subheadline */}
                        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[40px] text-[#fbbf24] font-normal mb-6 sm:mb-8 leading-tight">
                            Or You Get a Full Refund + $100 Compensation
                        </p>

                        {/* Description text */}
                        <p className="text-slate-200 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-3xl leading-relaxed font-light mx-auto sm:mx-0">
                            Accounts are managed in a manner fully compliant with prop firm rules, with limited monthly slots available.
                        </p>

                        {/* Partner Logos - Mobile: 2 columns, Desktop: row */}
                        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-8 lg:gap-12 mb-8 sm:mb-12 opacity-100">
                            {/* FundedNext */}
                            <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
                                <div className="relative w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10">
                                    <Image
                                        src="/assets/funded_next_logo.png"
                                        alt="FundedNext"
                                        fill
                                        className="object-contain brightness-0 invert"
                                    />
                                </div>
                                <span className="font-semibold text-white text-sm sm:text-xl md:text-2xl">FundedNext</span>
                            </div>

                            {/* FundingPips */}
                            <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
                                <div className="relative w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10">
                                    <Image
                                        src="/assets/funding_pips_logo.png"
                                        alt="FundingPips"
                                        fill
                                        className="object-contain brightness-0 invert"
                                    />
                                </div>
                                <span className="font-semibold text-white text-sm sm:text-xl md:text-2xl">FundingPips</span>
                            </div>

                            {/* FTMO - Center on mobile */}
                            <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 col-span-2 sm:col-span-1">
                                <div className="relative w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10">
                                    <Image
                                        src="/assets/ftmo_logo.png"
                                        alt="FTMO"
                                        fill
                                        className="object-contain brightness-0 invert"
                                    />
                                </div>
                                <span className="font-bold text-white text-sm sm:text-xl md:text-2xl">FTMO</span>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 sm:gap-6 w-full sm:w-auto">
                            <Link
                                href="/signup"
                                className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg md:text-xl font-bold text-center text-white bg-[#3b82f6] rounded-md hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/30"
                            >
                                Get Started Now
                            </Link>
                            <Link
                                href="/#pricing"
                                className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg md:text-xl font-bold text-center text-[#3b82f6] bg-[#eff6ff] rounded-md hover:bg-white transition-all shadow-xl"
                            >
                                View Pricing
                            </Link>
                        </div>
                    </div>

                    {/* Right Content - Laptop Image */}
                    <div className="flex-1 relative w-full lg:w-[50%] lg:-ml-20 xl:-ml-32 mt-4 sm:mt-12 lg:mt-0 z-30 translate-y-4 sm:translate-y-12 lg:translate-y-24">
                        <div className="relative w-full aspect-[16/10] scale-150 sm:scale-125 lg:scale-150 origin-center lg:origin-bottom-right">
                            <Image
                                src="/assets/images/hero-laptop.png"
                                alt="Trading Laptop"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>

                        {/* Single Floating Star - visible on all screens */}
                        <div className="absolute -bottom-8 -left-6 sm:-bottom-10 sm:-left-10 w-28 h-28 sm:w-44 sm:h-44 md:w-60 md:h-60 z-30 animate-float pointer-events-none">
                            <Image
                                src="/assets/star.png"
                                alt="Star"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroNew;
