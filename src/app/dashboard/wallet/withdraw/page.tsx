"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { userService, User } from "@/services/user.service";
import { walletService, WalletSummary, PaymentMethod, WithdrawRequest } from "@/services/wallet.service";
import { toast } from "react-hot-toast";
import { ArrowLeft, ShieldCheck, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function WithdrawalRequestPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [summary, setSummary] = useState<WalletSummary | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Form State
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [cryptoAddress, setCryptoAddress] = useState("");
    const [cryptoNetwork, setCryptoNetwork] = useState("TRC20");
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("crypto");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userData, summaryData] = await Promise.all([
                    userService.getCurrentUser(),
                    walletService.getSummary()
                ]);
                setUser(userData);
                setSummary(summaryData);
            } catch (error) {
                console.error("Failed to load data:", error);
                toast.error("Failed to load wallet data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleWithdraw = async (e: React.FormEvent) => {
        e.preventDefault();

        const amount = parseFloat(withdrawAmount);
        if (amount < 100) {
            toast.error("Minimum withdrawal amount is $100");
            return;
        }

        if (summary && amount > summary.available_balance) {
            toast.error("Insufficient available balance");
            return;
        }

        if (paymentMethod === 'crypto' && !cryptoAddress) {
            toast.error("Please enter your wallet address");
            return;
        }

        const currency = cryptoNetwork === 'BTC' ? 'BTC' : 'USDT';

        const request: WithdrawRequest = {
            amount,
            payment_method: paymentMethod,
            crypto_details: paymentMethod === 'crypto' ? {
                wallet_address: cryptoAddress,
                network: cryptoNetwork,
                currency: currency
            } : undefined
        };

        setSubmitting(true);
        try {
            await walletService.requestWithdrawal(request);
            toast.success("Withdrawal request submitted successfully");
            router.push('/dashboard/wallet/history');
        } catch (error: any) {
            console.error("Withdrawal failed:", error);
            toast.error(error.response?.data?.detail || error.message || "Withdrawal failed");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader user={user || undefined} />

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="mb-6">
                        <Link href="/dashboard/wallet" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4">
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Back to Wallet
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Request Withdrawal</h1>
                        <p className="text-gray-500">Withdraw your earnings to your preferred payment method.</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 bg-blue-50/50">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Available Balance</p>
                                    <p className="text-2xl font-bold text-blue-600">
                                        ${(summary?.available_balance ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </p>
                                </div>
                                <div className="bg-white p-2 rounded-lg border border-blue-100 shadow-sm">
                                    <ShieldCheck className="w-6 h-6 text-blue-500" />
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleWithdraw} className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (USD)</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                    <input
                                        type="number"
                                        value={withdrawAmount}
                                        onChange={(e) => setWithdrawAmount(e.target.value)}
                                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        placeholder="100.00"
                                        min="100"
                                        max={summary?.available_balance}
                                        required
                                    />
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <p className="text-xs text-gray-500">Minimum withdrawal: $100.00</p>
                                    {summary && summary.available_balance < 100 && (
                                        <p className="text-xs text-red-500 flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3" />
                                            Insufficient balance
                                        </p>
                                    )}
                                </div>
                            </div>


                            {/* Dynamic Fields */}
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                {paymentMethod === 'crypto' && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Network</label>
                                            <select
                                                value={cryptoNetwork}
                                                onChange={(e) => setCryptoNetwork(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            >
                                                <option value="TRC20">USDT (TRC20)</option>
                                                <option value="ERC20">USDT (ERC20)</option>
                                                <option value="BTC">Bitcoin (BTC)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Wallet Address</label>
                                            <input
                                                type="text"
                                                value={cryptoAddress}
                                                onChange={(e) => setCryptoAddress(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                                                placeholder="Enter your wallet address"
                                                required
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={submitting || (summary?.available_balance || 0) < 100}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-900/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {submitting ? (
                                    <>Processing...</>
                                ) : (
                                    <>Request Withdrawal</>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
