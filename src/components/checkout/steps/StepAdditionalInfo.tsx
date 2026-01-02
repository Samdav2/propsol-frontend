import { CheckoutData } from "../CheckoutWizard";
import { Info, FileText } from "lucide-react";

interface Props {
    data: CheckoutData;
    updateData: (data: Partial<CheckoutData>) => void;
    onNext: () => void;
    onBack: () => void;
}

export function StepAdditionalInfo({ data, updateData, onNext }: Props) {
    // API requires whatsapp and telegram. I'll make them required here.
    const isValid = data.whatsapp.length > 3 && data.telegram.length > 3;

    return (
        <div className="bg-[#111836] p-8 rounded-2xl border border-gray-800">
            <div className="bg-yellow-900/20 border border-yellow-900/50 rounded-lg p-3 mb-6 flex items-center gap-2">
                <Info className="w-4 h-4 text-yellow-500" />
                <span className="text-xs text-yellow-500">Important: MT5 Only • Do Not Trade • Target 30 trading days • Max 60 trading days</span>
            </div>

            <h2 className="text-xl font-semibold mb-2">Additional Information</h2>
            <p className="text-gray-400 mb-6 text-sm">Optional notes for our traders (recommended)</p>

            <div className="space-y-4">
                {/* Contact Info (Required by API) */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1 ml-1">WhatsApp Number *</label>
                        <input
                            type="text"
                            value={data.whatsapp}
                            onChange={(e) => updateData({ whatsapp: e.target.value })}
                            placeholder="+1 234 567 8900"
                            className="w-full bg-[#1A2040] border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1 ml-1">Telegram Username *</label>
                        <input
                            type="text"
                            value={data.telegram}
                            onChange={(e) => updateData({ telegram: e.target.value })}
                            placeholder="@username"
                            className="w-full bg-[#1A2040] border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs text-gray-500 mb-1 ml-1">Trader Notes (Optional)</label>
                    <textarea
                        value={data.notes}
                        onChange={(e) => updateData({ notes: e.target.value })}
                        placeholder={`Include any relevant information such as:
- Specific drawdown limits or rules
- News trading restrictions
- Preferred trading times
- Maximum spread requirements
- Any other special considerations`}
                        rows={6}
                        className="w-full bg-[#1A2040] border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                        Providing detailed information helps our traders execute your evaluation more effectively.
                    </p>
                </div>
            </div>

            <div className="mt-6 flex items-start gap-3 p-4 bg-blue-900/20 rounded-xl">
                <FileText className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <p className="text-xs text-blue-200/70">
                    <span className="font-bold">Pro Tip:</span> Include information about your challenge rules, especially if there are restrictions on news trading, maximum daily loss, or specific trading hours required.
                </p>
            </div>

            <button
                onClick={onNext}
                disabled={!isValid}
                className="w-full mt-8 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors"
            >
                Continue
            </button>
        </div>
    );
}
