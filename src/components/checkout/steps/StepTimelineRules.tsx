import { useState } from "react";
import { Clock, AlertTriangle } from "lucide-react";

interface Props {
    onNext: () => void;
    onBack: () => void;
}

export function StepTimelineRules({ onNext }: Props) {
    const [agreedTimeline, setAgreedTimeline] = useState(false);
    const [agreedNoTrading, setAgreedNoTrading] = useState(false);

    return (
        <div className="bg-[#111836] p-8 rounded-2xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-2">Timeline & Rules Confirmation</h2>
            <p className="text-gray-400 mb-6 text-sm">Please review and acknowledge the following</p>

            <div className="space-y-6">
                {/* Timeline */}
                <div className="bg-[#1A2040] p-6 rounded-xl border border-gray-700">
                    <div className="flex items-center gap-3 mb-3">
                        <Clock className="w-5 h-5 text-blue-400" />
                        <h3 className="font-semibold">Timeline Expectations</h3>
                        <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded">Varies by Prop Firm trading system generation</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-4">
                        We target completion within 30 trading days, with a maximum window of 60 trading days.
                        Completion time depends on market conditions and trading opportunities.
                    </p>
                    <label className="flex items-start gap-3 cursor-pointer group">
                        <div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-colors ${agreedTimeline ? "bg-blue-600 border-blue-600" : "border-gray-600 group-hover:border-gray-500"}`}>
                            {agreedTimeline && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <input type="checkbox" className="hidden" checked={agreedTimeline} onChange={(e) => setAgreedTimeline(e.target.checked)} />
                        <span className="text-sm text-gray-300">I understand and accept the 30-60 trading day timeline</span>
                    </label>
                </div>

                {/* No Trading Policy */}
                <div className="bg-[#1A2040] p-6 rounded-xl border border-yellow-900/30">
                    <div className="flex items-center gap-3 mb-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-500" />
                        <h3 className="font-semibold text-yellow-500">Critical: No Trading Policy</h3>
                    </div>
                    <p className="text-sm text-gray-400 mb-4">
                        Do not trade on your account after submission. Any client trading or interference after you submit your credentials will void all package benefits and guarantees. This is to ensure clean evaluation execution.
                    </p>
                    <label className="flex items-start gap-3 cursor-pointer group">
                        <div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-colors ${agreedNoTrading ? "bg-blue-600 border-blue-600" : "border-gray-600 group-hover:border-gray-500"}`}>
                            {agreedNoTrading && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <input type="checkbox" className="hidden" checked={agreedNoTrading} onChange={(e) => setAgreedNoTrading(e.target.checked)} />
                        <span className="text-sm text-gray-300">I understand I must not trade on the account after submission</span>
                    </label>
                </div>
            </div>

            <button
                onClick={onNext}
                disabled={!agreedTimeline || !agreedNoTrading}
                className="w-full mt-8 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors"
            >
                Continue
            </button>
        </div>
    );
}
