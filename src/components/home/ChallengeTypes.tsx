"use client";

import Link from "next/link";
import { Check, Shield } from "lucide-react";

const challengeTypes = [
    {
        title: "2-Step Challenge —",
        subtitle: "Step 1 Pass Only",
        description: "Best for traders who want help clearing the first stage",
        details: "We handle Step 1 only. After passing, control is returned to you.",
        included: [
            "Passing Step 1 only",
            "Rule-compliant execution",
            "Timeline: 30-60 trading days",
            "Progress updates",
        ],
        afterPassingTitle: "What happens after Step 1",
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
        title: "2-Step Challenge —",
        subtitle: "Full (Step 1 + Step 2)",
        badge: "MOST CHOSEN",
        description: "Best for traders who want the entire challenge completed.",
        details: "We complete both Step 1 and Step 2, then return the passed account to you.",
        included: [
            "Step 1 and Step 2 completion",
            "Conservative execution across both phases",
            "Timeline: 30-60 trading days",
        ],
        afterPassingTitle: "After passing",
        afterPassing: [
            "You receive the fully passed account",
            "Optional access to the PropSol Trading System for funded trading support",
        ],
        buttonText: "Select Full 2-Step Completion",
        buttonLink: "/register?type=full",
        featured: true,
    },
    {
        title: "1-Step Challenge —",
        subtitle: "Full",
        description: "Best for firms with single-phase challenges.",
        details: "We complete the entire 1-Step challenge in one structured phase.",
        included: [
            "Full 1-Step completion",
            "Strict drawdown and consistency control",
            "Timeline: 30-60 trading days",
            "Priority handling (fewer rule constraints)",
        ],
        afterPassingTitle: "After passing",
        afterPassing: [
            "Funded account returned to you",
            "Optional access to the PropSol Trading System",
        ],
        buttonText: "Select 1-Step Completion",
        buttonLink: "/register?type=1step",
        featured: false,
    },
];

const ChallengeCard = ({ challenge, passType }: { challenge: typeof challengeTypes[0], passType: "standard" | "guaranteed" }) => (
    <div
        className={`relative flex flex-col bg-white rounded-2xl transition-all h-full ${challenge.featured
            ? "border-2 border-purple-500"
            : "border border-slate-200"
            }`}
    >
        {challenge.featured && (
            <div className="absolute -top-3 left-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg uppercase tracking-wider whitespace-nowrap z-20">
                <Shield className="w-3 h-3 fill-white" />
                MOST CHOSEN
            </div>
        )}

        <div className="p-5 flex-1 flex flex-col">
            {/* Header */}
            <div className="mb-4">
                <h3 className="text-base font-bold text-slate-800">{challenge.title}</h3>
                <p className="text-base text-slate-600 font-semibold">{challenge.subtitle}</p>
            </div>

            {/* Description */}
            <p className="text-slate-600 text-sm mb-2">{challenge.description}</p>
            <p className="text-slate-500 text-xs mb-4 italic">{challenge.details}</p>

            {/* What's Included */}
            <div className="mb-4">
                <p className="font-bold text-slate-900 mb-2 text-sm">What&apos;s included</p>
                <div className="space-y-1.5">
                    {challenge.included.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                            <Check className="w-3.5 h-3.5 text-slate-600 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* After Passing */}
            <div className="mb-6">
                <p className="font-bold text-slate-900 mb-2 text-sm">
                    {challenge.afterPassingTitle}
                </p>
                <div className="space-y-1.5">
                    {challenge.afterPassing.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                            <Check className="w-3.5 h-3.5 text-slate-600 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Button */}
            <div className="mt-auto">
                <Link
                    href={`${challenge.buttonLink}&pass=${passType}`}
                    className="block w-full text-center py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-[#5B4DC7] to-[#7B6DD7] hover:from-[#4B3DB7] hover:to-[#6B5DC7] shadow-md transition-all text-sm"
                >
                    {challenge.buttonText}
                </Link>
            </div>
        </div>
    </div>
);

const ChallengeTypes = () => {
    return (
        <section className="relative">
            {/* Dark Background Section */}
            <div
                className="relative py-10 sm:py-16 overflow-hidden"
                style={{
                    background: "linear-gradient(180deg, #0a0e27 0%, #0d1230 50%, #1a1f4e 100%)",
                }}
            >
                {/* Background Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                        `,
                        backgroundSize: "40px 40px",
                    }}
                />

                {/* Glow Effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full" />
                    <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-purple-600/10 blur-[150px] rounded-full" />
                </div>

                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    {/* Main Header */}
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
                            Choose Your Prop Firm Challenge Type
                        </h2>
                        <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2">
                            Choose between Standard Pass or Guaranteed<br className="hidden sm:block" />
                            <span className="sm:hidden"> </span>Pass with full refund protection
                        </p>
                    </div>

                    {/* Standard Pass Section */}
                    <div className="mb-10 sm:mb-16">
                        <div className="text-center mb-6 sm:mb-8">
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">
                                Standard Pass
                            </h3>
                            <p className="text-slate-400 text-sm sm:text-base">
                                Professional evaluation passing service
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
                            {challengeTypes.map((challenge, index) => (
                                <ChallengeCard key={index} challenge={challenge} passType="standard" />
                            ))}
                        </div>
                    </div>

                    {/* Guaranteed Pass Section */}
                    <div>
                        <div className="text-center mb-6 sm:mb-8">
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">
                                Guaranteed Pass
                            </h3>
                            <p className="text-slate-400 text-sm sm:text-base">
                                Full refund if we don&apos;t pass your evaluation
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
                            {challengeTypes.map((challenge, index) => (
                                <ChallengeCard key={index} challenge={challenge} passType="guaranteed" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChallengeTypes;
