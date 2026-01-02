"use client";

import { X, Check } from "lucide-react";
import { useEffect } from "react";

import { PropFirmRegistration } from "@/services/prop-firm.service";

interface AccountInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    account?: PropFirmRegistration;
}

export function AccountInfoModal({ isOpen, onClose, account }: AccountInfoModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-4xl rounded-2xl bg-white p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200 h-[90vh] overflow-y-auto">
                <div className="mb-8 flex items-center justify-between border-b border-gray-100 pb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                        Prop Account Information
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-full bg-black p-1 text-white transition-transform hover:scale-110"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="grid gap-y-8 gap-x-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">Prop Firm Name</p>
                        <p className="font-medium text-gray-900">{account?.propfirm_name || "-"}</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">Account Size</p>
                        <p className="font-medium text-gray-900">{account?.account_size ? `$${account.account_size.toLocaleString()}` : "-"}</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">Account Phases</p>
                        <p className="font-medium text-gray-900">{account?.account_phases ? `${account.account_phases} Phase(s)` : "-"}</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                            Prop Firm Rules
                        </p>
                        <p className="font-medium text-gray-900 truncate" title={account?.propfirm_rules}>{account?.propfirm_rules || "-"}</p>
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">Login ID</p>
                        <p className="font-medium text-gray-900">{account?.login_id || "-"}</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">Server Name</p>
                        <p className="font-medium text-gray-900">{account?.server_name || "-"}</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">Server Type</p>
                        <p className="font-medium text-gray-900">{account?.server_type || "-"}</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                            Trading Platform
                        </p>
                        <p className="font-medium text-gray-900">{account?.trading_platform || "-"}</p>
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">Prop Firm Website Link</p>
                        <a href={account?.propfirm_website_link} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline truncate block">
                            {account?.propfirm_website_link || "-"}
                        </a>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">Cost Of Prop Account</p>
                        <p className="font-medium text-gray-900">{account?.propfirm_account_cost ? `$${account.propfirm_account_cost.toLocaleString()}` : "-"}</p>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <p className="text-sm text-gray-600">WhatsApp Number</p>
                        <p className="font-medium text-gray-900">{account?.whatsapp_no || "-"}</p>
                    </div>

                    <div className="space-y-2 md:col-span-4">
                        <p className="text-sm text-gray-600">Telegram Username</p>
                        <p className="font-medium text-gray-900">{account?.telegram_username || "-"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
