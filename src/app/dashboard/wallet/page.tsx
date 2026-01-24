"use client";

import { useState, useEffect } from "react";
import {
    ArrowUpRight,
    History,
    TrendingUp,
    Lock,
    Info,
    ShieldCheck,
    Users,
    ChevronRight,
    CreditCard,
    ArrowLeft
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import {
    walletService,
    WalletSummary,
    ReferralEarning
} from "@/services/wallet.service";
import { userService, User } from "@/services/user.service";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function WalletPage() {
    const [user, setUser] = useState<User | null>(null);
    const [summary, setSummary] = useState<WalletSummary | null>(null);
    const [earnings, setEarnings] = useState<ReferralEarning[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const userData = await userService.getCurrentUser();
            setUser(userData);

            const [summaryData, earningsData] = await Promise.all([
                walletService.getSummary(),
                walletService.getEarnings()
            ]);
            setSummary(summaryData);
            setEarnings(Array.isArray(earningsData) ? earningsData : []);
        } catch (error) {
            console.error("Failed to fetch wallet data:", error);
            toast.error("Failed to load wallet data");
            setEarnings([]);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'available':
                return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Available</span>;
            case 'locked':
                return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Locked</span>;
            case 'withdrawn':
                return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Withdrawn</span>;
            default:
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader user={user || undefined} />

            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <Link href="/dashboard" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">My Wallet</h1>
                    <p className="text-gray-500">Manage your referral earnings and withdrawals</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Balance & Actions */}
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
                                            <Link href="/dashboard/wallet/withdraw" className="w-full sm:w-auto">
                                                <button
                                                    disabled={!summary || summary.available_balance < 100}
                                                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 sm:px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-900/20 font-semibold text-sm sm:text-base"
                                                >
                                                    <ArrowUpRight className="w-5 h-5" />
                                                    Withdraw Funds
                                                </button>
                                            </Link>
                                            <Link href="/dashboard/wallet/history" className="w-full sm:w-auto">
                                                <button className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 sm:px-6 py-3 rounded-xl transition-all backdrop-blur-sm font-semibold text-sm sm:text-base">
                                                    <History className="w-5 h-5" />
                                                    History
                                                </button>
                                            </Link>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Recent Earnings */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                    <Users className="w-5 h-5 text-blue-600" />
                                    Recent Referral Earnings
                                </h3>
                            </div>

                            <div className="divide-y divide-gray-50">
                                {loading ? (
                                    <div className="p-8 text-center text-gray-500">Loading...</div>
                                ) : !earnings || earnings.length === 0 ? (
                                    <div className="p-8 text-center text-gray-500">
                                        <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                        <p>No referral earnings yet</p>
                                        <p className="text-sm mt-1">Share your referral link to start earning!</p>
                                    </div>
                                ) : (
                                    earnings.slice(0, 5).map((earning) => (
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
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Info */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
                            <div className="space-y-3">
                                <Link href="/dashboard/wallet/withdraw" className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all group">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-100 p-2 rounded-lg text-blue-600 group-hover:bg-blue-200 transition-colors">
                                            <CreditCard className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium text-gray-700 group-hover:text-blue-700">Request Withdrawal</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                                </Link>
                                <Link href="/dashboard/wallet/history" className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all group">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-purple-100 p-2 rounded-lg text-purple-600 group-hover:bg-purple-200 transition-colors">
                                            <History className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium text-gray-700 group-hover:text-purple-700">View History</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-purple-500" />
                                </Link>
                            </div>
                        </div>

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
                    </div>
                </div>
            </main>
        </div>
    );
}
