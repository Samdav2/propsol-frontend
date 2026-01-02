import { CheckoutData } from "../CheckoutWizard";
import { CheckCircle, ShieldCheck } from "lucide-react";
import { useEffect } from "react";

interface Props {
    data: CheckoutData;
    updateData: (data: Partial<CheckoutData>) => void;
    onNext: () => void;
    onBack: () => void;
}

const PRICING: Record<number, { standard: number; guaranteed: number }> = {
    50000: { standard: 490, guaranteed: 990 },
    100000: { standard: 890, guaranteed: 1790 },
    200000: { standard: 1790, guaranteed: 3590 },
    500000: { standard: 3990, guaranteed: 7990 },
};

export function StepPackageSelection({ data, updateData, onNext }: Props) {
    const prices = PRICING[data.accountSize] || { standard: 0, guaranteed: 0 };

    useEffect(() => {
        // Update price when component mounts or package type changes
        const price = data.packageType === "Standard Pass" ? prices.standard : prices.guaranteed;
        if (data.price !== price) {
            updateData({ price });
        }
    }, [data.packageType, data.accountSize, prices, updateData, data.price]);

    const handleSelect = (type: "Standard Pass" | "Guaranteed Pass") => {
        updateData({ packageType: type });
    };

    return (
        <div className="bg-[#111836] p-8 rounded-2xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-2">Choose Your Package</h2>
            <p className="text-gray-400 mb-6 text-sm">Select the service level that fits your needs</p>

            <div className="space-y-4">
                {/* Standard Pass */}
                <button
                    onClick={() => handleSelect("Standard Pass")}
                    className={`w-full text-left p-6 rounded-xl border transition-all relative ${data.packageType === "Standard Pass"
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-gray-700 hover:border-gray-600 bg-[#1A2040]"
                        }`}
                >
                    <div className="flex items-start">
                        <div className="mt-1 mr-4">
                            <CheckCircle className={`w-6 h-6 ${data.packageType === "Standard Pass" ? "text-blue-400" : "text-gray-400"}`} />
                        </div>
                        <div>
                            <div className="flex justify-between items-center w-full mb-2">
                                <div className="font-semibold text-lg">Standard Pass</div>
                                <div className="text-xl font-bold">${prices.standard}</div>
                            </div>
                            <p className="text-sm text-gray-400 mb-3">Professional evaluation passing service at competitive pricing</p>
                            <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                                <li>Professional traders</li>
                                <li>30-60 day completion window</li>
                                <li>Lower cost option</li>
                                <li>Access to PropSol live trading system</li>
                            </ul>
                        </div>
                    </div>
                </button>

                {/* Guaranteed Pass */}
                <button
                    onClick={() => handleSelect("Guaranteed Pass")}
                    className={`w-full text-left p-6 rounded-xl border transition-all relative overflow-hidden ${data.packageType === "Guaranteed Pass"
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-gray-700 hover:border-gray-600 bg-[#1A2040]"
                        }`}
                >
                    {data.packageType === "Guaranteed Pass" && (
                        <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-3 py-1 rounded-bl-lg">
                            Recommended
                        </div>
                    )}
                    <div className="flex items-start">
                        <div className="mt-1 mr-4">
                            <ShieldCheck className={`w-6 h-6 ${data.packageType === "Guaranteed Pass" ? "text-blue-400" : "text-gray-400"}`} />
                        </div>
                        <div>
                            <div className="flex justify-between items-center w-full mb-2">
                                <div className="font-semibold text-lg">Guaranteed Pass</div>
                                <div className="text-xl font-bold">${prices.guaranteed}</div>
                            </div>
                            <p className="text-sm text-gray-400 mb-3">Full refund protection including challenge cost and compensation</p>
                            <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                                <li>Priority execution</li>
                                <li>Full refund if we don't pass</li>
                                <li>Challenge cost + compensation included</li>
                                <li>Peace of mind guarantee</li>
                                <li>Access to PropSol live trading system</li>
                            </ul>
                        </div>
                    </div>
                </button>
            </div>

            <button
                onClick={onNext}
                className="w-full mt-8 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-xl transition-colors"
            >
                Continue
            </button>
        </div>
    );
}
