"use client";

import Link from "next/link";
import { Check, ThumbsUp } from "lucide-react";

// Pricing data for different account sizes
const pricingTiers = {
    guaranteed: {
        step1Only: [
            { account: "$50k Account", price: "$800" },
            { account: "$100k Account", price: "$1,200" },
            { account: "$200k Account", price: "$1,700" },
            { account: "$500k Account", price: "$2,500" },
        ],
        fullTwoStep: [
            { account: "$50k Account", price: "$1,100" },
            { account: "$100k Account", price: "$1,600" },
            { account: "$200k Account", price: "$2,200" },
            { account: "$500k Account", price: "$3,200" },
        ],
        oneStep: [
            { account: "$50k Account", price: "$1,400" },
            { account: "$100k Account", price: "$1,900" },
            { account: "$200k Account", price: "$2,600" },
            { account: "$500k Account", price: "$3,800" },
        ],
    },
    standard: {
        step1Only: [
            { account: "$50k Account", price: "$490" },
            { account: "$100k Account", price: "$690" },
            { account: "$200k Account", price: "$990" },
            { account: "$500k Account", price: "$1,390" },
        ],
        fullTwoStep: [
            { account: "$50k Account", price: "$690" },
            { account: "$100k Account", price: "$890" },
            { account: "$200k Account", price: "$1,290" },
            { account: "$500k Account", price: "$1,790" },
        ],
        oneStep: [
            { account: "$50k Account", price: "$1,400" },
            { account: "$100k Account", price: "$1,900" },
            { account: "$200k Account", price: "$2,600" },
            { account: "$500k Account", price: "$3,800" },
        ],
    },
};

const challengeTypes = [
    {
        id: "step1Only",
        title: "2-Step Challenge —",
        subtitle: "Step 1 Pass Only",
        description: "Best for traders who want help clearing the first stage",
        details: "We handle Step 1 only. After passing, control is returned to you.",
        afterPassingTitle: "What happens after Step 1",
        afterPassing: [
            "You may continue Step 2 yourself",
            "Or upgrade later to full completion",
        ],
        buttonText: "Select Step 1 Pass",
        buttonLink: "/signup?type=step1",
        featured: false,
    },
    {
        id: "fullTwoStep",
        title: "2-Step Challenge —",
        subtitle: "Full (Step 1 + Step 2)",
        badge: "MOST CHOSEN",
        description: "Best for traders who want the entire challenge completed.",
        details: "We complete both Step 1 and Step 2, then return the passed account to you.",
        afterPassingTitle: "After passing",
        afterPassing: [
            "Optional access to the PropSol Trading System for funded trading support",
        ],
        buttonText: "Select Full 2-Step Completion",
        buttonLink: "/signup?type=full",
        featured: true,
    },
    {
        id: "oneStep",
        title: "1-Step Challenge —",
        subtitle: "Full",
        description: "Best for firms with single-phase challenges.",
        details: "We complete the entire 1-Step challenge in one structured phase.",
        afterPassingTitle: "After passing",
        afterPassing: [
            "Funded account returned to you",
            "Optional access to the PropSol Trading System",
        ],
        buttonText: "Select 1-Step Completion",
        buttonLink: "/signup?type=1step",
        featured: false,
    },
];

interface PricingCardProps {
    challenge: typeof challengeTypes[0];
    pricing: { account: string; price: string }[];
}

