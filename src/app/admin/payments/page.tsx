"use client";

import { useEffect, useState } from "react";
import { adminService } from "@/services/admin.service";
import { PropFirmRegistration } from "@/services/prop-firm.service";
import { Search, CheckCircle, Clock, XCircle, Loader2, DollarSign, Briefcase, Filter } from "lucide-react";

type StatusFilter = "all" | "paid" | "pending" | "failed";

export default function PaymentsPage() {
    const [registrations, setRegistrations] = useState<PropFirmRegistration[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

    useEffect(() => {
        const fetchRegistrations = async () => {
            try {
                const data = await adminService.getPropFirmRegistrations();
                setRegistrations(data);
            } catch (error) {
                console.error("Failed to fetch registrations", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRegistrations();
    }, []);

    // Filter registrations based on search and status
    const filteredRegistrations = registrations.filter((reg) => {
        const matchesSearch =
            reg.propfirm_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reg.order_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reg.login_id.toLowerCase().includes(searchTerm.toLowerCase());

        if (statusFilter === "all") return matchesSearch;
        if (statusFilter === "paid") return matchesSearch && (reg.payment_status === "finished" || reg.payment_status === "confirmed" || reg.payment_status === "completed" || reg.payment_status === "successful");
        if (statusFilter === "pending") return matchesSearch && (reg.payment_status === "pending" || reg.payment_status === "waiting" || reg.payment_status === "confirming");
        if (statusFilter === "failed") return matchesSearch && (reg.payment_status === "failed" || reg.payment_status === "expired" || reg.payment_status === "refunded");
        return matchesSearch;
    });

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const getPaymentStatusBadge = (status?: string) => {
        switch (status) {
            case "finished":
            case "confirmed":
            case "completed":
            case "successful":
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                        <CheckCircle className="w-3 h-3" /> Paid
                    </span>
                );
            case "pending":
            case "waiting":
            case "confirming":
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">
                        <Clock className="w-3 h-3" /> Pending
                    </span>
                );
            case "failed":
            case "expired":
            case "refunded":
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                        <XCircle className="w-3 h-3" /> {status === "refunded" ? "Refunded" : "Failed"}
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                        Unknown
                    </span>
                );
        }
    };

    const getAccountStatusBadge = (status: string) => {
        const colors: Record<string, string> = {
            pending: "bg-yellow-100 text-yellow-700",
            in_progress: "bg-blue-100 text-blue-700",
            passed: "bg-green-100 text-green-700",
            failed: "bg-red-100 text-red-700",
        };
        return (
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${colors[status] || "bg-slate-100"}`}>
                {status.replace("_", " ")}
            </span>
        );
    };

    // Count stats
    const paidCount = registrations.filter(r => r.payment_status === "finished" || r.payment_status === "confirmed" || r.payment_status === "completed" || r.payment_status === "successful").length;
    const pendingCount = registrations.filter(r => r.payment_status === "pending" || r.payment_status === "waiting" || r.payment_status === "confirming").length;
    const failedCount = registrations.filter(r => r.payment_status === "failed" || r.payment_status === "expired" || r.payment_status === "refunded").length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                        Prop Firm Payments
                    </h2>
                    <p className="text-slate-500">View all prop firm registration payments and their status.</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg shadow-green-500/20">
                        <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-slate-900">{paidCount}</p>
                        <p className="text-sm text-slate-500">Paid Orders</p>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl shadow-lg shadow-amber-500/20">
                        <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-slate-900">{pendingCount}</p>
                        <p className="text-sm text-slate-500">Pending Payments</p>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl shadow-lg shadow-red-500/20">
                        <XCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-slate-900">{failedCount}</p>
                        <p className="text-sm text-slate-500">Failed/Refunded</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex gap-2 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm">
                    {[
                        { id: "all", label: "All", count: registrations.length },
                        { id: "paid", label: "Paid", count: paidCount },
                        { id: "pending", label: "Pending", count: pendingCount },
                        { id: "failed", label: "Failed", count: failedCount },
                    ].map((filter) => (
                        <button
                            key={filter.id}
                            onClick={() => setStatusFilter(filter.id as StatusFilter)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${statusFilter === filter.id
                                ? "bg-slate-900 text-white shadow"
                                : "text-slate-600 hover:bg-slate-50"
                                }`}
                        >
                            {filter.label} <span className="opacity-60">({filter.count})</span>
                        </button>
                    ))}
                </div>

                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        className="w-full py-2.5 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Search by prop firm, order ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50/80 text-xs text-slate-500 uppercase">
                            <tr>
                                <th className="px-6 py-4 font-medium">Order Details</th>
                                <th className="px-6 py-4 font-medium">Account Info</th>
                                <th className="px-6 py-4 font-medium">Amount</th>
                                <th className="px-6 py-4 font-medium">Account Status</th>
                                <th className="px-6 py-4 font-medium">Payment Status</th>
                                <th className="px-6 py-4 font-medium">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center">
                                        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
                                    </td>
                                </tr>
                            ) : filteredRegistrations.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                        <Briefcase className="w-12 h-12 mx-auto mb-2 opacity-30" />
                                        <p>No registrations found</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredRegistrations.map((reg) => (
                                    <tr key={reg.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                                                    {reg.propfirm_name.slice(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-900">{reg.propfirm_name}</p>
                                                    <p className="text-xs text-slate-500 font-mono">{reg.order_id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-slate-700">{formatCurrency(reg.account_size)}</p>
                                            <p className="text-xs text-slate-500">{reg.challenges_step} Step • {reg.trading_platform}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-green-600">{formatCurrency(reg.propfirm_account_cost)}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getAccountStatusBadge(reg.account_status)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {getPaymentStatusBadge(reg.payment_status)}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">
                                            {new Date(reg.created_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="px-6 py-3 bg-slate-50/50 border-t border-slate-100 text-sm text-slate-500">
                    Showing {filteredRegistrations.length} of {registrations.length} registrations
                </div>
            </div>
        </div>
    );
}
