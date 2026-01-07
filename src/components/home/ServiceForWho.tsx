"use client";

import { Check, X } from "lucide-react";

const forYou = [
    "You want capital without emotional trading",
    "You respect risk rules",
    "You prefer certainty over gambling",
];

const notForYou = [
    "You want instant results",
    "You panic during drawdown",
    "You don't trust structured systems",
];

const ServiceForWho = () => {
    return (
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#1a1f4e] to-[#0d1230]">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                        Who This Service Is (And Isn&apos;t) For
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
                    {/* For You */}
                    <div className="bg-slate-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-700/50 backdrop-blur-sm">
                        <h3 className="text-base sm:text-lg font-bold text-green-400 mb-4 sm:mb-6 flex items-center gap-2">
                            <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                            This is for you if...
                        </h3>
                        <div className="space-y-3 sm:space-y-4">
                            {forYou.map((item, index) => (
                                <div key={index} className="flex items-center gap-2 sm:gap-3">
                                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-400" />
                                    </div>
                                    <span className="text-slate-300 text-sm sm:text-base">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Not For You */}
                    <div className="bg-slate-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-700/50 backdrop-blur-sm">
                        <h3 className="text-base sm:text-lg font-bold text-red-400 mb-4 sm:mb-6 flex items-center gap-2">
                            <X className="w-4 h-4 sm:w-5 sm:h-5" />
                            This is NOT for you if...
                        </h3>
                        <div className="space-y-3 sm:space-y-4">
                            {notForYou.map((item, index) => (
                                <div key={index} className="flex items-center gap-2 sm:gap-3">
                                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <X className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-400" />
                                    </div>
                                    <span className="text-slate-300 text-sm sm:text-base">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceForWho;
