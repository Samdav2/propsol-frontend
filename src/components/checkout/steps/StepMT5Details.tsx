import { CheckoutData } from "../CheckoutWizard";
import { AlertTriangle, Info } from "lucide-react";

interface Props {
    data: CheckoutData;
    updateData: (data: Partial<CheckoutData>) => void;
    onNext: () => void;
    onBack: () => void;
}

export function StepMT5Details({ data, updateData, onNext }: Props) {
    const isValid = data.loginId.length > 3 && data.password.length > 3 && data.serverName.length > 3;

    return (
        <div className="bg-[#111836] p-8 rounded-2xl border border-gray-800">
            <div className="bg-yellow-900/20 border border-yellow-900/50 rounded-lg p-3 mb-6 flex items-center gap-2">
                <Info className="w-4 h-4 text-yellow-500" />
                <span className="text-xs text-yellow-500">Important: MT5 Only • Do Not Trade • Target 30 trading days • Max 60 trading days</span>
            </div>

            <h2 className="text-xl font-semibold mb-2">MT5 Login Details</h2>
            <p className="text-gray-400 mb-6 text-sm">Provide your MetaTrader 5 account credentials</p>

            <div className="bg-yellow-900/10 border border-yellow-900/30 rounded-xl p-4 mb-6 flex gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                <p className="text-xs text-yellow-500/90 leading-relaxed">
                    <span className="font-bold">Warning:</span><br />
                    Do not trade on this account after submitting your credentials. Any trading activity will void your package benefits.
                </p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-xs text-gray-500 mb-1 ml-1">MT5 Login ID</label>
                    <input
                        type="text"
                        value={data.loginId}
                        onChange={(e) => updateData({ loginId: e.target.value })}
                        placeholder="Enter your MT5 login ID"
                        className="w-full bg-[#1A2040] border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-500 mb-1 ml-1">MT5 Password</label>
                    <input
                        type="text" // Visible as per screenshot? Usually password field. Screenshot shows "Enter your MT5 password" as placeholder, text is hidden? No, it looks like text input. I'll use password type for security but maybe show toggle. I'll stick to text if user needs to verify. Actually, screenshot shows dots in placeholder but not value. I'll use type="text" for now as it's easier to verify, or "password". Let's use "text" as these are often copy-pasted and users want to see.
                        value={data.password}
                        onChange={(e) => updateData({ password: e.target.value })}
                        placeholder="Enter your MT5 password"
                        className="w-full bg-[#1A2040] border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-500 mb-1 ml-1">MT5 Server</label>
                    <input
                        type="text"
                        value={data.serverName}
                        onChange={(e) => updateData({ serverName: e.target.value })}
                        placeholder="e.g. FundedNext-Server"
                        className="w-full bg-[#1A2040] border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                    />
                </div>
            </div>

            <div className="mt-6 flex items-start gap-3 p-4 bg-blue-900/20 rounded-xl">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                </div>
                <p className="text-xs text-blue-200/70">
                    Your credentials are securely encrypted and only used by our professional traders to execute your evaluation. We never share your information with third parties.
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
