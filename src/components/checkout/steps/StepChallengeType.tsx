import { CheckoutData } from "../CheckoutWizard";
import { Layers } from "lucide-react";

interface Props {
    data: CheckoutData;
    updateData: (data: Partial<CheckoutData>) => void;
    onNext: () => void;
    onBack: () => void;
}

const TYPES = [
    { id: "2-Step Challenge", name: "2-Step Challenge", desc: "Complete Phase 1, then Phase 2 to get funded" },
    { id: "1-Step Challenge", name: "1-Step Challenge", desc: "Single evaluation phase to get funded" },
];

export function StepChallengeType({ data, updateData, onNext }: Props) {
    return (
        <div className="bg-[#111836] p-8 rounded-2xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-2">Select Challenge Type</h2>
            <p className="text-gray-400 mb-6 text-sm">Choose your evaluation structure</p>

            <div className="space-y-4">
                {TYPES.map((type) => (
                    <button
                        key={type.id}
                        onClick={() => updateData({ challengeType: type.id as any })}
                        className={`w-full text-left p-6 rounded-xl border transition-all ${data.challengeType === type.id
                                ? "border-blue-500 bg-blue-500/10"
                                : "border-gray-700 hover:border-gray-600 bg-[#1A2040]"
                            }`}
                    >
                        <div className="flex items-start">
                            <div className="mt-1 mr-4">
                                <Layers className={`w-6 h-6 ${data.challengeType === type.id ? "text-blue-400" : "text-gray-400"}`} />
                            </div>
                            <div>
                                <div className="font-semibold text-lg mb-1">{type.name}</div>
                                <div className="text-sm text-gray-400">{type.desc}</div>
                            </div>
                        </div>
                    </button>
                ))}
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
