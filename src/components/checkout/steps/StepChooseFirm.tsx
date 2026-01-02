import { CheckoutData } from "../CheckoutWizard";
import { Building2 } from "lucide-react";

interface Props {
    data: CheckoutData;
    updateData: (data: Partial<CheckoutData>) => void;
    onNext: () => void;
}

const FIRMS = [
    { id: "FundedNext", name: "FundedNext" },
    { id: "FundingPips", name: "FundingPips" },
    { id: "FTMO", name: "FTMO" },
];

export function StepChooseFirm({ data, updateData, onNext }: Props) {
    const handleSelect = (firm: string) => {
        updateData({ propFirm: firm });
    };

    return (
        <div className="bg-[#111836] p-8 rounded-2xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-2">Choose Your Prop Firm</h2>
            <p className="text-gray-400 mb-6 text-sm">Select the prop firm you purchased your evaluation from</p>

            <div className="space-y-4">
                {FIRMS.map((firm) => (
                    <button
                        key={firm.id}
                        onClick={() => handleSelect(firm.id)}
                        className={`w-full flex items-center p-4 rounded-xl border transition-all ${data.propFirm === firm.id
                                ? "border-blue-500 bg-blue-500/10"
                                : "border-gray-700 hover:border-gray-600 bg-[#1A2040]"
                            }`}
                    >
                        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-4">
                            <Building2 className="w-5 h-5 text-gray-300" />
                        </div>
                        <span className="font-medium">{firm.name}</span>
                    </button>
                ))}
            </div>

            <button
                onClick={onNext}
                disabled={!data.propFirm}
                className="w-full mt-8 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors"
            >
                Continue
            </button>
        </div>
    );
}