const PricingCard = ({ challenge, pricing }: PricingCardProps) => {
    // Determine styles based on featured status
    // Featured (Middle) card is Dark Purple (#2D2460)
    // Other cards are Light Lavender (#E0D4FC)

    const isFeatured = challenge.featured;

    const cardBgClass = isFeatured ? "bg-[#2D2460]" : "bg-[#E0D4FC]";
    const borderClass = isFeatured ? "border border-[#4B3DB7]" : "border-none";

    // Text colors
    const titleColor = isFeatured ? "text-white" : "text-[#2D2460]";
    const subtitleColor = isFeatured ? "text-slate-200" : "text-[#4B3DB7]";
    const descColor = isFeatured ? "text-slate-300" : "text-slate-700";
    const detailsColor = isFeatured ? "text-slate-400" : "text-slate-600";
    const labelColor = isFeatured ? "text-slate-300" : "text-[#2D2460]";
    const checkColor = isFeatured ? "text-slate-300" : "text-[#4B3DB7]";

    // Price pill styles
    // On featured (dark) card: White pill with dark text
    // On regular (light) card: Purple pill with white text
    const pricePillClass = isFeatured
        ? "bg-white text-[#2D2460]"
        : "bg-[#4B3DB7] text-white";

    return (
        <div
            className={`relative flex flex-col rounded-lg overflow-hidden transition-all h-full ${cardBgClass} ${borderClass}`}
        >
            {isFeatured && (
                <div className="absolute -top-0 left-1/2 -translate-x-1/2 bg-[#5B4DC7] text-white text-[10px] font-bold px-3 py-1 rounded-b-lg flex items-center gap-1 shadow-sm uppercase tracking-wider whitespace-nowrap z-20">
                    MOST CHOSEN
                    <ThumbsUp className="w-3 h-3 fill-white" />
                </div>
            )}

            <div className="p-6 flex-1 flex flex-col">
                {/* Header */}
                <div className="mb-4 mt-2">
                    <h3 className={`text-lg font-bold ${titleColor} flex items-center gap-2`}>
                        {challenge.title}
                    </h3>
                    <p className={`text-sm font-medium ${subtitleColor}`}>
                        {challenge.subtitle}
                    </p>
                </div>

                {/* Description */}
                <p className={`text-xs mb-3 leading-relaxed ${descColor}`}>
                    {challenge.description}
                </p>
                <p className={`text-xs mb-6 leading-relaxed ${detailsColor}`}>
                    {challenge.details}
                </p>

                {/* Pricing Table */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-3 border-b border-slate-500/20 pb-2">
                        <p className={`font-bold text-[10px] uppercase tracking-wider ${labelColor}`}>
                            ACCOUNT
                        </p>
                        <p className={`font-bold text-[10px] uppercase tracking-wider ${labelColor}`}>
                            PRICING
                        </p>
                    </div>
                    <div className="space-y-2">
                        {pricing.map((tier, i) => (
                            <div
                                key={i}
                                className={`flex justify-between items-center text-xs font-medium ${isFeatured ? "text-slate-200" : "text-[#2D2460]"
                                    }`}
                            >
                                <span>{tier.account}</span>
                                <span className={`font-bold px-2 py-0.5 rounded text-[11px] min-w-[60px] text-center ${pricePillClass}`}>
                                    {tier.price}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* After Passing */}
                <div className="mb-6">
                    <p className={`font-bold text-xs mb-3 ${titleColor}`}>
                        {challenge.afterPassingTitle}
                    </p>
                    <div className="space-y-2">
                        {challenge.afterPassing.map((item, i) => (
                            <div
                                key={i}
                                className={`flex items-start gap-2 text-xs ${descColor}`}
                            >
                                <Check className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${checkColor}`} />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Button */}
                <div className="mt-auto">
                    <Link
                        href={`${challenge.buttonLink}`}
                        className="block w-full text-center py-3 rounded font-bold text-white bg-[#4B3DB7] hover:bg-[#3A2E96] transition-all text-xs shadow-lg shadow-indigo-900/20"
                    >
                        {challenge.buttonText}
                    </Link>
                </div>
            </div>
        </div>
    );
};

const ChallengeTypes = () => {
    return (
        <section id="pricing" className="relative scroll-mt-20">
            {/* Dark Background Section */}
            <div
                className="relative py-10 sm:py-16 overflow-hidden bg-[#050A24]"
            >
                {/* Background Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-20"
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
                    <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full" />
                </div>

                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    {/* Main Header */}
                    <div className="text-center mb-10 sm:mb-14">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                            Choose Your Prop Firm Challenge Type
                        </h2>
                        <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
                            Choose between Standard Pass or Guaranteed<br className="hidden sm:block" />
                            <span className="sm:hidden"> </span>Pass with full refund protection
                        </p>
                    </div>

                    {/* Guaranteed Pass Section */}
                    <div className="mb-12 max-w-6xl mx-auto">
                        <div className="relative bg-[#0A1033]/80 border border-slate-700/50 rounded-3xl p-6 sm:p-10 backdrop-blur-sm">
                            {/* Section Header */}
                            <div className="text-center mb-8">
                                <div className="flex items-center justify-center gap-3 mb-2">
                                    <h3 className="text-2xl sm:text-3xl font-bold text-white">
                                        Guaranteed Pass
                                    </h3>
                                    <span className="bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                        Most Popular
                                    </span>
                                </div>
                                <p className="text-slate-400 text-sm sm:text-base">
                                    Full refund if we don&apos;t pass your evaluation
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {challengeTypes.map((challenge, index) => (
                                    <PricingCard
                                        key={index}
                                        challenge={challenge}
                                        pricing={pricingTiers.guaranteed[challenge.id as keyof typeof pricingTiers.guaranteed]}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Standard Pass Section */}
                    <div className="max-w-6xl mx-auto">
                        <div className="relative bg-[#0A1033]/80 border border-slate-700/50 rounded-3xl p-6 sm:p-10 backdrop-blur-sm">
                            {/* Section Header */}
                            <div className="text-center mb-8">
                                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                                    Standard Pass
                                </h3>
                                <p className="text-slate-400 text-sm sm:text-base">
                                    Professional evaluation passing service - No Refund Guarantee
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {challengeTypes.map((challenge, index) => (
                                    <PricingCard
                                        key={index}
                                        challenge={challenge}
                                        pricing={pricingTiers.standard[challenge.id as keyof typeof pricingTiers.standard]}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChallengeTypes;
