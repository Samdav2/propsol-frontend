import { useState, useEffect } from "react";
import { QrCodeIcon, Copy, Check, ExternalLink, RefreshCw, CheckCircle, AlertTriangle } from "lucide-react";
import { cryptoPaymentService, CryptoPayment } from "@/services/crypto-payment.service";
import { toast } from "react-hot-toast";
import QRCode from "qrcode";

interface Props {
    payment: CryptoPayment;
    onComplete: () => void;
}

export function StepCryptoPaymentPending({ payment, onComplete }: Props) {
    const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
    const [copied, setCopied] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(payment.payment_status);
    const [checkingStatus, setCheckingStatus] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(3600); // 1 hour in seconds

    useEffect(() => {
        // Generate QR code
        if (payment.pay_address) {
            const qrData = `${payment.pay_currency}:${payment.pay_address}?amount=${payment.pay_amount}`;
            QRCode.toDataURL(qrData, {
                width: 300,
                margin: 2,
                color: {
                    dark: "#000000",
                    light: "#FFFFFF",
                },
            })
                .then(setQrCodeUrl)
                .catch((err) => console.error("QR Code generation failed:", err));
        }
    }, [payment]);

    useEffect(() => {
        // Poll payment status every 30 seconds
        const interval = setInterval(() => {
            checkPaymentStatus();
        }, 30000);

        return () => clearInterval(interval);
    }, [payment.payment_id]);

    useEffect(() => {
        // Countdown timer
        const interval = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 0) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const checkPaymentStatus = async () => {
        if (!payment.payment_id) return;

        setCheckingStatus(true);
        try {
            const status = await cryptoPaymentService.getPaymentStatus(payment.payment_id);
            setPaymentStatus(status.payment_status);

            if (status.payment_status === "finished" || status.payment_status === "confirmed") {
                toast.success("Payment confirmed!");
                setTimeout(() => onComplete(), 2000);
            }
        } catch (error) {
            console.error("Failed to check payment status:", error);
        } finally {
            setCheckingStatus(false);
        }
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        toast.success("Copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs.toString().padStart(2, "0")}`;
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "waiting":
            case "confirming":
                return "text-yellow-400";
            case "confirmed":
            case "finished":
                return "text-green-400";
            case "failed":
            case "expired":
                return "text-red-400";
            default:
                return "text-gray-400";
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "waiting":
                return "Waiting for payment";
            case "confirming":
                return "Confirming payment";
            case "confirmed":
                return "Payment confirmed";
            case "finished":
                return "Payment completed";
            case "failed":
                return "Payment failed";
            case "expired":
                return "Payment expired";
            default:
                return status;
        }
    };

    return (
        <div className="bg-[#111836] p-8 rounded-2xl border border-gray-800 max-w-2xl mx-auto">
            {/* Status Header */}
            <div className="text-center mb-8">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-900/20 border border-yellow-900/50 mb-4`}>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                    <span className={`text-sm font-medium ${getStatusColor(paymentStatus)}`}>
                        {getStatusText(paymentStatus)}
                    </span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Complete Your Payment</h2>
                <p className="text-gray-400 text-sm">
                    Send exactly <span className="text-white font-semibold">{payment.pay_amount} {payment.pay_currency?.toUpperCase()}</span> to the address below
                </p>
            </div>

            {/* Timer */}
            {timeRemaining > 0 && (
                <div className="bg-blue-900/20 border border-blue-900/50 rounded-lg p-4 mb-6 text-center">
                    <p className="text-xs text-blue-300 mb-1">Time remaining to complete payment</p>
                    <p className="text-2xl font-mono font-bold text-blue-400">{formatTime(timeRemaining)}</p>
                </div>
            )}

            {/* QR Code */}
            {qrCodeUrl && (
                <div className="bg-white p-6 rounded-xl mb-6 flex justify-center">
                    <img src={qrCodeUrl} alt="Payment QR Code" className="w-64 h-64" />
                </div>
            )}

            {/* Payment Details */}
            <div className="space-y-4 mb-6">
                {/* Amount */}
                <div className="bg-[#1A2040] p-4 rounded-xl border border-gray-700">
                    <label className="block text-xs text-gray-500 mb-2">Amount to Send</label>
                    <div className="flex items-center justify-between">
                        <span className="text-lg font-mono font-semibold text-white">
                            {payment.pay_amount} {payment.pay_currency?.toUpperCase()}
                        </span>
                        <button
                            onClick={() => handleCopy(payment.pay_amount?.toString() || "")}
                            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            {copied ? (
                                <Check className="w-4 h-4 text-green-400" />
                            ) : (
                                <Copy className="w-4 h-4 text-gray-400" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Address */}
                <div className="bg-[#1A2040] p-4 rounded-xl border border-gray-700">
                    <label className="block text-xs text-gray-500 mb-2">Payment Address</label>
                    <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-mono text-white break-all flex-1">
                            {payment.pay_address}
                        </span>
                        <button
                            onClick={() => handleCopy(payment.pay_address || "")}
                            className="p-2 hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                        >
                            {copied ? (
                                <Check className="w-4 h-4 text-green-400" />
                            ) : (
                                <Copy className="w-4 h-4 text-gray-400" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Extra ID (if needed) */}
                {payment.payin_extra_id && (
                    <div className="bg-[#1A2040] p-4 rounded-xl border border-gray-700">
                        <label className="block text-xs text-gray-500 mb-2">Memo/Tag (Required)</label>
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-mono text-white break-all flex-1">
                                {payment.payin_extra_id}
                            </span>
                            <button
                                onClick={() => handleCopy(payment.payin_extra_id || "")}
                                className="p-2 hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                            >
                                {copied ? (
                                    <Check className="w-4 h-4 text-green-400" />
                                ) : (
                                    <Copy className="w-4 h-4 text-gray-400" />
                                )}
                            </button>
                        </div>
                    </div>
                )}

                {/* Order ID */}
                {payment.order_id && (
                    <div className="bg-[#1A2040] p-4 rounded-xl border border-gray-700">
                        <label className="block text-xs text-gray-500 mb-2">Order ID</label>
                        <span className="text-sm font-mono text-gray-300">{payment.order_id}</span>
                    </div>
                )}
            </div>

            {/* Check Status Button */}
            <button
                onClick={checkPaymentStatus}
                disabled={checkingStatus}
                className="w-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2 mb-4"
            >
                <RefreshCw className={`w-4 h-4 ${checkingStatus ? "animate-spin" : ""}`} />
                {checkingStatus ? "Checking..." : "Check Payment Status"}
            </button>

            {/* Warning */}
            <div className="bg-red-900/20 border border-red-900/50 rounded-lg p-4">
                <div className="flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-red-300 space-y-1">
                        <p className="font-semibold">Important:</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Send ONLY {payment.pay_currency?.toUpperCase()} to this address</li>
                            <li>Send the exact amount shown above</li>
                            {payment.payin_extra_id && <li>Include the Memo/Tag or your payment will be lost</li>}
                            <li>Do not close this page until payment is confirmed</li>
                            <li>Payment typically confirms within 5-30 minutes</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mt-6 text-xs text-center text-gray-500">
                <p>Powered by NOWPayments • Secure cryptocurrency payment processing</p>
            </div>
        </div>
    );
}
