"use client";

import Link from "next/link";
import { Check, Shield, Star } from "lucide-react";

const challengeTypes = [
    {
        title: "2-Step Challenge",
        subtitle: "Step 1 Pass Only",
        description: "Best for traders who want help clearing the first stage.",
        details: "We handle Step 1 only. After passing, control is returned to you.",
        included: [
            "Passing Step 1 only",
            "Rule-compliant execution",
            "Timeline: 30-60 trading days",
            "Progress updates",
        ],
        afterPassing: [
            "Account is handed back to you",
            "You may continue Step 2 yourself",
            "Or upgrade later to full completion",
        ],
        buttonText: "Select Step 1 Pass",
        buttonLink: "/register?type=step1",
        featured: false,
    },
    {
        title: "2-Step Challenge",
        subtitle: "Full (Step 1 + Step 2)",
        badge: "MOST CHOSEN",
        description: "Best for traders who want the entire challenge completed.",
        details: "We complete both Step 1 and Step 2, then return the passed account to you.",
        included: [
            "Step 1 and Step 2 completion",
            "Conservative execution across both phases",
            "Timeline: 30-60 trading days",
        ],
        afterPassing: [
            "You receive the fully passed account",
            "Optional access to the PropSol Trading System for funded trading support",
        ],
        buttonText: "Select Full 2-Step Completion",
        buttonLink: "/register?type=full",
        featured: true,
    },
    {
        title: "1-Step Challenge",
        subtitle: "Full",
        description: "Best for firms with single-phase challenges.",
        details: "We complete the entire 1-Step challenge in one structured phase.",
        included: [
            "Full 1-Step challenge completion",
            "Strict drawdown and consistency control",
            "Timeline: 30-60 trading days",
            "Priority handling (fewer rule constraints)",
        ],
        afterPassing: [
            "Funded account returned to you",
            "Optional access to the PropSol Trading System",
        ],
        buttonText: "Select 1-Step Completion",
        buttonLink: "/register?type=1step",
        featured: false,
    },
];

