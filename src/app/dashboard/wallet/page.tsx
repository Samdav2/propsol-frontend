"use client";

import { useState, useEffect } from "react";
import {
    Wallet,
    ArrowUpRight,
    History,
    TrendingUp,
    Lock,
    Info,
    X,
    ShieldCheck,
    CheckCircle,
    Clock,
    XCircle,
    Users
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import {
    walletService,
    WalletSummary,
    ReferralEarning,
    WithdrawalRequest,
    WithdrawRequest,
    PaymentMethod
} from "@/services/wallet.service";
import { userService, User } from "@/services/user.service";
import { toast } from "react-hot-toast";

export default function WalletPage() {
    const [user, setUser] = useState<User | null>(null);
    const [summary, setSummary] = useState<WalletSummary | null>(null);
    const [earnings, setEarnings] = useState<ReferralEarning[]>([]);
    const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'earnings' | 'withdrawals'>('earnings');
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

    // Withdrawal Form State
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("crypto");
    const [bankName, setBankName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [accountName, setAccountName] = useState("");
    const [cryptoAddress, setCryptoAddress] = useState("");
    const [cryptoNetwork, setCryptoNetwork] = useState("TRC20");
    const [paypalEmail, setPaypalEmail] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Fetch user data
            const userData = await userService.getCurrentUser();
            setUser(userData);

            const [summaryData, earningsData, withdrawalsData] = await Promise.all([
                walletService.getSummary(),
                walletService.getEarnings(),
                walletService.getWithdrawals()
            ]);
            setSummary(summaryData);
            // Ensure earnings is always an array
            setEarnings(Array.isArray(earningsData) ? earningsData : []);
            // Ensure withdrawals is always an array
            setWithdrawals(Array.isArray(withdrawalsData) ? withdrawalsData : []);
        } catch (error) {
            console.error("Failed to fetch wallet data:", error);
            toast.error("Failed to load wallet data");
            // Set empty arrays on error
            setEarnings([]);
            setWithdrawals([]);
        } finally {
            setLoading(false);
        }
    };

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

        const request: WithdrawRequest = {
            amount,
            payment_method: paymentMethod
        };

        if (paymentMethod === 'bank_transfer') {
            if (!bankName || !accountNumber || !accountName) {
                toast.error("Please fill in all bank details");
                return;
            }
            request.bank_details = {
                bank_name: bankName,
                account_number: accountNumber,
                account_name: accountName
            };
        } else if (paymentMethod === 'crypto') {
            if (!cryptoAddress) {
                toast.error("Please enter your wallet address");
                return;
            }
            // Determine currency from network selection
            const currency = cryptoNetwork === 'BTC' ? 'BTC' : 'USDT';
            request.crypto_details = {
                wallet_address: cryptoAddress,
                network: cryptoNetwork,
                currency: currency
            };
        } else if (paymentMethod === 'paypal') {
            if (!paypalEmail) {
                toast.error("Please enter your PayPal email");
                return;
            }
            request.paypal_email = paypalEmail;
        }

        setSubmitting(true);
        try {
            await walletService.requestWithdrawal(request);
            toast.success("Withdrawal request submitted successfully");
            setIsWithdrawModalOpen(false);
            // Refresh data
            await fetchData();
            // Reset form
            setWithdrawAmount("");
            setBankName("");
            setAccountNumber("");
            setAccountName("");
            setCryptoAddress("");
            setPaypalEmail("");
        } catch (error: any) {
            console.error("Withdrawal failed:", error);
            toast.error(error.response?.data?.detail || error.message || "Withdrawal failed");
        } finally {
            setSubmitting(false);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'available':
            case 'completed':
                return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle className="w-3 h-3" /> {status}</span>;
            case 'locked':
            case 'pending':
                return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3" /> {status}</span>;
            case 'withdrawn':
            case 'approved':
                return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><CheckCircle className="w-3 h-3" /> {status}</span>;
            case 'rejected':
                return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><XCircle className="w-3 h-3" /> {status}</span>;
            default:
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader user={user || undefined} />

            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">My Wallet</h1>
                    <p className="text-gray-500">Manage your referral earnings and withdrawals</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Balance & Transactions */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Balance Card */}
                        <div className="bg-gradient-to-br from-[#0a0e27] to-[#1a235e] rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                            {/* Decorative circles */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>

                            <div className="relative z-10">
                                {loading ? (
                                    <div className="animate-pulse">
                                        <div className="h-4 bg-white/20 rounded w-32 mb-2"></div>
                                        <div className="h-10 bg-white/20 rounded w-48"></div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                            <div>
                                                <p className="text-blue-200 text-sm font-medium mb-1">Available Balance</p>
                                                <h2 className="text-3xl font-bold tracking-tight">
                                                    ${(summary?.available_balance ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                </h2>
                                                <p className="text-xs text-blue-300 mt-1">Ready for withdrawal</p>
                                            </div>

                                            {/* Locked Balance Display */}
                                            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Lock className="w-4 h-4 text-yellow-400" />
                                                    <span className="text-sm font-medium text-blue-100">Locked</span>
                                                    <div className="group relative">
                                                        <Info className="w-4 h-4 text-blue-300 cursor-help" />
                                                        <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-gray-900 text-xs text-white rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                                                            Earnings from Guaranteed Pass referrals are locked until the referred user passes their challenge.
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-xl font-bold text-white">
                                                    ${(summary?.locked_balance ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                </div>
                                            </div>

                                            {/* Total Earned */}
                                            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <TrendingUp className="w-4 h-4 text-green-400" />
                                                    <span className="text-sm font-medium text-blue-100">Total Earned</span>
                                                </div>
                                                <div className="text-xl font-bold text-white">
                                                    ${(earnings.reduce((sum, e) => sum + (e.amount || 0), 0)).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                            <button
                                                onClick={() => setIsWithdrawModalOpen(true)}
                                                disabled={!summary || summary.available_balance < 100}
                                                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 sm:px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-900/20 font-semibold text-sm sm:text-base"
                                            >
                                                <ArrowUpRight className="w-5 h-5" />
                                                Withdraw Funds
                                            </button>
                                            {summary && summary.available_balance < 100 && (
                                                <span className="text-xs text-yellow-300 self-center text-center sm:text-left">Min. $100 required</span>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="flex border-b border-gray-100">
                                <button
                                    onClick={() => setActiveTab('earnings')}
                                    className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${activeTab === 'earnings'
                                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    <Users className="w-4 h-4" />
                                    Referral Earnings
                                </button>
                                <button
                                    onClick={() => setActiveTab('withdrawals')}
                                    className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${activeTab === 'withdrawals'
                                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    <History className="w-4 h-4" />
                                    Withdrawal History
                                </button>
                            </div>

                            <div className="divide-y divide-gray-50">
                                {loading ? (
                                    <div className="p-8 text-center text-gray-500">Loading...</div>
                                ) : activeTab === 'earnings' ? (
                                    !earnings || earnings.length === 0 ? (
                                        <div className="p-8 text-center text-gray-500">
                                            <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                            <p>No referral earnings yet</p>
                                            <p className="text-sm mt-1">Share your referral link to start earning!</p>
                                        </div>
                                    ) : (
                                        earnings.map((earning) => (
                                            <div key={earning.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-3 rounded-full ${earning.status === 'available' ? 'bg-green-100 text-green-600' :
                                                        earning.status === 'locked' ? 'bg-yellow-100 text-yellow-600' :
                                                            'bg-blue-100 text-blue-600'
                                                        }`}>
                                                        {earning.status === 'locked' ? <Lock className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900">
                                                            {earning.referred_user_name || 'Referred User'}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            {earning.pass_type === 'standard_pass' ? 'Standard Pass' : 'Guaranteed Pass'} • {new Date(earning.created_at).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-green-600">+${earning.amount.toFixed(2)}</p>
                                                    {getStatusBadge(earning.status)}
                                                </div>
                                            </div>
                                        ))
                                    )
                                ) : (
                                    !withdrawals || withdrawals.length === 0 ? (
                                        <div className="p-8 text-center text-gray-500">
                                            <History className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                            <p>No withdrawals yet</p>
                                        </div>
                                    ) : (
                                        withdrawals.map((withdrawal) => (
                                            <div key={withdrawal.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 rounded-full bg-red-100 text-red-600">
                                                        <ArrowUpRight className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900 capitalize">
                                                            {withdrawal.payment_method.replace('_', ' ')}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            {new Date(withdrawal.created_at).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-gray-900">-${withdrawal.amount.toFixed(2)}</p>
                                                    {getStatusBadge(withdrawal.status)}
                                                </div>
                                            </div>
                                        ))
                                    )
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Info */}
                    <div className="space-y-6">
                        {/* Security Notice */}
                        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                            <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5" />
                                Secure Withdrawals
                            </h4>
                            <p className="text-sm text-blue-700">
                                All withdrawals are reviewed by our team for security. Processing typically takes 1-3 business days.
                            </p>
                        </div>

                        {/* Withdrawal Rules */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <h4 className="font-semibold text-gray-900 mb-4">Earning Rules</h4>
                            <ul className="space-y-3 text-sm text-gray-600">
                                <li className="flex items-start gap-2">
                                    <div className="min-w-[6px] h-[6px] rounded-full bg-green-500 mt-1.5"></div>
                                    <span><strong>2% Commission</strong> on each referral purchase.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="min-w-[6px] h-[6px] rounded-full bg-blue-500 mt-1.5"></div>
                                    <span>Standard Pass earnings are available immediately.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="min-w-[6px] h-[6px] rounded-full bg-yellow-500 mt-1.5"></div>
                                    <span>Guaranteed Pass earnings unlock after challenge is passed.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="min-w-[6px] h-[6px] rounded-full bg-gray-400 mt-1.5"></div>
                                    <span>Minimum withdrawal is <strong>$100</strong>.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Payment Methods */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <h4 className="font-semibold text-gray-900 mb-4">Payout Methods</h4>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold">₮</div>
                                    <span className="font-medium text-gray-900">USDT (TRC20/ERC20)</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl">
                                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 font-bold">₿</div>
                                    <span className="font-medium text-gray-900">Bitcoin</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">🏦</div>
                                    <span className="font-medium text-gray-900">Bank Transfer</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl">
                                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold">P</div>
                                    <span className="font-medium text-gray-900">PayPal</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Withdrawal Modal */}
            {isWithdrawModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 sticky top-0">
                            <h3 className="text-lg font-bold text-gray-900">Withdraw Funds</h3>
                            <button
                                onClick={() => setIsWithdrawModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleWithdraw} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (USD)</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                    <input
                                        type="number"
                                        value={withdrawAmount}
                                        onChange={(e) => setWithdrawAmount(e.target.value)}
                                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        placeholder="100.00"
                                        min="100"
                                        max={summary?.available_balance}
                                        required
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    Available: ${summary?.available_balance.toLocaleString()} • Min: $100
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                                <select
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                >
                                    <option value="crypto">Cryptocurrency</option>
                                    <option value="bank_transfer">Bank Transfer</option>
                                    <option value="paypal">PayPal</option>
                                </select>
                            </div>

                            {/* Conditional Fields based on Payment Method */}
                            {paymentMethod === 'bank_transfer' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                                        <input
                                            type="text"
                                            value={bankName}
                                            onChange={(e) => setBankName(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                            placeholder="e.g., GTBank"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                                        <input
                                            type="text"
                                            value={accountNumber}
                                            onChange={(e) => setAccountNumber(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                            placeholder="0123456789"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
                                        <input
                                            type="text"
                                            value={accountName}
                                            onChange={(e) => setAccountName(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                </>
                            )}

                            {paymentMethod === 'crypto' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Network</label>
                                        <select
                                            value={cryptoNetwork}
                                            onChange={(e) => setCryptoNetwork(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
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
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-mono text-sm"
                                            placeholder="Enter your wallet address"
                                            required
                                        />
                                    </div>
                                </>
                            )}

                            {paymentMethod === 'paypal' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">PayPal Email</label>
                                    <input
                                        type="email"
                                        value={paypalEmail}
                                        onChange={(e) => setPaypalEmail(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>
                            )}

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {submitting ? 'Processing...' : 'Submit Withdrawal Request'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
