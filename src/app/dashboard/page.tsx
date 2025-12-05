"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardHero } from "@/components/dashboard/DashboardHero";
import { AccountList } from "@/components/dashboard/AccountList";
import { HistoryView } from "@/components/dashboard/HistoryView";
import { NotificationsView } from "@/components/dashboard/NotificationsView";
import { ReferralsView } from "@/components/dashboard/ReferralsView";

type Tab = "all" | "history" | "notifications" | "referrals";

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState<Tab>("all");

    return (
        <div className="min-h-screen bg-white">
            <DashboardHeader />
            <main>
                <DashboardHero />

                <div className="container mx-auto px-4 py-8">
                    {/* Tab Navigation */}
                    <div className="mb-8 flex flex-wrap justify-center gap-4">
                        <button
                            onClick={() => setActiveTab("all")}
                            className={`rounded-lg px-6 py-2 text-sm font-medium transition-colors ${activeTab === "all"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            All Account
                        </button>
                        <button
                            onClick={() => setActiveTab("history")}
                            className={`rounded-lg px-6 py-2 text-sm font-medium transition-colors ${activeTab === "history"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            History
                        </button>
                        <button
                            onClick={() => setActiveTab("notifications")}
                            className={`rounded-lg px-6 py-2 text-sm font-medium transition-colors ${activeTab === "notifications"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            Notifications
                        </button>
                        <button
                            onClick={() => setActiveTab("referrals")}
                            className={`rounded-lg px-6 py-2 text-sm font-medium transition-colors ${activeTab === "referrals"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            Referrals
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="min-h-[400px]">
                        {activeTab === "all" && <AccountList />}
                        {activeTab === "history" && <HistoryView />}
                        {activeTab === "notifications" && <NotificationsView />}
                        {activeTab === "referrals" && <ReferralsView />}
                    </div>
                </div>
            </main>
        </div>
    );
}