const ChallengeTypes = () => {
    return (
        <section className="relative">
            {/* Top Section - Light Background */}
            <div className="py-20 bg-[#f0f4ff] relative overflow-hidden">
                {/* Background decorations */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('/assets/video_bg_new.png')] bg-cover bg-center opacity-10" />
                    <div className="absolute top-20 left-10 w-64 h-64 bg-purple-600/5 blur-[100px] rounded-full" />
                    <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-600/5 blur-[100px] rounded-full" />
                </div>

                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-2 text-slate-600 mb-2 font-semibold tracking-wide uppercase text-sm">
                            <span>◇ PropSol</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                            Choose Your Prop Firm Challenge Type
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto mb-6 text-lg">
                            Select how far you want us to take the challenge.<br />
                            All options are executed under strict prop-firm rules.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500 font-medium">
                            <span className="flex items-center gap-1.5">
                                <Check className="w-4 h-4 text-blue-600" /> Limited monthly slots
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Check className="w-4 h-4 text-blue-600" /> Rule-compliant execution
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Check className="w-4 h-4 text-blue-600" /> Support included
                            </span>
                        </div>
                    </div>

                    {/* Search Divider */}
                    <div className="flex items-center justify-center mb-10">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="w-full border-t border-slate-300"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-[#f0f4ff] px-4 text-lg text-slate-500 font-medium flex items-center gap-2">
                                    <span className="text-xl">🔍</span> Start Your Pick
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Challenge Cards */}
                    <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto relative z-20 mb-10">
                        {challengeTypes.map((challenge, index) => (
                            <div
                                key={index}
                                className={`relative flex flex-col bg-white rounded-2xl shadow-xl transition-all hover:shadow-2xl ${challenge.featured ? "transform lg:-translate-y-4 border-2 border-blue-600 z-10" : "border border-slate-100"
                                    }`}
                            >
                                {challenge.featured && (
                                    <div className="bg-[#1a1f4e] text-white p-4 text-center relative rounded-t-[14px]">
                                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1 shadow-lg uppercase tracking-wider whitespace-nowrap z-20">
                                            <Shield className="w-3 h-3 fill-white" />
                                            MOST CHOSEN
                                        </div>
                                        <h3 className="text-xl font-bold mt-2">{challenge.title} —</h3>
                                        <p className="text-lg font-medium text-blue-200">{challenge.subtitle}</p>
                                    </div>
                                )}

                                <div className={`p-6 flex-1 flex flex-col ${challenge.featured ? "pt-4" : ""}`}>
                                    {!challenge.featured && (
                                        <div className="mb-6 text-center">
                                            <h3 className="text-xl font-bold text-slate-900 mb-1">{challenge.title} —</h3>
                                            <p className="text-lg text-slate-600 font-semibold">{challenge.subtitle}</p>
                                        </div>
                                    )}

                                    <p className="text-slate-600 text-sm mb-6 text-center min-h-[40px]">{challenge.description}</p>
                                    <p className="text-slate-500 text-xs mb-6 text-center italic">{challenge.details}</p>

                                    <div className="mb-6 bg-slate-50 p-4 rounded-xl">
                                        <p className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide">What&apos;s included</p>
                                        <div className="space-y-2.5">
                                            {challenge.included.map((item, i) => (
                                                <div key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                                                    <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                                    <span>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <p className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide">
                                            {challenge.subtitle.includes("Step 1") ? "What happens after Step 1" : "After passing"}
                                        </p>
                                        <div className="space-y-2.5">
                                            {challenge.afterPassing.map((item, i) => (
                                                <div key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                                                    <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                                    <span>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-auto">
                                        <Link
                                            href={challenge.buttonLink}
                                            className="block w-full text-center py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#5B4DC7] to-[#7B6DD7] hover:from-[#4B3DB7] hover:to-[#6B5DC7] shadow-lg shadow-purple-600/20 transition-all transform hover:scale-[1.02]"
                                        >
                                            {challenge.buttonText}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Section - Dark Background with Guarantee */}
            <section className="relative bg-gradient-to-b from-[#0a0e27] via-[#0d1230] to-[#1a1f4e] pt-32 pb-20 mt-[-100px] overflow-hidden">
                {/* Curved Top Divider */}
                <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[60px] sm:h-[100px]">
                        <path d="M0,0 L1200,0 L1200,20 C1200,20 900,100 600,100 C300,100 0,20 0,20 Z" className="fill-[#f0f4ff]"></path>
                    </svg>
                </div>

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

                <div className="container mx-auto px-4 sm:px-6 relative z-20">
                    {/* Guarantee Card */}
                    <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/10 relative overflow-hidden mb-12">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#fbbf24] to-transparent" />
                        <div className="flex flex-col items-center text-center">
                            <div className="flex items-center gap-2 mb-4">
                                <Shield className="w-6 h-6 text-[#fbbf24] fill-[#fbbf24]" />
                                <h3 className="text-2xl font-bold text-slate-900">Our Guarantee</h3>
                            </div>
                            <p className="text-slate-700 font-medium mb-6">If we fail to pass your selected challenge:</p>
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-6 text-left">
                                <div className="flex items-center gap-2">
                                    <Check className="w-5 h-5 text-blue-600" />
                                    <span className="text-slate-600">Service fee refunded</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check className="w-5 h-5 text-blue-600" />
                                    <span className="text-slate-600">Challenge fee handled</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check className="w-5 h-5 text-blue-600" />
                                    <span className="text-slate-600">$100 compensation paid</span>
                                </div>
                            </div>
                            <p className="text-slate-500 text-sm">Slots are capped monthly to protect success rate.</p>
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="text-center">
                        <p className="text-slate-300 mb-4 text-lg">Not sure which option fits your challenge?</p>
                        <Link href="/support" className="inline-block w-full sm:w-auto bg-gradient-to-r from-[#5B4DC7] to-[#7B6DD7] text-white font-bold py-4 px-12 rounded-xl hover:from-[#4B3DB7] hover:to-[#6B5DC7] transition-all shadow-lg shadow-purple-600/30 text-lg">
                            Book a 10-Minute Support Call
                        </Link>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default ChallengeTypes;
