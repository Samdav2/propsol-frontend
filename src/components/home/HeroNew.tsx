"use client";

import Link from "next/link";
import Image from "next/image";
import { AlertTriangle } from "lucide-react";

const HeroNew = () => {
    return (
        <section className="relative bg-gradient-to-b from-[#0a0e27] via-[#0d1230] to-[#1a1f4e] overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Professional Trading Background Pattern */}
                <div className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' viewBox='0 0 1000 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='rgba(255,255,255,0.05)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C!-- Candlesticks --%3E%3Cg transform='translate(0, 200)'%3E%3C!-- Green Candles --%3E%3Crect x='50' y='-50' width='8' height='80' fill='%2310b981' opacity='0.6'/%3E%3Cline x1='54' y1='-70' x2='54' y2='50' stroke='%2310b981' stroke-width='1' opacity='0.6'/%3E%3Crect x='100' y='-20' width='8' height='40' fill='%2310b981' opacity='0.6'/%3E%3Cline x1='104' y1='-40' x2='104' y2='30' stroke='%2310b981' stroke-width='1' opacity='0.6'/%3E%3Crect x='150' y='-80' width='8' height='120' fill='%2310b981' opacity='0.6'/%3E%3Cline x1='154' y1='-100' x2='154' y2='60' stroke='%2310b981' stroke-width='1' opacity='0.6'/%3E%3C!-- Red Candles --%3E%3Crect x='200' y='0' width='8' height='60' fill='%23ef4444' opacity='0.6'/%3E%3Cline x1='204' y1='-20' x2='204' y2='80' stroke='%23ef4444' stroke-width='1' opacity='0.6'/%3E%3Crect x='250' y='40' width='8' height='40' fill='%23ef4444' opacity='0.6'/%3E%3Cline x1='254' y1='20' x2='254' y2='100' stroke='%23ef4444' stroke-width='1' opacity='0.6'/%3E%3C!-- More Green --%3E%3Crect x='300' y='-40' width='8' height='90' fill='%2310b981' opacity='0.6'/%3E%3Cline x1='304' y1='-60' x2='304' y2='70' stroke='%2310b981' stroke-width='1' opacity='0.6'/%3E%3Crect x='350' y='-100' width='8' height='150' fill='%2310b981' opacity='0.6'/%3E%3Cline x1='354' y1='-120' x2='354' y2='70' stroke='%2310b981' stroke-width='1' opacity='0.6'/%3E%3C!-- Trend Line --%3E%3Cpath d='M54,230 L104,220 L154,160 L204,260 L254,300 L304,210 L354,150 L450,50 L550,150 L650,100 L750,200 L850,50 L950,150' fill='none' stroke='%2338bdf8' stroke-width='2' stroke-opacity='0.4'/%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundRepeat: 'repeat-x',
                        backgroundPosition: 'bottom center',
                        backgroundSize: 'cover'
                    }}
                />

                {/* Purple/blue glow effects */}
                <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-purple-600/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20 relative z-10">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-4">
                    {/* Left Content */}
                    <div className="flex-1 max-w-2xl text-center lg:text-left pt-4">
                        {/* Main Headline - White with italic style */}
                        <h1 className="text-xl sm:text-3xl lg:text-4xl xl:text-[42px] font-bold text-white leading-tight mb-2 tracking-tight">
                            <span className="italic font-serif">We Pass Your Prop Firm Challenge —</span>
                        </h1>

                        {/* Subheadline - Gold/Yellow italic */}
                        <p className="text-base sm:text-xl lg:text-2xl xl:text-[28px] text-[#fbbf24] font-semibold italic mb-4">
                            Or You Get a Full Refund + $100 Compensation
                        </p>

                        {/* Description text */}
                        <p className="text-slate-400 text-[10px] sm:text-sm mb-5 max-w-md mx-auto lg:mx-0">
                            Accounts managed in a manner fully compliant with prop firm rules.
                        </p>

                        {/* Partner Logos - styled to match */}
                        <div className="grid grid-cols-2 justify-items-center gap-y-6 gap-x-4 lg:flex lg:flex-wrap lg:items-center lg:justify-start lg:gap-10 mb-8">
                            {/* FundedNext */}
                            <div className="flex items-center gap-2.5">
                                <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                                    <Image
                                        src="/assets/funded_next_logo.png"
                                        alt="FundedNext"
                                        fill
                                        className="object-contain brightness-0 invert"
                                    />
                                </div>
                                <span className="font-semibold text-white text-lg sm:text-2xl">Funded<span className="text-orange-400">Next</span></span>
                            </div>

                            {/* FundingPips */}
                            <div className="flex items-center gap-2.5">
                                <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                                    <Image
                                        src="/assets/funding_pips_logo.png"
                                        alt="FundingPips"
                                        fill
                                        className="object-contain brightness-0 invert"
                                    />
                                </div>
                                <span className="font-semibold text-white text-lg sm:text-2xl">Funding<span className="text-emerald-400">Pips</span></span>
                            </div>

                            {/* FTMO */}
                            <div className="flex items-center gap-2.5 col-span-2 lg:col-span-1 lg:w-auto">
                                <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                                    <Image
                                        src="/assets/ftmo_logo.png"
                                        alt="FTMO"
                                        fill
                                        className="object-contain brightness-0 invert"
                                    />
                                </div>
                                <span className="font-bold text-white text-lg sm:text-2xl">FTMO</span>
                            </div>
                        </div>

                        {/* Button and Warning Wrapper - Desktop Only */}
                        <div className="hidden lg:flex flex-col w-full sm:w-auto">
                            {/* CTA Button - Purple gradient */}
                            <Link
                                href="/register"
                                className="inline-block w-full px-6 py-4 sm:px-12 sm:py-6 lg:px-36 text-lg sm:text-xl font-bold text-center text-white bg-gradient-to-r from-[#5B4DC7] to-[#7B6DD7] rounded-lg hover:from-[#4B3DB7] hover:to-[#6B5DC7] transition-all shadow-lg shadow-purple-600/30 mb-4"
                            >
                                Book a Free Strategy Call
                            </Link>

                            {/* Limited Slots Notice - White/Slate */}
                            <div className="flex items-center justify-center gap-2 text-slate-300 text-lg w-full mt-2">
                                <AlertTriangle className="w-5 h-5" />
                                <span>Limited monthly slots to protect success rate</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Laptop with Money */}
                    <div className="flex-1 relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl lg:-mr-12">
                        {/* Decorative Arrows - Top right */}
                        <div className="absolute -top-8 right-4 sm:right-8 z-20">
                            <svg width="50" height="70" viewBox="0 0 50 70" fill="none">
                                <path d="M25 70V20M25 20L8 37M25 20L42 37" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="absolute -top-4 right-16 sm:right-20 z-20">
                            <svg width="40" height="60" viewBox="0 0 50 70" fill="none">
                                <path d="M25 70V25M25 25L10 40M25 25L40 40" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        {/* Laptop + Money Image */}
                        <div className="relative w-full aspect-[16/10] lg:aspect-[16/9] scale-90 sm:scale-100">
                            <Image
                                src="/assets/hero_laptop_money.png"
                                alt="FTMO Trading Platform with Money"
                                fill
                                className="object-contain object-center lg:object-right"
                                priority
                            />
                        </div>
                    </div>

                    {/* Button and Warning Wrapper - Mobile Only (Bottom) */}
                    <div className="flex lg:hidden flex-col w-full sm:w-auto mt-8">
                        {/* CTA Button - Purple gradient */}
                        <Link
                            href="/register"
                            className="inline-block w-full px-6 py-4 text-lg font-bold text-center text-white bg-gradient-to-r from-[#5B4DC7] to-[#7B6DD7] rounded-lg hover:from-[#4B3DB7] hover:to-[#6B5DC7] transition-all shadow-lg shadow-purple-600/30 mb-4"
                        >
                            Book a Free Strategy Call
                        </Link>

                        {/* Limited Slots Notice - White/Slate */}
                        <div className="flex items-center justify-center gap-2 text-slate-300 text-xs sm:text-sm w-full mt-2 whitespace-nowrap">
                            <AlertTriangle className="w-4 h-4" />
                            <span>Limited monthly slots to protect success rate</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroNew;
