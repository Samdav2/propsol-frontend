import { CheckoutData } from "../CheckoutWizard";
import { Target, CheckCircle2 } from "lucide-react";

interface Props {
    data: CheckoutData;
    updateData: (data: Partial<CheckoutData>) => void;
    onNext: () => void;
    onBack: () => void;
}

export function StepScope({ data, updateData, onNext }: Props) {
    const handleSelect = (scope: "Step 1 Only" | "Full Pass") => {
        updateData({ scope });
    };

    return (
        <div className="bg-[#111836] p-8 rounded-2xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-2">Scope of Service</h2>
            <p className="text-gray-400 mb-6 text-sm">Choose what you need help with</p>

            <div className="space-y-4">
                {/* Step 1 Only */}
                <button
                    onClick={() => handleSelect("Step 1 Only")}
                    className={`w-full text-left p-6 rounded-xl border transition-all ${data.scope === "Step 1 Only"
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-gray-700 hover:border-gray-600 bg-[#1A2040]"
                        }`}
                >
                    <div className="flex items-center">
                        <div className="mr-4">
                            <Target className={`w-8 h-8 ${data.scope === "Step 1 Only" ? "text-blue-400" : "text-gray-400"}`} />
                        </div>
                        <div>
                            <div className="font-semibold text-lg mb-1">Pass Step 1 Only</div>
                            <div className="text-sm text-gray-400">We'll help you pass Phase 1 of your evaluation</div>
                        </div>
                    </div>
                </button>

                {/* Full Pass */}
                <button
                    onClick={() => handleSelect("Full Pass")}
                    className={`w-full text-left p-6 rounded-xl border transition-all ${data.scope === "Full Pass"
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-gray-700 hover:border-gray-600 bg-[#1A2040]"
                        }`}
                >
                    <div className="flex items-center">
                        <div className="mr-4">
                            <CheckCircle2 className={`w-8 h-8 ${data.scope === "Full Pass" ? "text-blue-400" : "text-gray-400"}`} />
                        </div>
                        <div>
                            <div className="font-semibold text-lg mb-1">Pass Both Step 1 + Step 2 (Full Pass)</div>
                            <div className="text-sm text-gray-400">We'll help you pass both phases and get you funded</div>
                        </div>
                    </div>
                </button>
            </div>

            <button
                onClick={onNext}
                disabled={!data.scope}
                className="w-full mt-8 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors"
            >
                Continue
            </button>
        </div>
    );
}
