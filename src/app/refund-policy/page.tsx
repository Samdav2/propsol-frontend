import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function RefundPolicyPage() {
    return (
        <main className="min-h-screen bg-white overflow-x-hidden">
            <Header />

            <div className="pt-32 pb-20 lg:pt-48 lg:pb-32 container mx-auto px-4">
                {/* Page Title & Intro */}
                <div className="max-w-3xl mx-auto text-center mb-20">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-8">
                        Refund Policy
                    </h1>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Last updated: 29 January 2026
                    </p>
                    <p className="text-lg text-slate-600 leading-relaxed mt-4">
                        Refund Policy applies strictly according to service type.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-24 relative">
                    {/* Left Column: Text Content */}
                    <div className="w-full lg:w-1/2 space-y-16 relative z-10">

                        {/* Standard Pass */}
                        <section>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                                Standard Pass
                            </h2>
                            <p className="text-slate-600 mb-4">
                                All payments are final. No refunds or compensation apply.
                            </p>
                        </section>

                        {/* Guaranteed Pass */}
                        <section>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                                Guaranteed Pass
                            </h2>
                            <p className="text-slate-600 mb-4">
                                If PropFirmSol fails to pass the selected challenge:
                            </p>
                            <ul className="space-y-2 text-slate-600 list-disc pl-5 mb-4">
                                <li>100% service fee refund</li>
                                <li>Refund of amount used to purchase the prop firm account</li>
                                <li>$100 compensation</li>
                            </ul>
                        </section>

                        {/* Conditions & Processing */}
                        <section>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                                Conditions & Processing
                            </h2>
                            <p className="text-slate-600 mb-4">
                                Refunds do not apply if failure results from client interference, rule violations, or prop firm changes.
                            </p>
                            <p className="text-slate-600">
                                Refunds are processed within 7–14 business days after verification.
                            </p>
                        </section>

                    </div>

                    {/* Right Column: Decorative Images */}
                    <div className="hidden lg:block w-1/2 relative">
                        <div className="sticky top-0 h-screen flex flex-col justify-center">
                            {/* Coil Image - Centered vertically, shifted up */}
                            <div className="absolute top-1/2 -translate-y-[140%] lg:-right-10 xl:-right-32 lg:w-[370px] lg:h-[270px] xl:w-[530px] xl:h-[530px] animate-float-delayed">
                                <Image
                                    src="/assets/coil_v2.png"
                                    alt="Decorative Coil"
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            {/* Star Image - Centered vertically, shifted down */}
                            <div className="absolute top-1/2 translate-y-[0%] lg:-right-10 xl:-right-32 lg:w-[370px] lg:h-[370px] xl:w-[530px] xl:h-[530px] animate-float">
                                <Image
                                    src="/assets/star.png"
                                    alt="Decorative Star"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
