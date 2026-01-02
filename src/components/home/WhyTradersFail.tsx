"use client";

import { Thermometer, Clock, BarChart3, Layers } from "lucide-react";

const reasons = [
    {
        icon: Thermometer,
        title: "Emotional overtrading",
        color: "text-red-500",
        bgColor: "bg-red-50",
        iconBg: "bg-red-100",
        borderColor: "border-red-100",
    },
    {
        icon: Clock,
        title: "Breaking daily drawdown rules",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        iconBg: "bg-yellow-100",
        borderColor: "border-yellow-100",
    },
    {
        icon: BarChart3,
        title: "Inconsistent risk management",
        color: "text-blue-500",
        bgColor: "bg-blue-50",
        iconBg: "bg-blue-100",
        borderColor: "border-blue-100",
    },
    {
        icon: Layers,
        title: "Revenge trades after losses",
        color: "text-emerald-600",
        bgColor: "bg-emerald-50",
        iconBg: "bg-emerald-100",
        borderColor: "border-emerald-100",
    },
];

const WhyTradersFail = () => {
    return (
        <section className="py-12 bg-[#f8faff]">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center mb-8">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">
                        Why Most Traders Fail Prop Firm Challenges
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                    {reasons.map((reason, index) => {
                        const Icon = reason.icon;
                        return (
                            <div
                                key={index}
                                className={`flex items-center p-4 rounded-xl border ${reason.borderColor} ${reason.bgColor} transition-transform hover:-translate-y-1`}
                            >
                                <div className={`flex-shrink-0 w-10 h-10 ${reason.iconBg} rounded-lg flex items-center justify-center mr-3`}>
                                    <Icon className={`w-5 h-5 ${reason.color}`} />
                                </div>
                                <h3 className="text-slate-700 font-bold text-sm leading-tight">
                                    {reason.title}
                                </h3>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WhyTradersFail;
