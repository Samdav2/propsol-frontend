import { CheckoutData } from "../CheckoutWizard";
import { Info } from "lucide-react";

interface Props {
    data: CheckoutData;
    updateData: (data: Partial<CheckoutData>) => void;
    onNext: () => void;
    onBack: () => void;
}

export function StepLegal({ data, updateData, onNext }: Props) {
    const isValid = data.agreedToTerms && data.agreedToRefundPolicy;

    return (
        <div className="bg-[#111836] p-8 rounded-2xl border border-gray-800">
            <div className="bg-yellow-900/20 border border-yellow-900/50 rounded-lg p-3 mb-6 flex items-center gap-2">
                <Info className="w-4 h-4 text-yellow-500" />
                <span className="text-xs text-yellow-500">Important: MT5 Only • Do Not Trade • Target 30 trading days • Max 60 trading days</span>
            </div>

            <h2 className="text-xl font-semibold mb-2">Legal & Acknowledgment</h2>
            <p className="text-gray-400 mb-6 text-sm">Please review and accept the terms</p>

            <div className="space-y-4">
                {/* Service Understanding */}
                <div className="bg-[#1A2040] p-6 rounded-xl border border-gray-700">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center text-xs text-gray-400">?</div>
                        Service Understanding
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                        PropSol provides a professional evaluation passing service. We help you pass your prop firm evaluation by trading on your account. This is a <span className="text-white font-bold">service</span>, not a profit guarantee.
                    </p>
                    <label className="flex items-start gap-3 cursor-pointer group">
                        <div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-colors ${data.agreedToTerms ? "bg-blue-600 border-blue-600" : "border-gray-600 group-hover:border-gray-500"}`}>
                            {data.agreedToTerms && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <input type="checkbox" className="hidden" checked={data.agreedToTerms} onChange={(e) => updateData({ agreedToTerms: e.target.checked })} />
                        <span className="text-sm text-gray-300">I understand this is an evaluation passing service, not a profit guarantee</span>
                    </label>
                </div>

                {/* Terms */}
                <div className="bg-[#1A2040] p-6 rounded-xl border border-gray-700">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center text-xs text-gray-400">!</div>
                        {data.packageType} Terms
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                        {data.packageType === "Standard Pass"
                            ? "The Standard Pass package does not include refund protection. We will make our best effort to pass your evaluation within the 60-day window, but no refund is provided if we are unable to complete the evaluation successfully."
                            : "The Guaranteed Pass package includes full refund protection. If we fail to pass your evaluation within the 60-day window, you will receive a full refund of the service fee plus the challenge cost."
                        }
                    </p>
                    <label className="flex items-start gap-3 cursor-pointer group">
                        <div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-colors ${data.agreedToRefundPolicy ? "bg-blue-600 border-blue-600" : "border-gray-600 group-hover:border-gray-500"}`}>
                            {data.agreedToRefundPolicy && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <input type="checkbox" className="hidden" checked={data.agreedToRefundPolicy} onChange={(e) => updateData({ agreedToRefundPolicy: e.target.checked })} />
                        <span className="text-sm text-gray-300">I understand the {data.packageType} terms regarding refunds and protection</span>
                    </label>
                </div>
            </div>

            <button
                onClick={onNext}
                disabled={!isValid}
                className="w-full mt-8 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors"
            >
                Proceed to Payment
            </button>
        </div>
    );
}
