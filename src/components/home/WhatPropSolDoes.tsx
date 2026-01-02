"use client";

import { CheckCircle2, Check } from "lucide-react";
import Image from "next/image";

const benefits = [
    {
        title: "Guarantee Safety",
        description: "All accounts are managed strictly within prop firm rules.",
    },
    {
        title: "Fully Rule Compliant Trading",
        description: "Daily loss, max drawdown, and consistency rules fully respected.",
    },
    {
        title: "Timely Completion",
        description: "Phases are completed within 20-40 Trading Days, minimizing risk.",
    },
    {
        title: "Zero-Risk Guarantee",
        description: "If we fail to pass your challenge:\n• You get a full refund of your service fee\n• Your challenge fee is refunded\n• You receive $100 compensation for time wasted",
    },
];

const afterPassing = [
    "After your prop firm challenge is successfully passed,",
    "You gain access to the PropSol Trading System – a structured execution and risk management network, designed to support disciplined trading funded accounts.",
];

const WhatPropSolDoes = () => {
    return (
        <section className="py-20 bg-slate-50 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Left Column - What PropSol Does */}
                    <div className="flex-1">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-10">
                            What PropSol Actually Does
                        </h2>
                        <div className="space-y-8">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <CheckCircle2 className="w-8 h-8 text-blue-600 fill-blue-100" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">{benefit.title}</h3>
                                        <div className="text-slate-600 text-base leading-relaxed whitespace-pre-line">
                                            {benefit.description}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Image + What Happens After */}
                    <div className="flex-1 w-full">
                        {/* Monitor/Phone Image */}
                        <div className="relative w-full aspect-[16/10] mb-10">
                            <Image
                                src="/assets/monitor_phone_dashboard.png"
                                alt="PropSol Trading Dashboard on Monitor and Phone"
                                fill
                                className="object-contain"
                            />
                        </div>

                        {/* What Happens After Section */}
                        <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                            <h3 className="text-2xl font-bold text-slate-900 mb-6">
                                What Happens After Your Account Is Passed
                            </h3>
                            <div className="space-y-4">
                                {afterPassing.map((item, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="flex-shrink-0 mt-1">
                                            <Check className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <p className="text-slate-700 text-base leading-relaxed font-medium">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhatPropSolDoes;
