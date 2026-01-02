"use client";

import Link from "next/link";
import { Shield, Check, Calendar } from "lucide-react";

const guaranteeItems = [
    "Service fee refunded",
    "Challenge fee handled according to agreed terms",
    "$100 compensation paid",
];

const GuaranteeSection = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-[#1a1f4e] to-[#0a0e27]">
            <div className="container mx-auto px-4 sm:px-6">
                {/* Guarantee Box */}
                <div className="max-w-2xl mx-auto mb-16">
                    <div className="bg-gradient-to-br from-purple-900/50 to-slate-900/50 rounded-2xl p-8 border border-purple-500/30 backdrop-blur-sm">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <Shield className="w-8 h-8 text-purple-400" />
                            <h2 className="text-2xl sm:text-3xl font-bold text-white">Our Guarantee</h2>
                        </div>

                        <p className="text-center text-slate-300 mb-8">
                            If we fail to pass your selected challenge:
                        </p>

                        <div className="space-y-4 mb-8">
                            {guaranteeItems.map((item, index) => (
                                <div key={index} className="flex items-center gap-3 justify-center">
                                    <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                                        <Check className="w-4 h-4 text-green-400" />
                                    </div>
                                    <span className="text-white font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        <p className="text-center text-slate-400 text-sm">
                            Slots are capped monthly to protect success rate.
                        </p>
                    </div>
                </div>

                {/* Support CTA */}
                <div className="text-center">
                    <p className="text-slate-300 text-lg mb-6">
                        Not sure which option fits your challenge?
                    </p>
                    <Link
                        href="/support"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all shadow-xl shadow-purple-600/25"
                    >
                        <Calendar className="w-5 h-5" />
                        Book a 10-Minute Support Call
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default GuaranteeSection;
