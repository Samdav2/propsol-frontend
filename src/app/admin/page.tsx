"use client";

import { useEffect, useState } from "react";
import { adminService, AdminStats } from "@/services/admin.service";
import { StatsCard } from "@/components/admin/StatsCard";
import { Users, DollarSign, Briefcase, Activity } from "lucide-react";

export default function AdminDashboard() {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await adminService.getStats();
                setStats(data);
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

    // Fallback values if stats are missing or structure is different
    // Adjust these accessors based on actual API response
    const totalUsers = stats?.total_users || 0;
    const totalRevenue = stats?.total_revenue || 0;
    const activePropFirms = stats?.active_prop_firms || 0;
    const pendingRegistrations = stats?.pending_registrations || 0;

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-bold text-gray-900">Dashboard Overview</h2>
                <p className="text-gray-500">Welcome back, here's what's happening today.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Users"
                    value={totalUsers}
                    icon={Users}
                    color="blue"
                    trend={{ value: 12, isPositive: true }}
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

            {/* Add more sections like Recent Activity or Charts here */}
            <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-xl bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-bold text-gray-900">Recent Activity</h3>
                    <div className="flex h-64 items-center justify-center text-gray-500">
                        Chart Placeholder
                    </div>
                </div>
                <div className="rounded-xl bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-bold text-gray-900">Registration Trends</h3>
                    <div className="flex h-64 items-center justify-center text-gray-500">
                        Chart Placeholder
                    </div>
                </div>
            </div>
        </div>
    );
}
