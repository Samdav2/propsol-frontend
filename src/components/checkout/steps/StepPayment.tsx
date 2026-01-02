import { CheckoutData } from "../CheckoutWizard";
import { CreditCard, Wallet, Building, Info } from "lucide-react";
import { useState } from "react";

interface Props {
    data: CheckoutData;
    updateData: (data: Partial<CheckoutData>) => void;
    onSubmit: () => void;
    onBack: () => void;
    loading: boolean;
}

export function StepPayment({ data, updateData, onSubmit, loading }: Props) {
    const [method, setMethod] = useState<"card" | "crypto" | "bank">("card");

    const isValid =
        method === "card"
            ? data.cardName.length > 3 && data.cardNumber.length > 12 && data.expiryDate.length > 0 && data.cvv.length > 2
            : false; // Only card implemented for now

    return (
        <div className="bg-[#111836] p-8 rounded-2xl border border-gray-800">
            <div className="bg-yellow-900/20 border border-yellow-900/50 rounded-lg p-3 mb-6 flex items-center gap-2">
                <Info className="w-4 h-4 text-yellow-500" />
                <span className="text-xs text-yellow-500">Important: MT5 Only • Do Not Trade • Target 30 trading days • Max 60 trading days</span>
            </div>

            <h2 className="text-xl font-semibold mb-2">Payment</h2>
            <p className="text-gray-400 mb-6 text-sm">Choose your payment method to complete your order</p>

            {/* Total Amount */}
            <div className="bg-[#1A2040] p-6 rounded-xl border border-gray-700 mb-8 flex justify-between items-center">
                <span className="text-gray-400">Total Amount</span>
                <span className="text-2xl font-bold text-white">${data.price}</span>
            </div>

            <div className="space-y-4">
                {/* Credit Card */}
                <div className={`border rounded-xl overflow-hidden transition-all ${method === "card" ? "border-blue-500 bg-blue-500/5" : "border-gray-700 bg-[#1A2040]"}`}>
                    <button
                        onClick={() => setMethod("card")}
                        className="w-full flex items-center p-4 text-left"
                    >
                        <CreditCard className={`w-5 h-5 mr-3 ${method === "card" ? "text-blue-400" : "text-gray-400"}`} />
                        <span className={`font-medium ${method === "card" ? "text-white" : "text-gray-300"}`}>Credit / Debit Card</span>
                    </button>

                    {method === "card" && (
                        <div className="p-4 pt-0 space-y-4 animate-fadeIn">
                            <div>
                                <label className="block text-xs text-gray-500 mb-1 ml-1">Cardholder Name</label>
                                <input
                                    type="text"
                                    value={data.cardName}
                                    onChange={(e) => updateData({ cardName: e.target.value })}
                                    placeholder="John Doe"
                                    className="w-full bg-[#111836] border border-gray-700 rounded-xl p-3 text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1 ml-1">Card Number</label>
                                <input
                                    type="text"
                                    value={data.cardNumber}
                                    onChange={(e) => updateData({ cardNumber: e.target.value })}
                                    placeholder="0000 0000 0000 0000"
                                    className="w-full bg-[#111836] border border-gray-700 rounded-xl p-3 text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1 ml-1">Expiry Date</label>
                                    <input
                                        type="text" // Using text for simplicity, could be date or masked
                                        value={data.expiryDate}
                                        onChange={(e) => updateData({ expiryDate: e.target.value })}
                                        placeholder="MM/YY"
                                        className="w-full bg-[#111836] border border-gray-700 rounded-xl p-3 text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1 ml-1">CVV</label>
                                    <input
                                        type="text"
                                        value={data.cvv}
                                        onChange={(e) => updateData({ cvv: e.target.value })}
                                        placeholder="123"
                                        className="w-full bg-[#111836] border border-gray-700 rounded-xl p-3 text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Crypto */}
                <button
                    onClick={() => setMethod("crypto")} // Not implemented
                    className={`w-full flex items-center p-4 rounded-xl border transition-all ${method === "crypto" ? "border-blue-500 bg-blue-500/5" : "border-gray-700 bg-[#1A2040]"}`}
                >
                    <Wallet className={`w-5 h-5 mr-3 ${method === "crypto" ? "text-blue-400" : "text-gray-400"}`} />
                    <span className={`font-medium ${method === "crypto" ? "text-white" : "text-gray-300"}`}>Crypto (USDT)</span>
                </button>

                {/* Bank Transfer */}
                <button
                    onClick={() => setMethod("bank")} // Not implemented
                    className={`w-full flex items-center p-4 rounded-xl border transition-all ${method === "bank" ? "border-blue-500 bg-blue-500/5" : "border-gray-700 bg-[#1A2040]"}`}
                >
                    <Building className={`w-5 h-5 mr-3 ${method === "bank" ? "text-blue-400" : "text-gray-400"}`} />
                    <span className={`font-medium ${method === "bank" ? "text-white" : "text-gray-300"}`}>Bank Transfer</span>
                </button>
            </div>

            <div className="mt-6 text-xs text-center text-gray-500">
                You will be redirected to our secure payment processor to complete your transaction.
            </div>

            <button
                onClick={onSubmit}
                disabled={!isValid || loading}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors shadow-lg shadow-blue-900/20"
            >
                {loading ? "Processing..." : "Complete Payment"}
            </button>
        </div>
    );
}
