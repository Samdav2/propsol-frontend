"use client";

import { Ban, DollarSign, BarChart3, RefreshCw } from "lucide-react";

const reasons = [
    {
        icon: Ban,
        title: "Emotional",
        subtitle: "overtrading",
        color: "text-red-500",
        bgColor: "bg-red-50",
        iconBg: "bg-red-100",
        borderColor: "border-red-200",
    },
    {
        icon: DollarSign,
        title: "Breaking daily",
        subtitle: "drawdown rules",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        iconBg: "bg-yellow-100",
        borderColor: "border-yellow-200",
    },
    {
        icon: BarChart3,
        title: "Inconsistent",
        subtitle: "risk management",
        color: "text-blue-500",
        bgColor: "bg-blue-50",
        iconBg: "bg-blue-100",
        borderColor: "border-blue-200",
    },
    {
        icon: RefreshCw,
        title: "Revenge trades",
        subtitle: "after losses",
        color: "text-cyan-500",
        bgColor: "bg-cyan-50",
        iconBg: "bg-cyan-100",
        borderColor: "border-cyan-200",
    },
];

const WhyTradersFail = () => {
    return (
        <section className="py-12 sm:py-16 bg-[#e0eaf8]">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center mb-8 sm:mb-10">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
                        Why Most Traders Fail Prop Firm Challenge
                    </h2>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto mb-8 sm:mb-10">
                    {reasons.map((reason, index) => {
                        const Icon = reason.icon;
                        return (
                            <div
                                key={index}
                                className={`flex flex-col items-center justify-center p-4 sm:p-6 rounded-xl border ${reason.borderColor} ${reason.bgColor} transition-transform hover:-translate-y-1 min-h-[120px] sm:min-h-[140px]`}
                            >
                                <div className={`w-10 h-10 sm:w-12 sm:h-12 ${reason.iconBg} rounded-full flex items-center justify-center mb-2 sm:mb-3`}>
                                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${reason.color}`} />
                                </div>
                                <h3 className="text-slate-800 font-bold text-xs sm:text-sm md:text-base text-center leading-tight">
                                    {reason.title}
                                </h3>
                                <p className="text-slate-500 text-[10px] sm:text-xs md:text-sm text-center">
                                    {reason.subtitle}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <p className="text-center text-slate-500 text-xs sm:text-sm md:text-base max-w-3xl mx-auto italic px-2">
                    Excessive emotion and lack of risk discipline lead to failure despite good strategy.
                    <br className="hidden sm:block" />
                    <span className="sm:hidden"> </span>
                    PropSol manages execution professionally, minimizing these.
                </p>
            </div>
        </section>
    );
};

export default WhyTradersFail;
