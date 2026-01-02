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
        <section className="py-20 bg-gradient-to-b from-[#1a1f4e] to-[#0d1230]">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                        Who This Service Is (And Isn&apos;t) For
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* For You */}
                    <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm">
                        <h3 className="text-lg font-bold text-green-400 mb-6 flex items-center gap-2">
                            <Check className="w-5 h-5" />
                            This is for you if...
                        </h3>
                        <div className="space-y-4">
                            {forYou.map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Check className="w-3 h-3 text-green-400" />
                                    </div>
                                    <span className="text-slate-300">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Not For You */}
                    <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm">
                        <h3 className="text-lg font-bold text-red-400 mb-6 flex items-center gap-2">
                            <X className="w-5 h-5" />
                            This is NOT for you if...
                        </h3>
                        <div className="space-y-4">
                            {notForYou.map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="w-5 h-5 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <X className="w-3 h-3 text-red-400" />
                                    </div>
                                    <span className="text-slate-300">{item}</span>
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
