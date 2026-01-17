"use client";

import { useState, useEffect } from "react";
import {
    LayoutDashboard,
    BarChart3,
    Settings,
    Search,
    DollarSign,
    Users,
    TrendingUp,
    Percent,
    Save,
    Loader2,
    CheckCircle,
    AlertCircle,
    ArrowUpRight,
    Briefcase,
    X,
    Edit3,
    UserCheck
} from "lucide-react";
import { toast } from "react-hot-toast";
import {
    adminAffiliateService,
    AffiliateDashboardStats,
    TopAffiliateItem,
    ProductAffiliateStats,
    GlobalSettingsResponse,
    AffiliateUserDetail
} from "@/services/admin-affiliate.service";
import { adminService } from "@/services/admin.service";

export default function AdminAffiliateDashboard() {
    const [activeTab, setActiveTab] = useState<"overview" | "performance" | "settings" | "manage">("overview");
    const [loading, setLoading] = useState(true);

    // Data States
    const [stats, setStats] = useState<AffiliateDashboardStats | null>(null);
    const [topAffiliates, setTopAffiliates] = useState<TopAffiliateItem[]>([]);
    const [productStats, setProductStats] = useState<ProductAffiliateStats[]>([]);
    const [globalSettings, setGlobalSettings] = useState<GlobalSettingsResponse | null>(null);

    // Manage Affiliate State - User List
    const [allUsers, setAllUsers] = useState<any[]>([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [userSearchQuery, setUserSearchQuery] = useState("");
    const [selectedUser, setSelectedUser] = useState<AffiliateUserDetail | null>(null);
    const [updatingSettings, setUpdatingSettings] = useState(false);

    // Fetch initial data
    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const [statsData, topData, productsData, settingsData] = await Promise.all([
                adminAffiliateService.getDashboardStats(),
                adminAffiliateService.getTopAffiliates(10),
                adminAffiliateService.getProductStats(),
                adminAffiliateService.getGlobalSettings()
            ]);

            setStats(statsData);
            setTopAffiliates(topData);
            setProductStats(productsData);
            setGlobalSettings(settingsData);
        } catch (error) {
            console.error("Failed to fetch dashboard data", error);
            toast.error("Failed to load dashboard data");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateGlobalSettings = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!globalSettings) return;

        setUpdatingSettings(true);
        try {
            await adminAffiliateService.updateGlobalSettings({
                default_commission_rate: Number(globalSettings.default_commission_rate),
                minimum_withdrawal_amount: Number(globalSettings.minimum_withdrawal_amount),
                is_program_enabled: globalSettings.is_program_enabled
            });
            toast.success("Global settings updated successfully");
        } catch (error) {
            toast.error("Failed to update settings");
        } finally {
            setUpdatingSettings(false);
        }
    };

    // Fetch all users when manage tab is active
    const fetchAllUsers = async () => {
        setLoadingUsers(true);
        try {
            const users = await adminService.getUsers();
            setAllUsers(users);
        } catch (error) {
            console.error("Failed to fetch users", error);
            toast.error("Failed to load users");
        } finally {
            setLoadingUsers(false);
        }
    };

    // Load users when switching to manage tab
    useEffect(() => {
        if (activeTab === "manage" && allUsers.length === 0) {
            fetchAllUsers();
        }
    }, [activeTab]);

    // Filter users based on search query
    const filteredUsers = allUsers.filter(user =>
        user.name?.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
        user.referral_code?.toLowerCase().includes(userSearchQuery.toLowerCase())
    );

    // Select a user and fetch their affiliate details
    const handleSelectUser = async (userId: string) => {
        try {
            const data = await adminAffiliateService.getAffiliateDetails(userId);
            setSelectedUser(data);
        } catch (error) {
            toast.error("Failed to load affiliate details");
        }
    };

    const handleUpdateAffiliate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUser) return;

        setUpdatingSettings(true);
        try {
            await adminAffiliateService.updateAffiliateSettings(selectedUser.user_id, {
                custom_rate: selectedUser.custom_rate,
                is_enabled: selectedUser.is_enabled,
                notes: "Updated via admin dashboard"
            });
            toast.success("Affiliate settings updated");
            // Refresh details
            const data = await adminAffiliateService.getAffiliateDetails(selectedUser.user_id);
            setSelectedUser(data);
        } catch (error) {
            toast.error("Failed to update affiliate");
        } finally {
            setUpdatingSettings(false);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    if (loading && !stats) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Affiliate Management</h1>
                    <p className="text-slate-500">Monitor performance and manage commission structures</p>
                </div>
                <div className="flex gap-1.5 bg-slate-50/80 backdrop-blur-sm p-1.5 rounded-xl border border-slate-200/60 shadow-inner">
                    {[
                        { id: "overview", label: "Overview", icon: LayoutDashboard, gradient: "from-blue-500 to-indigo-600" },
                        { id: "performance", label: "Performance", icon: BarChart3, gradient: "from-emerald-500 to-teal-600" },
                        { id: "settings", label: "Settings", icon: Settings, gradient: "from-slate-500 to-slate-700" },
                        { id: "manage", label: "Manage Affiliate", icon: Search, gradient: "from-purple-500 to-fuchsia-600" },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`relative flex items-center gap-2.5 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${activeTab === tab.id
                                ? "bg-white text-slate-900 shadow-lg shadow-slate-200/50"
                                : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
                                }`}
                        >
                            <div className={`relative p-1.5 rounded-lg transition-all duration-300 ${activeTab === tab.id
                                ? `bg-gradient-to-br ${tab.gradient} shadow-sm`
                                : "bg-slate-100"
                                }`}>
                                <tab.icon className={`w-4 h-4 transition-colors ${activeTab === tab.id ? "text-white" : "text-slate-500"}`} />
                            </div>
                            <span className="relative">
                                {tab.label}
                                {activeTab === tab.id && (
                                    <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/50 to-indigo-500/50 rounded-full" />
                                )}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="min-h-[500px]">
                {/* OVERVIEW TAB */}
                {activeTab === "overview" && stats && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatsCard
                                title="Total Earnings Paid"
                                value={formatCurrency(stats.total_earnings_paid)}
                                icon={DollarSign}
                                color="bg-green-500"
                            />
                            <StatsCard
                                title="Pending Earnings"
                                value={formatCurrency(stats.total_pending_earnings)}
                                icon={AlertCircle}
                                color="bg-yellow-500"
                            />
                            <StatsCard
                                title="Total Referrals"
                                value={stats.total_signups.toString()}
                                icon={Users}
                                color="bg-blue-500"
                            />
                            <StatsCard
                                title="Conversion Rate"
                                value={`${(stats.conversion_rate * 100).toFixed(1)}%`}
                                icon={Percent}
                                color="bg-purple-500"
                            />
                        </div>

                        {/* Top Affiliates Table */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="font-semibold text-slate-900">Top Performing Affiliates</h3>
                                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-slate-500 uppercase bg-slate-50/50">
                                        <tr>
                                            <th className="px-6 py-3 font-medium">Affiliate Name</th>
                                            <th className="px-6 py-3 font-medium">Referral Code</th>
                                            <th className="px-6 py-3 font-medium text-right">Total Referrals</th>
                                            <th className="px-6 py-3 font-medium text-right">Total Earnings</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {topAffiliates.map((affiliate) => (
                                            <tr key={affiliate.user_id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-4 font-medium text-slate-900">{affiliate.name}</td>
                                                <td className="px-6 py-4">
                                                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-mono">
                                                        {affiliate.referral_code}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right text-slate-600">{affiliate.total_referrals}</td>
                                                <td className="px-6 py-4 text-right font-medium text-green-600">
                                                    {formatCurrency(affiliate.total_earnings)}
                                                </td>
                                            </tr>
                                        ))}
                                        {topAffiliates.length === 0 && (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                                                    No affiliate data available yet.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* PERFORMANCE TAB */}
                {activeTab === "performance" && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {productStats.map((product, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <h3 className="font-bold text-lg text-slate-900">{product.product_name}</h3>
                                            <p className="text-sm text-slate-500">Product Performance</p>
                                        </div>
                                        <div className="p-2 bg-blue-50 rounded-lg">
                                            <Briefcase className="w-5 h-5 text-blue-600" />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                                            <span className="text-sm text-slate-600">Total Sales Count</span>
                                            <span className="font-bold text-slate-900">{product.total_sales_count}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                                            <span className="text-sm text-slate-600">Sales Volume</span>
                                            <span className="font-bold text-slate-900">{formatCurrency(product.total_sales_volume)}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-100">
                                            <span className="text-sm text-green-700 font-medium">Commission Generated</span>
                                            <span className="font-bold text-green-700">{formatCurrency(product.total_commission_generated)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* SETTINGS TAB */}
                {activeTab === "settings" && globalSettings && (
                    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                                <h3 className="font-semibold text-slate-900">Global Affiliate Configuration</h3>
                                <p className="text-sm text-slate-500 mt-1">These settings apply to all affiliates unless overridden individually.</p>
                            </div>

                            <form onSubmit={handleUpdateGlobalSettings} className="p-6 space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            Default Commission Rate (0.01 = 1%)
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                max="1"
                                                value={globalSettings.default_commission_rate}
                                                onChange={(e) => setGlobalSettings({ ...globalSettings, default_commission_rate: parseFloat(e.target.value) })}
                                                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            />
                                            <Percent className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                                        </div>
                                        <p className="text-xs text-slate-500 mt-1">
                                            Current: {(globalSettings.default_commission_rate * 100).toFixed(1)}%
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            Minimum Withdrawal Amount ($)
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                min="0"
                                                value={globalSettings.minimum_withdrawal_amount}
                                                onChange={(e) => setGlobalSettings({ ...globalSettings, minimum_withdrawal_amount: parseFloat(e.target.value) })}
                                                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            />
                                            <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                                        <div>
                                            <span className="block text-sm font-medium text-slate-900">Enable Affiliate Program</span>
                                            <span className="text-xs text-slate-500">Allow new signups and commission generation</span>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={globalSettings.is_program_enabled}
                                                onChange={(e) => setGlobalSettings({ ...globalSettings, is_program_enabled: e.target.checked })}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-100 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={updatingSettings}
                                        className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg shadow-blue-500/20"
                                    >
                                        {updatingSettings ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* MANAGE AFFILIATE TAB */}
                {activeTab === "manage" && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Header with Search */}
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">User Commission Management</h3>
                                    <p className="text-slate-500 text-sm">Search and select a user to configure their affiliate commission rate</p>
                                </div>
                                <div className="relative w-full md:w-80">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search by name, email, or referral code..."
                                        value={userSearchQuery}
                                        onChange={(e) => setUserSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* User List Table */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                            {loadingUsers ? (
                                <div className="flex items-center justify-center py-20">
                                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="text-xs text-slate-500 uppercase bg-slate-50/80">
                                            <tr>
                                                <th className="px-6 py-4 font-medium">User</th>
                                                <th className="px-6 py-4 font-medium">Email</th>
                                                <th className="px-6 py-4 font-medium">Referral Code</th>
                                                <th className="px-6 py-4 font-medium">Status</th>
                                                <th className="px-6 py-4 font-medium text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {filteredUsers.length > 0 ? (
                                                filteredUsers.map((user) => (
                                                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm">
                                                                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                                                                </div>
                                                                <span className="font-medium text-slate-900">{user.name || "Unknown"}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-slate-600">{user.email}</td>
                                                        <td className="px-6 py-4">
                                                            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-mono">
                                                                {user.referral_code || "N/A"}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${user.Status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                                {user.Status ? "Active" : "Inactive"}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <button
                                                                onClick={() => handleSelectUser(user.id)}
                                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg text-xs font-medium hover:from-blue-600 hover:to-indigo-700 transition-all shadow-sm hover:shadow"
                                                            >
                                                                <Edit3 className="w-3.5 h-3.5" />
                                                                Edit Rate
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                                        {userSearchQuery ? "No users match your search." : "No users found."}
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* Footer with count */}
                            <div className="px-6 py-3 bg-slate-50/50 border-t border-slate-100 text-sm text-slate-500">
                                Showing {filteredUsers.length} of {allUsers.length} users
                            </div>
                        </div>

                        {/* Edit User Modal */}
                        {selectedUser && (
                            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedUser(null)}>
                                <div
                                    className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {/* Modal Header */}
                                    <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                                                {selectedUser.name?.charAt(0)?.toUpperCase() || "U"}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-slate-900">{selectedUser.name}</h3>
                                                <p className="text-xs text-slate-500">{selectedUser.email}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setSelectedUser(null)}
                                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                        >
                                            <X className="w-5 h-5 text-slate-500" />
                                        </button>
                                    </div>

                                    {/* Modal Body */}
                                    <div className="p-6">
                                        {/* Stats Summary */}
                                        <div className="grid grid-cols-2 gap-3 mb-6">
                                            <div className="p-3 bg-slate-50 rounded-lg">
                                                <p className="text-xs text-slate-500">Total Referrals</p>
                                                <p className="text-lg font-bold text-slate-900">{selectedUser.total_referrals}</p>
                                            </div>
                                            <div className="p-3 bg-slate-50 rounded-lg">
                                                <p className="text-xs text-slate-500">Total Earnings</p>
                                                <p className="text-lg font-bold text-green-600">{formatCurrency(selectedUser.total_earnings)}</p>
                                            </div>
                                            <div className="p-3 bg-slate-50 rounded-lg">
                                                <p className="text-xs text-slate-500">Pending</p>
                                                <p className="text-lg font-bold text-yellow-600">{formatCurrency(selectedUser.pending_earnings)}</p>
                                            </div>
                                            <div className="p-3 bg-slate-50 rounded-lg">
                                                <p className="text-xs text-slate-500">Paid Out</p>
                                                <p className="text-lg font-bold text-blue-600">{formatCurrency(selectedUser.paid_earnings)}</p>
                                            </div>
                                        </div>

                                        {/* Commission Form */}
                                        <form onSubmit={handleUpdateAffiliate} className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                                    Custom Commission Rate
                                                </label>
                                                <div className="flex gap-2">
                                                    <div className="relative flex-1">
                                                        <input
                                                            type="number"
                                                            step="0.01"
                                                            min="0"
                                                            max="1"
                                                            placeholder="Use default rate"
                                                            value={selectedUser.custom_rate ?? ""}
                                                            onChange={(e) => setSelectedUser({
                                                                ...selectedUser,
                                                                custom_rate: e.target.value ? parseFloat(e.target.value) : null
                                                            })}
                                                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                        />
                                                        <Percent className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => setSelectedUser({ ...selectedUser, custom_rate: null })}
                                                        className="px-4 py-2.5 text-sm text-slate-600 hover:text-slate-800 border border-slate-200 rounded-lg hover:bg-slate-50"
                                                    >
                                                        Reset
                                                    </button>
                                                </div>
                                                <p className="text-xs text-slate-500 mt-1.5">
                                                    Current Effective Rate: <span className="font-semibold text-blue-600">{(selectedUser.current_commission_rate * 100).toFixed(1)}%</span>
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                                                <div>
                                                    <span className="block text-sm font-medium text-slate-900">Affiliate Status</span>
                                                    <span className="text-xs text-slate-500">Enable or disable affiliate earnings</span>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedUser.is_enabled}
                                                        onChange={(e) => setSelectedUser({ ...selectedUser, is_enabled: e.target.checked })}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                </label>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={updatingSettings}
                                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 font-medium shadow-lg shadow-blue-500/25"
                                            >
                                                {updatingSettings ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserCheck className="w-4 h-4" />}
                                                Save Commission Settings
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

function StatsCard({ title, value, icon: Icon, color }: { title: string, value: string, icon: any, color: string }) {
    // Map color to gradient pairs for premium look
    const gradientMap: Record<string, string> = {
        'bg-green-500': 'from-emerald-500 to-teal-600',
        'bg-yellow-500': 'from-amber-400 to-orange-500',
        'bg-blue-500': 'from-blue-500 to-indigo-600',
        'bg-purple-500': 'from-purple-500 to-fuchsia-600',
    };

    const shadowMap: Record<string, string> = {
        'bg-green-500': 'shadow-emerald-500/30',
        'bg-yellow-500': 'shadow-amber-500/30',
        'bg-blue-500': 'shadow-blue-500/30',
        'bg-purple-500': 'shadow-purple-500/30',
    };

    const gradient = gradientMap[color] || 'from-slate-500 to-slate-600';
    const iconShadow = shadowMap[color] || 'shadow-slate-500/30';

    return (
        <div className="relative bg-white p-6 rounded-2xl border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_1px_1px,_rgba(0,0,0,0.15)_1px,_transparent_0)] bg-[length:20px_20px]" />

            {/* Glow effect on hover */}
            <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 rounded-full blur-3xl transition-opacity duration-500`} />

            <div className="relative flex items-start justify-between mb-6">
                {/* Premium icon container with gradient */}
                <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg ${iconShadow} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <Icon className="w-6 h-6 text-white drop-shadow-sm" />
                    {/* Icon shimmer effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Trend indicator with animation */}
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                    <TrendingUp className="w-3.5 h-3.5 group-hover:animate-bounce" />
                    <span className="text-xs font-semibold">+12%</span>
                </div>
            </div>

            <div className="relative">
                <h3 className="text-3xl font-bold text-slate-900 mb-1 tracking-tight">{value}</h3>
                <p className="text-sm text-slate-500 font-medium">{title}</p>
            </div>

            {/* Bottom accent line */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
        </div>
    );
}
