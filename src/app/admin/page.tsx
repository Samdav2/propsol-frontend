"use client";

import { useEffect, useState } from "react";
import { adminService, AdminStats } from "@/services/admin.service";
import { adminAffiliateService, AffiliateDashboardStats, TopAffiliateItem } from "@/services/admin-affiliate.service";
import { PropFirmRegistration } from "@/services/prop-firm.service";
import { StatsCard } from "@/components/admin/StatsCard";
import { Users, DollarSign, Briefcase, Activity, Share2, CheckCircle, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [affiliateStats, setAffiliateStats] = useState<AffiliateDashboardStats | null>(null);
    const [topAffiliates, setTopAffiliates] = useState<TopAffiliateItem[]>([]);
    const [recentPaidOrders, setRecentPaidOrders] = useState<PropFirmRegistration[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [adminData, affiliateData, topAffiliatesData, propFirmData] = await Promise.all([
                    adminService.getStats(),
                    adminAffiliateService.getDashboardStats(),
                    adminAffiliateService.getTopAffiliates(5),
                    adminService.getPropFirmRegistrations()
                ]);
                setStats(adminData);
                setAffiliateStats(affiliateData);
                setTopAffiliates(topAffiliatesData);

                // Filter for paid/confirmed orders and get recent 5
                const paidOrders = propFirmData
                    .filter((r: PropFirmRegistration) =>
                        r.payment_status === "finished" ||
                        r.payment_status === "confirmed" ||
                        r.payment_status === "completed" ||
                        r.payment_status === "successful"
                    )
                    .sort((a: PropFirmRegistration, b: PropFirmRegistration) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                    .slice(0, 5);
                setRecentPaidOrders(paidOrders);
            } catch (error) {
                console.error("Failed to fetch admin stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
        );
    }

    const totalUsers = stats?.total_users || 0;
    const totalRevenue = stats?.total_revenue || 0;
    const activePropFirms = stats?.active_prop_firms || 0;
    const pendingRegistrations = stats?.pending_registrations || 0;
    const activeAffiliates = affiliateStats?.active_affiliates_count || 0;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    return (
        <div className="space-y-8">
            {/* Enhanced Header */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 rounded-2xl -z-10" />
                <div className="py-2">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                        Dashboard Overview
                    </h2>
                    <p className="text-slate-500 mt-1">Welcome back, here's what's happening today.</p>
                </div>
            </div>

            {/* 5-column grid for all cards in one line */}
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                <StatsCard
                    title="Total Users"
                    value={totalUsers}
                    icon={Users}
                    color="blue"
                    trend={{ value: 12, isPositive: true }}
                />
                <StatsCard
                    title="Earning Affiliates"
                    value={activeAffiliates}
                    icon={Share2}
                    color="indigo"
                />
                <StatsCard
                    title="Total Revenue"
                    value={`$${totalRevenue.toLocaleString()}`}
                    icon={DollarSign}
                    color="green"
                    trend={{ value: 8, isPositive: true }}
                />
                <StatsCard
                    title="Active Prop Firms"
                    value={activePropFirms}
                    icon={Briefcase}
                    color="purple"
                />
                <StatsCard
                    title="Pending Registrations"
                    value={pendingRegistrations}
                    icon={Activity}
                    color="orange"
                />
            </div>

            {/* Data Tables */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Recent Paid Orders */}
                <div className="rounded-2xl bg-white p-6 shadow-lg border border-slate-100">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg shadow-green-500/20">
                                <CheckCircle className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Recent Paid Orders</h3>
                        </div>
                        <Link
                            href="/admin/payments"
                            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            View All <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {recentPaidOrders.length > 0 ? (
                        <div className="space-y-3">
                            {recentPaidOrders.map((order) => (
                                <div key={order.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                                            {order.propfirm_name.slice(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900 text-sm">{order.propfirm_name}</p>
                                            <p className="text-xs text-slate-500">Order: {order.order_id}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-green-600">{formatCurrency(order.propfirm_account_cost)}</p>
                                        <p className="text-xs text-slate-500">{new Date(order.created_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-slate-400">
                            <Clock className="w-12 h-12 mb-2 opacity-50" />
                            <p className="text-sm">No paid orders yet</p>
                        </div>
                    )}
                </div>

                {/* Top Affiliates */}
                <div className="rounded-2xl bg-white p-6 shadow-lg border border-slate-100">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-xl shadow-lg shadow-purple-500/20">
                                <Share2 className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Top Affiliates</h3>
                        </div>
                        <Link
                            href="/admin/affiliates"
                            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            View All <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {topAffiliates.length > 0 ? (
                        <div className="space-y-3">
                            {topAffiliates.map((affiliate, index) => (
                                <div key={affiliate.user_id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${index === 0 ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white' :
                                            index === 1 ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-white' :
                                                index === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white' :
                                                    'bg-slate-200 text-slate-600'
                                            }`}>
                                            {index + 1}
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900 text-sm">{affiliate.name}</p>
                                            <p className="text-xs text-slate-500 font-mono">{affiliate.referral_code}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-green-600">{formatCurrency(affiliate.total_earnings)}</p>
                                        <p className="text-xs text-slate-500">{affiliate.total_referrals} referrals</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-slate-400">
                            <Users className="w-12 h-12 mb-2 opacity-50" />
                            <p className="text-sm">No affiliates yet</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
