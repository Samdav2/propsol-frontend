"use client";

import { useState, useEffect } from "react";
import { walletService, WithdrawalRequest } from "@/services/wallet.service";
import { toast } from "react-hot-toast";
import { CheckCircle, Clock, XCircle, Loader2, Search, ShieldCheck, ExternalLink } from "lucide-react";

export default function AdminPayoutsPage() {
    const [pendingWithdrawals, setPendingWithdrawals] = useState<WithdrawalRequest[]>([]);
    const [payouts, setPayouts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [verifying, setVerifying] = useState<string | null>(null);
    const [verificationCode, setVerificationCode] = useState("");
    const [processingId, setProcessingId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');

    // Rejection Modal State
    const [rejectingId, setRejectingId] = useState<string | null>(null);
    const [rejectionReason, setRejectionReason] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Fetch ALL withdrawals from the system (Endpoint 4)
            // This includes pending, completed, rejected, etc. with user details
            const allWithdrawals = await walletService.getAdminWithdrawals();

            // Filter client-side
            const pending = allWithdrawals.filter(w => w.status === 'pending');
            const history = allWithdrawals.filter(w => w.status !== 'pending');

            setPendingWithdrawals(pending);
            setPayouts(history);
        } catch (error) {
            console.error("Failed to fetch data:", error);
            toast.error("Failed to load payouts data");
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (withdrawalId: string) => {
        if (!confirm("Are you sure you want to approve this withdrawal? This will initiate a payout.")) return;

        setProcessingId(withdrawalId);
        try {
            const response = await walletService.approveWithdrawal(withdrawalId);
            toast.success("Payout initiated! Please verify with 2FA.");
            setVerifying(response.batch_withdrawal_id);
        } catch (error: any) {
            console.error("Approval failed:", error);
            toast.error(error.response?.data?.detail || "Failed to approve withdrawal");
        } finally {
            setProcessingId(null);
        }
    };

    const openRejectModal = (withdrawalId: string) => {
        setRejectingId(withdrawalId);
        setRejectionReason("");
    };

    const confirmReject = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!rejectingId) return;

        setProcessingId(rejectingId);
        try {
            await walletService.updateWithdrawalStatus(rejectingId, {
                status: 'rejected',
                rejection_reason: rejectionReason || "Admin rejected"
            });
            toast.success("Withdrawal rejected successfully");
            setRejectingId(null);
            fetchData(); // Refresh list
        } catch (error: any) {
            console.error("Rejection failed:", error);
            toast.error(error.response?.data?.detail || "Failed to reject withdrawal");
        } finally {
            setProcessingId(null);
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!verifying || !verificationCode) return;

        setProcessingId('verifying');
        try {
            await walletService.verifyPayout(verifying, verificationCode);
            toast.success("Payout verified successfully!");
            setVerifying(null);
            setVerificationCode("");
            fetchData(); // Refresh list
        } catch (error: any) {
            console.error("Verification failed:", error);
            toast.error(error.response?.data?.detail || "Verification failed");
        } finally {
            setProcessingId(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                        Payout Management
                    </h2>
                    <p className="text-slate-500">Manage and verify withdrawal requests.</p>
                </div>
            </div>

            {/* Rejection Modal */}
            {rejectingId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-gray-100 bg-red-50">
                            <h3 className="text-lg font-bold text-red-900 flex items-center gap-2">
                                <XCircle className="w-5 h-5" />
                                Reject Withdrawal
                            </h3>
                            <p className="text-sm text-red-700 mt-1">
                                Please provide a reason for rejecting this withdrawal request. This will be visible to the user.
                            </p>
                        </div>
                        <form onSubmit={confirmReject} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Rejection Reason</label>
                                <textarea
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none min-h-[100px] resize-none"
                                    placeholder="e.g., Invalid wallet address, Suspicious activity..."
                                    autoFocus
                                    required
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setRejectingId(null)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processingId === rejectingId}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors disabled:opacity-70"
                                >
                                    {processingId === rejectingId ? 'Rejecting...' : 'Confirm Rejection'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Verification Modal */}
            {verifying && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-gray-100 bg-blue-50">
                            <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5" />
                                Verify Payout
                            </h3>
                            <p className="text-sm text-blue-700 mt-1">
                                Enter the 2FA code sent to your email/authenticator to confirm this payout batch.
                            </p>
                        </div>
                        <form onSubmit={handleVerify} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
                                <input
                                    type="text"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-center text-lg tracking-widest font-mono"
                                    placeholder="000000"
                                    autoFocus
                                    required
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setVerifying(null)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processingId === 'verifying'}
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-70"
                                >
                                    {processingId === 'verifying' ? 'Verifying...' : 'Verify Payout'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('pending')}
                    className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'pending'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Pending Requests ({pendingWithdrawals.length})
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'history'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Payout History
                </button>
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50/80 text-xs text-slate-500 uppercase">
                            <tr>
                                <th className="px-6 py-4 font-medium">User</th>
                                <th className="px-6 py-4 font-medium">Amount</th>
                                <th className="px-6 py-4 font-medium">Method</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Created At</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center">
                                        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
                                    </td>
                                </tr>
                            ) : activeTab === 'pending' ? (
                                pendingWithdrawals.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                            <p>No pending withdrawals</p>
                                        </td>
                                    </tr>
                                ) : (
                                    pendingWithdrawals.map((withdrawal) => (
                                        <tr key={withdrawal.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-slate-900">{withdrawal.user_name || 'Unknown User'}</span>
                                                    <span className="text-xs text-slate-500">{withdrawal.user_email}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-slate-900">
                                                ${withdrawal.amount.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="capitalize font-medium">{withdrawal.payment_method.replace('_', ' ')}</span>
                                                    {withdrawal.payment_method === 'crypto' && (
                                                        <span className="text-xs text-gray-500 font-mono">
                                                            {withdrawal.crypto_network} • {withdrawal.crypto_wallet_address?.slice(0, 6)}...
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                    <Clock className="w-3 h-3" /> {withdrawal.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500">
                                                {new Date(withdrawal.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => openRejectModal(withdrawal.id)}
                                                        disabled={processingId === withdrawal.id}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 text-xs font-medium rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
                                                    >
                                                        Reject
                                                    </button>
                                                    <button
                                                        onClick={() => handleApprove(withdrawal.id)}
                                                        disabled={processingId === withdrawal.id}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                                                    >
                                                        {processingId === withdrawal.id ? 'Processing...' : 'Approve'}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )
                            ) : (
                                payouts.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                            <p>No payout history found</p>
                                        </td>
                                    </tr>
                                ) : (
                                    payouts.map((payout: any) => (
                                        <tr key={payout.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-slate-900">{payout.user_name || 'Unknown User'}</span>
                                                    <span className="text-xs text-slate-500">{payout.user_email}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-slate-900">
                                                ${payout.amount.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="capitalize font-medium">{payout.payment_method?.replace('_', ' ') || 'Crypto'}</span>
                                                    {payout.payment_method === 'crypto' && (
                                                        <span className="text-xs text-gray-500 font-mono">
                                                            {payout.crypto_network} • {payout.crypto_wallet_address?.slice(0, 6)}...
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${payout.status === 'completed' || payout.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                    payout.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                        'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {payout.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500">
                                                {new Date(payout.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {/* Actions for history items if needed */}
                                            </td>
                                        </tr>
                                    ))
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
