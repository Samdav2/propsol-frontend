import { CheckoutData } from "../CheckoutWizard";
import { Wallet, QrCode, Copy, Check, Info, ExternalLink, RefreshCw, Bitcoin } from "lucide-react";
import { useState, useEffect } from "react";
import { cryptoPaymentService } from "@/services/crypto-payment.service";
import { toast } from "react-hot-toast";

interface Props {
    data: CheckoutData;
    updateData: (data: Partial<CheckoutData>) => void;
    onSubmit: (paymentFlow: "invoice" | "direct") => void;
    onBack: () => void;
    loading: boolean;
}

export function StepPayment({ data, updateData, onSubmit, loading }: Props) {
    const [paymentFlow, setPaymentFlow] = useState<"invoice" | "direct">("invoice");
    const [currencies, setCurrencies] = useState<string[]>([]);
    const [selectedCurrency, setSelectedCurrency] = useState("btc");
    const [estimatedAmount, setEstimatedAmount] = useState<number | null>(null);
    const [loadingEstimate, setLoadingEstimate] = useState(false);
    const [loadingCurrencies, setLoadingCurrencies] = useState(true);
    const [copied, setCopied] = useState(false);

    // Preferred crypto currencies in order
    const preferredCurrencies = ["btc", "usdttrc20", "eth", "ltc", "bnb", "trx", "usdc"];

    // Common crypto currencies with friendly names
    const currencyNames: Record<string, string> = {
        btc: "Bitcoin",
        usdttrc20: "USDT TRC20",
        eth: "Ethereum",
        ltc: "Litecoin",
        bnb: "BNB",
        trx: "TRON (TRX)",
        usdc: "USD Coin (USDC)",
        usdt: "Tether (USDT)",
        sol: "Solana",
    };

    // Load available currencies on mount
    useEffect(() => {
        loadCurrencies();
    }, []);

    // Update estimate when currency or price changes
    useEffect(() => {
        if (selectedCurrency && data.price > 0) {
            loadEstimate();
        }
    }, [selectedCurrency, data.price]);

    const loadCurrencies = async () => {
        try {
            const response = await cryptoPaymentService.getAvailableCurrencies();
            const available = response.currencies || [];
            
            // Sort currencies: preferred ones first, then others
            const sorted = [
                ...preferredCurrencies.filter(c => available.includes(c)),
                ...available.filter(c => !preferredCurrencies.includes(c))
            ];
            
            setCurrencies(sorted.length > 0 ? sorted : preferredCurrencies);
            setLoadingCurrencies(false);
        } catch (error) {
            // Fallback to preferred currencies
            setCurrencies(preferredCurrencies);
            setLoadingCurrencies(false);
        }
    };

    const loadEstimate = async () => {
        setLoadingEstimate(true);
        try {
            const response = await cryptoPaymentService.getEstimatedPrice(
                data.price,
                "usd",
                selectedCurrency
            );
            setEstimatedAmount(response.estimated_amount);
        } catch (error) {
            // Failed to load estimate, set to null
            setEstimatedAmount(null);
        } finally {
            setLoadingEstimate(false);
        }
    };

    const handleCurrencyChange = (currency: string) => {
        setSelectedCurrency(currency);
        updateData({ cryptoCurrency: currency });
    };

    const handleCopyAddress = (address: string) => {
        navigator.clipboard.writeText(address);
        setCopied(true);
        toast.success("Address copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };

    const isValid = selectedCurrency.length > 0;

    return (
        <div className="bg-[#111836] p-8 rounded-2xl border border-gray-800">
            <div className="bg-yellow-900/20 border border-yellow-900/50 rounded-lg p-3 mb-6 flex items-center gap-2">
                <Info className="w-4 h-4 text-yellow-500" />
                <span className="text-xs text-yellow-500">
                    Important: MT5 Only • Do Not Trade • Target 30 trading days • Max 60 trading days
                </span>
            </div>

            <h2 className="text-xl font-semibold mb-2">Crypto Payment</h2>
            <p className="text-gray-400 mb-6 text-sm">
                Pay with cryptocurrency for your prop firm challenge
            </p>

            {/* Total Amount */}
            <div className="bg-[#1A2040] p-6 rounded-xl border border-gray-700 mb-8">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400">Total Amount (USD)</span>
                    <span className="text-2xl font-bold text-white">${data.price}</span>
                </div>
                {estimatedAmount !== null && (
                    <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                        <span className="text-sm text-gray-400">
                            Estimated {currencyNames[selectedCurrency] || selectedCurrency.toUpperCase()}
                        </span>
                        <div className="flex items-center gap-2">
                            {loadingEstimate ? (
                                <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />
                            ) : (
                                <>
                                    <span className="text-lg font-semibold text-blue-400">
                                        ≈ {Number(estimatedAmount).toFixed(8)}
                                    </span>
                                    <span className="text-sm text-gray-400">{selectedCurrency.toUpperCase()}</span>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Currency Selection */}
            <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-3">Select Cryptocurrency</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {loadingCurrencies ? (
                        <div className="col-span-2 sm:col-span-4 text-center py-4 text-gray-500">
                            Loading currencies...
                        </div>
                    ) : (
                        currencies.slice(0, 8).map((currency) => (
                            <button
                                key={currency}
                                onClick={() => handleCurrencyChange(currency)}
                                className={`p-4 rounded-xl border transition-all ${selectedCurrency === currency
                                    ? "border-blue-500 bg-blue-500/10"
                                    : "border-gray-700 bg-[#1A2040] hover:border-gray-600"
                                    }`}
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <Bitcoin className={`w-6 h-6 ${selectedCurrency === currency ? "text-blue-400" : "text-gray-400"}`} />
                                    <span className={`text-xs font-medium ${selectedCurrency === currency ? "text-white" : "text-gray-400"}`}>
                                        {currency.toUpperCase()}
                                    </span>
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </div>

            {/* Payment Flow Selection */}
            <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-3">Payment Method</label>
                <div className="space-y-3">
                    {/* Invoice Flow */}
                    <div
                        className={`border rounded-xl overflow-hidden transition-all ${paymentFlow === "invoice" ? "border-blue-500 bg-blue-500/5" : "border-gray-700 bg-[#1A2040]"
                            }`}
                    >
                        <button
                            onClick={() => setPaymentFlow("invoice")}
                            className="w-full flex items-start p-4 text-left"
                        >
                            <ExternalLink
                                className={`w-5 h-5 mr-3 mt-0.5 ${paymentFlow === "invoice" ? "text-blue-400" : "text-gray-400"}`}
                            />
                            <div className="flex-1">
                                <div className={`font-medium mb-1 ${paymentFlow === "invoice" ? "text-white" : "text-gray-300"}`}>
                                    Hosted Payment Page
                                </div>
                                <p className="text-xs text-gray-500">
                                    Redirected to NOWPayments secure page to complete payment
                                </p>
                            </div>
                        </button>
                    </div>

                    {/* Direct Payment Flow */}
                    <div
                        className={`border rounded-xl overflow-hidden transition-all ${paymentFlow === "direct" ? "border-blue-500 bg-blue-500/5" : "border-gray-700 bg-[#1A2040]"
                            }`}
                    >
                        <button
                            onClick={() => setPaymentFlow("direct")}
                            className="w-full flex items-start p-4 text-left"
                        >
                            <QrCode
                                className={`w-5 h-5 mr-3 mt-0.5 ${paymentFlow === "direct" ? "text-blue-400" : "text-gray-400"}`}
                            />
                            <div className="flex-1">
                                <div className={`font-medium mb-1 ${paymentFlow === "direct" ? "text-white" : "text-gray-300"}`}>
                                    Direct Wallet Payment
                                </div>
                                <p className="text-xs text-gray-500">
                                    Send crypto directly from your wallet (QR code & address provided)
                                </p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-900/20 border border-blue-900/50 rounded-lg p-4 mb-6">
                <div className="flex gap-3">
                    <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-blue-300 space-y-1">
                        <p className="font-semibold">Payment Instructions:</p>
                        {paymentFlow === "invoice" ? (
                            <p>
                                You'll be redirected to a secure NOWPayments page where you can complete your payment.
                                After payment, you'll be automatically redirected back.
                            </p>
                        ) : (
                            <p>
                                You'll receive a unique payment address and QR code. Send the exact amount to complete your order.
                                Payment confirmation typically takes 5-30 minutes depending on network.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <button
                onClick={() => onSubmit(paymentFlow)}
                disabled={!isValid || loading}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
            >
                {loading ? (
                    <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Processing...
                    </>
                ) : (
                    <>
                        <Wallet className="w-5 h-5" />
                        {paymentFlow === "invoice" ? "Continue to Payment" : "Generate Payment Address"}
                    </>
                )}
            </button>

            <div className="mt-4 text-xs text-center text-gray-500">
                <p>Powered by NOWPayments • Secure cryptocurrency payment processing</p>
            </div>
        </div>
    );
}
