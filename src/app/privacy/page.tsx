import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-white overflow-x-hidden">
            <Header />

            <div className="pt-32 pb-20 lg:pt-48 lg:pb-32 container mx-auto px-4">
                {/* Page Title & Intro */}
                <div className="max-w-3xl mx-auto text-center mb-20">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-8">
                        Privacy Policy
                    </h1>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        At PropSol, we value your privacy. This policy outlines how we collect, use, and protect your personal information.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-24 relative">
                    {/* Left Column: Text Content */}
                    <div className="w-full lg:w-1/2 space-y-16 relative z-10">

                        {/* 1. Introduction */}
                        <section>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                                1. Introduction
                            </h2>
                            <p className="text-slate-600 mb-4">
                                These Terms and Conditions ("Agreement") govern the use of services provided by PropSol ("Company," "we," "us," or "our").
                            </p>
                            <p className="text-slate-600 mb-4">
                                By accessing our website or purchasing any service offered by PropSol, you ("Client," "you," or "your") agree to be bound by these Terms and Conditions.
                            </p>
                            <p className="text-slate-600">
                                If you do not agree with any part of this Agreement, you must not use our services.
                            </p>
                        </section>

                        {/* 2. Nature of Service */}
                        <section>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                                2. Nature of Service
                            </h2>
                            <p className="text-slate-600 mb-4">PropSol provides prop firm challenge assistance services.</p>
                            <p className="text-slate-600 mb-2">We do not:</p>
                            <ul className="space-y-2 text-slate-600 list-disc pl-5 mb-4">
                                <li>Operate as a broker</li>
                                <li>Provide investment advisory services</li>
                                <li>Manage client funds</li>
                                <li>Accept deposits for trading</li>
                                <li>Guarantee profits</li>
                            </ul>
                            <p className="text-slate-600">
                                Our service is strictly limited to assisting clients with prop firm challenge completion under agreed conditions.
                            </p>
                        </section>

                        {/* 3. No Affiliation With Prop Firms */}
                        <section>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                                3. No Affiliation With Prop Firms
                            </h2>
                            <p className="text-slate-600 mb-4">
                                PropSol is not affiliated, partnered, endorsed, or sponsored by any proprietary trading firm, including but not limited to FTMO, FundedNext, FundingPips, or any other prop firm.
                            </p>
                            <p className="text-slate-600 mb-4">
                                All prop firms are independent third-party entities with their own rules and approval processes.
                            </p>
                            <p className="text-slate-600">
                                Final account approval remains solely at the discretion of the respective prop firm.
                            </p>
                        </section>

                        {/* 4. Client Responsibilities */}
                        <section>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                                4. Client Responsibilities
                            </h2>
                            <p className="text-slate-600 mb-4">By purchasing any PropSol service, you confirm that:</p>
                            <ul className="space-y-2 text-slate-600 list-disc pl-5 mb-4">
                                <li>You are the lawful owner of the prop firm account</li>
                                <li>You have legal authority to provide login credentials</li>
                                <li>You understand prop firm rules and objectives</li>
                                <li>You accept all risks associated with proprietary trading challenges</li>
                            </ul>
                            <p className="text-slate-600">
                                You are responsible for ensuring that your prop firm account is valid and complies with the firm’s terms.
                            </p>
                        </section>

                        {/* 5. Service Types */}
                        <section>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                                5. Service Types
                            </h2>
                            <p className="text-slate-600 mb-4">PropSol offers two service categories:</p>

                            <h3 className="text-xl font-semibold text-slate-900 mb-3">5.1 Standard Pass</h3>
                            <p className="text-slate-600 mb-2">The Standard Pass is a non-refundable service.</p>
                            <p className="text-slate-600 mb-2">Includes:</p>
                            <ul className="space-y-1 text-slate-600 list-disc pl-5 mb-4">
                                <li>Challenge execution assistance</li>
                                <li>Rule-compliant trading framework</li>
                                <li>Support communication</li>
                            </ul>
                            <p className="text-slate-600 mb-2">Important:</p>
                            <ul className="space-y-1 text-slate-600 list-disc pl-5 mb-4">
                                <li>No refunds under any circumstance</li>
                                <li>No compensation</li>
                                <li>No challenge fee reimbursement</li>
                            </ul>
                            <p className="text-slate-600 mb-6">If the challenge fails for any reason, the service is considered completed.</p>

                            <h3 className="text-xl font-semibold text-slate-900 mb-3">5.2 Guaranteed Pass</h3>
                            <p className="text-slate-600 mb-4">The Guaranteed Pass includes a conditional refund policy.</p>
                            <p className="text-slate-600 mb-2">If PropSol fails to pass the challenge under agreed conditions, you are eligible for:</p>
                            <ul className="space-y-1 text-slate-600 list-disc pl-5 mb-4">
                                <li>100% refund of the PropSol service fee</li>
                                <li>Refund of the amount used to purchase the prop firm account</li>
                                <li>Additional $100 compensation</li>
                            </ul>
                            <p className="text-slate-600 mb-2">Refund eligibility applies only if:</p>
                            <ul className="space-y-1 text-slate-600 list-disc pl-5 mb-4">
                                <li>No interference occurs on the account</li>
                                <li>Login credentials remain unchanged</li>
                                <li>No external trades are placed by the client</li>
                                <li>Prop firm rules are not modified mid-challenge</li>
                            </ul>
                            <p className="text-slate-600">Guaranteed Pass slots are limited monthly.</p>
                        </section>

                        {/* 6. Challenge Types Covered */}
                        <section>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                                6. Challenge Types Covered
                            </h2>
                            <p className="text-slate-600 mb-2">PropSol supports:</p>
                            <ul className="space-y-2 text-slate-600 list-disc pl-5 mb-4">
                                <li>2-Step Challenge - Step 1 Pass Only</li>
                                <li>2-Step Challenge - Full (Step 1 + Step 2)</li>
                                <li>1-Step Challenge - Full</li>
                            </ul>
                            <p className="text-slate-600">Service scope applies only to the selected challenge type purchased.</p>
                        </section>

                        {/* 7. Trading Methodology Disclosure */}
                        <section>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                                7. Trading Methodology Disclosure
                            </h2>
                            <p className="text-slate-600 mb-2">PropSol utilizes a structured trading framework that may include:</p>
                            <ul className="space-y-2 text-slate-600 list-disc pl-5 mb-4">
                                <li>Risk-management automation</li>
                                <li>Execution discipline systems</li>
                                <li>Monitoring and performance tools</li>
                            </ul>
                            <p className="text-slate-600 mb-4">The PropSol Trading System is designed to assist execution and risk control.</p>
                            <p className="text-slate-600">It does not guarantee profitability or future earnings.</p>
                        </section>

                        {/* 8. After Passing the Challenge */}
                        <section>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                                8. After Passing the Challenge
                            </h2>
                            <p className="text-slate-600 mb-2">Once a challenge is passed:</p>
                            <ul className="space-y-2 text-slate-600 list-disc pl-5 mb-4">
                                <li>Account access is returned to the client</li>
                                <li>Optional access to the PropSol Trading System may be granted</li>
                                <li>Ongoing funded trading performance remains the client’s responsibility</li>
                            </ul>
                            <p className="text-slate-600">PropSol does not guarantee funded account profits or payouts.</p>
                        </section>

                        {/* 9. Refund Conditions (Guaranteed Pass Only) */}
                        <section>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                                9. Refund Conditions (Guaranteed Pass Only)
                            </h2>
                            <p className="text-slate-600 mb-2">Refunds apply only if PropSol fails to pass the challenge.</p>
                            <p className="text-slate-600 mb-2">Refunds will not be issued if failure results from:</p>
                            <ul className="space-y-2 text-slate-600 list-disc pl-5 mb-4">
                                <li>Client interference</li>
                                <li>Password changes</li>
                                <li>Withdrawal attempts</li>
                                <li>Breach of prop firm rules by the client</li>
                                <li>Modified account conditions</li>
                                <li>Prop firm policy changes beyond our control</li>
                            </ul>
                            <p className="text-slate-600">Refund processing time: 7-14 business days after verification.</p>
                        </section>

                        {/* 10. No Profit Guarantee */}
                        <section>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                                10. No Profit Guarantee
                            </h2>
                            <p className="text-slate-600 mb-2">PropSol does not guarantee:</p>
                            <ul className="space-y-2 text-slate-600 list-disc pl-5 mb-4">
                                <li>Trading profits</li>
                                <li>Funded account income</li>
                                <li>Payout approval</li>
                                <li>Long-term account sustainability</li>
                            </ul>
                            <p className="text-slate-600">Our responsibility ends at challenge completion.</p>
                        </section>

                        {/* 11. Limitation of Liability */}
                        <section>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                                11. Limitation of Liability
                            </h2>
                            <p className="text-slate-600 mb-2">PropSol shall not be liable for:</p>
                            <ul className="space-y-2 text-slate-600 list-disc pl-5 mb-4">
                                <li>Loss of profits</li>
                                <li>Lost trading opportunities</li>
                                <li>Prop firm account termination</li>
                                <li>Rule changes by prop firms</li>
                                <li>Delayed evaluations</li>
                                <li>Platform outages</li>
                            </ul>
                            <p className="text-slate-600">Maximum liability is limited to the amount paid for the service.</p>
                        </section>

                        {/* 12. Prohibited Activities */}
                        <section>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                                12. Prohibited Activities
                            </h2>
                            <p className="text-slate-600 mb-2">Clients may not:</p>
                            <ul className="space-y-2 text-slate-600 list-disc pl-5 mb-4">
                                <li>Copy or resell PropSol services</li>
                                <li>Reverse engineer strategies</li>
                                <li>Provide false information</li>
                                <li>Use stolen or unauthorized accounts</li>
                                <li>Interfere with active challenge execution</li>
                            </ul>
                            <p className="text-slate-600">Violation results in immediate termination without refund.</p>
                        </section>

                        {/* 13. Account Termination */}
                        <section>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                                13. Account Termination
                            </h2>
                            <p className="text-slate-600 mb-2">PropSol reserves the right to suspend or terminate service if:</p>
                            <ul className="space-y-2 text-slate-600 list-disc pl-5 mb-4">
                                <li>Terms are violated</li>
                                <li>Account integrity is compromised</li>
                                <li>Fraud or misuse is detected</li>
                                <li>Communication becomes abusive or deceptive</li>
                            </ul>
                        </section>

                        {/* 14. Confidentiality */}
                        <section>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                                14. Confidentiality
                            </h2>
                            <p className="text-slate-600 mb-2">All client information is treated as confidential.</p>
                            <p className="text-slate-600">We do not sell, rent, or disclose personal data except where required by law.</p>
                        </section>

                        {/* 15. Modifications to Terms */}
                        <section>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                                15. Modifications to Terms
                            </h2>
                            <p className="text-slate-600 mb-2">PropSol reserves the right to update these Terms at any time.</p>
                            <p className="text-slate-600">Continued use of services constitutes acceptance of the revised terms.</p>
                        </section>

                        {/* 16. Governing Law */}
                        <section>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                                16. Governing Law
                            </h2>
                            <p className="text-slate-600">
                                These Terms shall be governed and interpreted in accordance with applicable international commercial laws.
                            </p>
                        </section>

                        {/* 17. Contact Information */}
                        <section>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                                17. Contact Information
                            </h2>
                            <p className="text-slate-600 mb-2">For support inquiries:</p>
                            <ul className="space-y-2 text-slate-600 list-disc pl-5">
                                <li>Email: Hello@propfirmsol.com</li>
                                <li>Website: www.propfirmsol.com</li>
                            </ul>
                        </section>
                    </div>

                    {/* Right Column: Decorative Images */}
                    <div className="hidden lg:block w-1/2 relative">
                        <div className="sticky top-0 h-screen flex flex-col justify-center">
                            {/* Coil Image - Centered vertically, shifted up */}
                            <div className="absolute top-1/2 -translate-y-[90%] lg:-right-10 xl:-right-32 lg:w-[370px] lg:h-[370px] xl:w-[630px] xl:h-[630px] animate-float-delayed">
                                <Image
                                    src="/assets/coil_v2.png"
                                    alt="Decorative Coil"
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            {/* Star Image - Centered vertically, shifted down */}
                            <div className="absolute top-1/2 translate-y-[120%] lg:-right-10 xl:-right-32 lg:w-[370px] lg:h-[370px] xl:w-[630px] xl:h-[630px] animate-float">
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
