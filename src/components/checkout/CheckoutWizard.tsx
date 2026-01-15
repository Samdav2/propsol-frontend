"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle, Shield, AlertTriangle, Info } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { propFirmService } from "@/services/prop-firm.service";
import { paymentService } from "@/services/payment.service";
import { userService } from "@/services/user.service";
import { cryptoPaymentService, CryptoPayment } from "@/services/crypto-payment.service";

// Step Components (will be defined in same file or separate, let's keep them here for now for speed, then refactor if large)
import { StepChooseFirm } from "./steps/StepChooseFirm";
import { StepChallengeType } from "./steps/StepChallengeType";
import { StepScope } from "./steps/StepScope";
import { StepAccountSize } from "./steps/StepAccountSize";
import { StepPackageSelection } from "./steps/StepPackageSelection";
import { StepTimelineRules } from "./steps/StepTimelineRules";
import { StepOrderSummary } from "./steps/StepOrderSummary";
import { StepMT5Details } from "./steps/StepMT5Details";
import { StepAdditionalInfo } from "./steps/StepAdditionalInfo";
import { StepLegal } from "./steps/StepLegal";
import { StepPayment } from "./steps/StepPayment";
import { StepSuccess } from "./steps/StepSuccess";
import { StepCryptoPaymentPending } from "./steps/StepCryptoPaymentPending";

export type CheckoutData = {
    propFirm: string;
    challengeType: "2-Step Challenge" | "1-Step Challenge";
    scope?: "Step 1 Only" | "Full Pass";
    accountSize: number;
    packageType: "Standard Pass" | "Guaranteed Pass";
    price: number;

    // MT5
    loginId: string;
    password: string;
    serverName: string;
    serverType: string; // Default MT5
    platform: string; // Default MT5

    // Contact & Notes
    whatsapp: string;
    telegram: string;
    notes: string;

    // Crypto Payment
    cryptoCurrency?: string;

    // Legal
    agreedToTerms: boolean;
    agreedToRefundPolicy: boolean;
};

const INITIAL_DATA: CheckoutData = {
    propFirm: "",
    challengeType: "2-Step Challenge",
    accountSize: 0,
    packageType: "Standard Pass",
    price: 0,
    loginId: "",
    password: "",
    serverName: "",
    serverType: "MT5",
    platform: "Metatrader 5",
    whatsapp: "",
    telegram: "",
    notes: "",
    cryptoCurrency: "btc",
    agreedToTerms: false,
    agreedToRefundPolicy: false,
};

