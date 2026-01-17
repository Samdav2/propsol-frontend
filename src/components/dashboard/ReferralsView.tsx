import { useEffect, useState } from "react";
import { Copy, Share2, Check } from "lucide-react";
import { userService, ReferralStatsResponse } from "@/services/user.service";

export function ReferralsView() {
    const [stats, setStats] = useState<ReferralStatsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await userService.getReferralStats();
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch referral stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || (typeof window !== 'undefined' ? window.location.origin : '');

    const referralLink = stats?.referral_code
        ? `${baseUrl}/register?ref=${stats.referral_code}`
        : "Loading...";

    const handleCopy = async () => {
        if (!stats?.referral_code) return;
        try {
            await navigator.clipboard.writeText(referralLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleShare = async () => {
        if (!stats?.referral_code) return;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Join PropSol',
                    text: 'Join me on PropSol and get funded!',
                    url: referralLink,
                });
            } catch (err) {
                // Silent fail for share cancellation
            }
        } else {
            handleCopy();
        }
    };

    if (loading) {
        return <div className="py-20 text-center text-gray-500">Loading referral data...</div>;
    }

    return (
        <div className="flex justify-center py-8">
            <div className="w-full max-w-md rounded-2xl bg-gray-100 p-8 text-center">
                <h3 className="mb-2 text-sm font-bold text-gray-900">
                    Share your unique link or referral code
                </h3>
                <p className="mb-6 text-xs text-gray-500">
                    Once your referral's account is successfully passed, you instantly earn <span className="font-bold text-gray-900">2%</span>, available for immediate withdrawal.
                    <a href="/dashboard/wallet" className="ml-1 text-blue-600 hover:underline font-medium">
                        Go to Wallet
                    </a>
                </p>

                <div className="mb-8 text-left">
                    <label className="mb-2 block text-xs font-medium text-gray-700">
                        Referral Link
                    </label>
                    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
                        <span className="truncate text-sm text-gray-600 select-all">
                            {referralLink}
                        </span>
                        <div className="flex gap-2 text-gray-500">
                            <button onClick={handleShare} className="hover:text-gray-900" title="Share">
                                <Share2 className="h-4 w-4" />
                            </button>
                            <button onClick={handleCopy} className="hover:text-gray-900" title="Copy">
                                {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="text-left">
                    <h4 className="mb-4 text-sm font-bold text-gray-900">Referral Stats</h4>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Total referrals</span>
                            <span className="font-medium text-gray-900">{stats?.total_referrals || 0}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Successful passes</span>
                            <span className="font-medium text-gray-900">{stats?.successful_passes || 0}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Pending referrals</span>
                            <span className="font-medium text-gray-900">{stats?.pending_referrals || 0}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Total earned</span>
                            <span className="font-medium text-gray-900">${stats?.total_earned?.toFixed(2) || "0.00"}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
