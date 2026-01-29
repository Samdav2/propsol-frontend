"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ChevronDown } from "lucide-react";

interface FAQItemProps {
    question: string;
    answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 transition-all duration-200 hover:shadow-md">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between gap-4 text-left"
            >
                <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${isOpen ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600"}`}>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">{question}</h3>
                </div>
            </button>
            <div
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"
                    }`}
            >
                <div className="overflow-hidden">
                    <p className="text-slate-600 leading-relaxed pl-[56px] whitespace-pre-line">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default function FAQPage() {
    const faqs = [
        {
            question: "What is PropSol?",
            answer: "PropSol is a prop firm challenge assistance service. We help traders pass proprietary trading firm challenges under strict rule-compliant execution frameworks. We are not a broker, not a prop firm, and we do not provide investment advice."
        },
        {
            question: "Are you affiliated with any prop firm?",
            answer: "No. PropSol is not affiliated, partnered, endorsed, or sponsored by FTMO, FundedNext, FundingPips, or any proprietary trading firm."
        },
        {
            question: "Do you guarantee profits?",
            answer: "No. PropSol does not guarantee profits, payouts, or funded account earnings. Our service is limited strictly to challenge completion assistance."
        },
        {
            question: "What challenges do you support?",
            answer: "We support:\n- 2-Step Challenge — Step 1 Pass Only\n- 2-Step Challenge — Full (Step 1 + Step 2)\n- 1-Step Challenge — Full"
        },
        {
            question: "How long does it take to pass a challenge?",
            answer: "Typical completion time is 30–60 trading days, depending on challenge rules, account size, and market conditions."
        },
        {
            question: "Will I be able to monitor the account?",
            answer: "Yes. You may monitor the account at any time during the passing phase. Clients must not place trades or interfere while the service is active."
        },
        {
            question: "Can I trade on the account while you are working on it?",
            answer: "No. Any client interference—including placing trades, changing passwords, or modifying settings—voids the service and any guarantee."
        },
        {
            question: "What is the Standard Pass?",
            answer: "Standard Pass includes professional challenge execution only.\nNo refunds.\nNo compensation.\nNo challenge fee reimbursement."
        },
        {
            question: "What is the Guaranteed Pass?",
            answer: "If PropSol fails to pass your selected challenge:\n- 100% service fee refunded\n- Refund of amount used to purchase the prop firm account\n- Additional $100 compensation"
        },
        {
            question: "What happens after my account is passed?",
            answer: "Once the challenge is successfully passed:\n- Account access is returned to you\n- You receive the fully passed account\n- Optional access to the PropSol Trading System may be provided"
        },
        {
            question: "What is the PropSol Trading System?",
            answer: "The PropSol Trading System is a structured framework designed to assist risk management, execution discipline, and trade monitoring. It does not guarantee profits."
        },
        {
            question: "When do refunds not apply?",
            answer: "Refunds will not be issued if failure results from:\n- Client interference\n- Password changes\n- Withdrawals\n- Prop firm rule violations by the client\n- Account condition changes\n- Prop firm policy updates"
        },
        {
            question: "How long do refunds take?",
            answer: "Refunds are processed within 7–14 business days after verification."
        },
        {
            question: "Is this service legal?",
            answer: "Yes. PropSol provides challenge assistance only. We do not accept investor funds or provide brokerage or investment advisory services."
        },
        {
            question: "Can my prop firm ban the account?",
            answer: "Prop firms operate independently. Final approval remains at the sole discretion of the prop firm."
        },
        {
            question: "How do I contact support?",
            answer: "Email: Hello@propfirmsol.com\nWebsite: www.propfirmsol.com"
        }
    ];

    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 container mx-auto px-4 bg-white">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    <div className="w-full lg:w-1/2">
                        <h1 className="text-6xl font-bold text-slate-900 mb-6">FAQ</h1>
                        <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                            We've answered the most common questions to help you understand how our service works <br className="lg:hidden" /> <span className="font-bold text-slate-900">— from start to finish.</span>
                        </p>
                        <p className="text-sm text-slate-500 mt-4">Last updated: 29 January 2026</p>
                    </div>
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                        <div className="relative w-[200px] h-[200px] lg:w-[400px] lg:h-[400px]">
                            <Image
                                src="/assets/faq_logo.png"
                                alt="FAQ"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ List Section */}
            <section className="py-20 bg-[#FDFDFF] relative overflow-hidden">
                <div className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 w-[55%] h-full overflow-hidden pointer-events-none z-0">
                    <Image
                        src="/assets/faq_bg_overlay.png"
                        alt="Background Decoration"
                        fill
                        className="object-cover object-center opacity-100"
                    />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-3 block">FAQ</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                            Any Questions? Look Here
                        </h2>
                        <p className="text-slate-600 mt-4">
                            We've answered the most common questions to help you understand how our service works
                        </p>
                    </div>

                    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6 items-start">
                        {/* Left Column */}
                        <div className="space-y-6">
                            {faqs.slice(0, Math.ceil(faqs.length / 2)).map((faq, index) => (
                                <FAQItem key={index} question={faq.question} answer={faq.answer} />
                            ))}
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {faqs.slice(Math.ceil(faqs.length / 2)).map((faq, index) => (
                                <FAQItem key={index} question={faq.question} answer={faq.answer} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