export default function CheckoutWizard() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [data, setData] = useState<CheckoutData>(INITIAL_DATA);
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState("");
    const [cryptoPayment, setCryptoPayment] = useState<CryptoPayment | null>(null);

    const totalSteps = data.challengeType === "1-Step Challenge" ? 10 : 11;

    const updateData = (updates: Partial<CheckoutData>) => {
        setData((prev) => ({ ...prev, ...updates }));
    };

    const nextStep = () => {
        setStep((prev) => {
            let next = prev + 1;
            // Skip Step 3 (Scope) if 1-Step Challenge
            if (next === 3 && data.challengeType === "1-Step Challenge") {
                next = 4;
            }
            return Math.min(next, 12); // 12 is Success
        });
    };

    const prevStep = () => {
        setStep((prev) => {
            let back = prev - 1;
            // Skip Step 3 (Scope) if 1-Step Challenge
            if (back === 3 && data.challengeType === "1-Step Challenge") {
                back = 2;
            }
            return Math.max(back, 1);
        });
    };

    const handleSubmit = async (paymentFlow: "invoice" | "direct") => {
        setLoading(true);

        // Check for authentication
        const token = localStorage.getItem('access_token');
        if (!token) {
            toast.error("Please login to complete your order");
            router.push('/signin?returnUrl=/checkout');
            setLoading(false);
            return;
        }

        try {
            // Validate Session
            try {
                await userService.getCurrentUser();
            } catch (error) {
                console.error("Session validation failed:", error);
                throw new Error("Session expired. Please login again.");
            }

            // 1. Create Registration
            let registration;
            try {
                registration = await propFirmService.createRegistration({
                    login_id: data.loginId,
                    password: data.password,
                    propfirm_name: data.propFirm,
                    propfirm_website_link: "https://example.com",
                    server_name: data.serverName,
                    server_type: data.serverType,
                    challenges_step: data.challengeType === "1-Step Challenge" ? 1 : 2,
                    service_scope: data.scope || null,
                    propfirm_account_cost: data.price,
                    account_size: data.accountSize,
                    account_phases: data.challengeType === "1-Step Challenge" ? 1 : 2,
                    trading_platform: data.platform,
                    propfirm_rules: data.notes || "No specific rules provided",
                    whatsapp_no: data.whatsapp,
                    telegram_username: data.telegram,
                });

                if (!registration || !registration.order_id) {
                    throw new Error("Registration failed to return an order ID.");
                }

                setOrderId(registration.order_id);

            } catch (regError: any) {
                console.error("Registration Error:", regError);
                throw new Error(regError?.response?.data?.message || "Failed to create registration. Please check your details.");
            }

            // 2. Create Crypto Payment
            try {
                const baseUrl = window.location.origin;
                const successUrl = `${baseUrl}/checkout/success?order_id=${registration.order_id}`;
                const cancelUrl = `${baseUrl}/checkout`;

                if (paymentFlow === "invoice") {
                    // Invoice Flow - Redirect to NOWPayments
                    const payment = await cryptoPaymentService.createInvoice({
                        price_amount: data.price,
                        price_currency: "usd",
                        pay_currency: data.cryptoCurrency,
                        order_id: registration.order_id,
                        order_description: `PropSol - ${data.propFirm} ${data.challengeType} - $${data.accountSize}k`,
                        success_url: successUrl,
                        cancel_url: cancelUrl,
                    });

                    // Redirect to invoice URL
                    if (payment.invoice_url) {
                        window.location.href = payment.invoice_url;
                    } else {
                        throw new Error("Failed to get invoice URL");
                    }
                } else {
                    // Direct Payment Flow - Show payment address
                    const payment = await cryptoPaymentService.createPayment({
                        price_amount: data.price,
                        price_currency: "usd",
                        pay_currency: data.cryptoCurrency!,
                        order_id: registration.order_id,
                        order_description: `PropSol - ${data.propFirm} ${data.challengeType} - $${data.accountSize}k`,
                    });

                    setCryptoPayment(payment);
                    setStep(12); // Go to payment pending step
                }
            } catch (payError: any) {
                console.error("Payment Error:", payError);
                throw new Error(payError?.response?.data?.message || "Payment creation failed. Please try again.");
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Failed to process order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1: return <StepChooseFirm data={data} updateData={updateData} onNext={nextStep} />;
            case 2: return <StepChallengeType data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />;
            case 3: return <StepScope data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />;
            case 4: return <StepAccountSize data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />;
            case 5: return <StepPackageSelection data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />;
            case 6: return <StepTimelineRules onNext={nextStep} onBack={prevStep} />;
            case 7: return <StepOrderSummary data={data} onNext={nextStep} onBack={prevStep} />;
            case 8: return <StepMT5Details data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />;
            case 9: return <StepAdditionalInfo data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />;
            case 10: return <StepLegal data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />;
            case 11: return <StepPayment data={data} updateData={updateData} onSubmit={handleSubmit} onBack={prevStep} loading={loading} />;
            case 12: return cryptoPayment ? <StepCryptoPaymentPending payment={cryptoPayment} onComplete={() => setStep(13)} /> : <StepSuccess orderId={orderId} />;
            case 13: return <StepSuccess orderId={orderId} />;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0F29] text-white flex flex-col items-center py-10 px-4">
            {/* Header / Progress */}
            {step < 11 && (
                <div className="w-full max-w-4xl mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <button
                            onClick={prevStep}
                            disabled={step === 1}
                            className={`flex items-center text-sm text-gray-400 hover:text-white transition ${step === 1 ? 'opacity-0' : ''}`}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back
                        </button>
                        <div className="text-sm font-medium text-blue-400">
                            Step {data.challengeType === "1-Step Challenge" && step > 3 ? step - 1 : step} of {totalSteps}
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold mb-6">PropSol Checkout</h1>

                    {/* Progress Bar */}
                    <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-600 transition-all duration-300"
                            style={{
                                width: `${((data.challengeType === "1-Step Challenge" && step > 3 ? step - 1 : step) / totalSteps) * 100}%`
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="w-full max-w-4xl">
                {renderStep()}
            </div>
        </div>
    );
}
