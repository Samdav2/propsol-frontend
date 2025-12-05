"use client";

import { Copy, Share2 } from "lucide-react";

export function ReferralsView() {
    return (
        <div className="flex justify-center py-8">
            <div className="w-full max-w-md rounded-2xl bg-gray-100 p-8 text-center">
                <h3 className="mb-2 text-sm font-bold text-gray-900">
                    Share your unique link or referral code
                </h3>
                <p className="mb-6 text-xs text-gray-500">
                    Once your referral's account is successfully passed, you instantly earn <span className="font-bold text-gray-900">2%</span>, available for immediate withdrawal.
                </p>

                <div className="mb-8 text-left">
                    <label className="mb-2 block text-xs font-medium text-gray-700">
                        Referral Link
                    </label>
                    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
                        <span className="truncate text-sm text-gray-600">
                            3ynoasnd09qksdwfdfge8sdsds
                        </span>
                        <div className="flex gap-2 text-gray-500">
                            <button className="hover:text-gray-900">
                                <Share2 className="h-4 w-4" />
                            </button>
                            <button className="hover:text-gray-900">
                                <Copy className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="text-left">
                    <h4 className="mb-4 text-sm font-bold text-gray-900">Referral Stats</h4>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Total referrals</span>
                            <span className="font-medium text-gray-900">0</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Successful passes</span>
                            <span className="font-medium text-gray-900">0</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Pending referrals</span>
                            <span className="font-medium text-gray-900">0</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Total earned</span>
                            <span className="font-medium text-gray-900">0</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
