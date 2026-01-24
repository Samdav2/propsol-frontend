"use client";

import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { userService, User } from "@/services/user.service";
import { walletService, WithdrawalRequest } from "@/services/wallet.service";
import { toast } from "react-hot-toast";
import { ArrowLeft, History, CheckCircle, Clock, XCircle, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function WithdrawalHistoryPage() {
    const [user, setUser] = useState<User | null>(null);
    const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userData, withdrawalsData] = await Promise.all([
                    userService.getCurrentUser(),
                    walletService.getWithdrawals()
                ]);
                setUser(userData);
                setWithdrawals(Array.isArray(withdrawalsData) ? withdrawalsData : []);
            } catch (error) {
                console.error("Failed to load data:", error);
                toast.error("Failed to load history");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'completed':
            case 'approved':
                return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle className="w-3 h-3" /> {status}</span>;
            case 'pending':
                return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3" /> {status}</span>;
            case 'rejected':
                return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><XCircle className="w-3 h-3" /> {status}</span>;
            default:
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
        }
    };

    if (loading) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader user={user || undefined} />

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-6">
                        <Link href="/dashboard/wallet" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4">
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Back to Wallet
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Withdrawal History</h1>
                        <p className="text-gray-500">View all your past withdrawal requests.</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="divide-y divide-gray-50">
                            {withdrawals.length === 0 ? (
                                <div className="p-12 text-center text-gray-500">
                                    <History className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                    <p>No withdrawals found</p>
                                </div>
                            ) : (
                                withdrawals.map((withdrawal) => (
                                    <div key={withdrawal.id} className="p-6 hover:bg-gray-50 transition-colors">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 rounded-full bg-blue-50 text-blue-600">
                                                    <ArrowUpRight className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="font-semibold text-gray-900 capitalize">
                                                            {withdrawal.payment_method.replace('_', ' ')}
                                                        </span>
                                                        <span className="text-xs text-gray-400">•</span>
                                                        <span className="text-sm text-gray-500">
                                                            {new Date(withdrawal.created_at).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        {withdrawal.payment_method === 'crypto' && (
                                                            <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">
                                                                {withdrawal.crypto_network} • {withdrawal.crypto_wallet_address?.slice(0, 6)}...{withdrawal.crypto_wallet_address?.slice(-4)}
                                                            </span>
                                                        )}
                                                        {withdrawal.payment_method === 'bank_transfer' && (
                                                            <span>{withdrawal.bank_name} • {withdrawal.bank_account_number?.slice(-4)}</span>
                                                        )}
                                                        {withdrawal.payment_method === 'paypal' && (
                                                            <span>{withdrawal.paypal_email}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                                                <div className="text-right">
                                                    <p className="font-bold text-gray-900 text-lg">
                                                        ${withdrawal.amount.toFixed(2)}
                                                    </p>
                                                </div>
                                                {getStatusBadge(withdrawal.status)}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
