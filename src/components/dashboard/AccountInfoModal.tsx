"use client";

import { X, Check } from "lucide-react";
import { useEffect } from "react";

interface AccountInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AccountInfoModal({ isOpen, onClose }: AccountInfoModalProps) {
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
            <div className="w-full max-w-4xl rounded-2xl bg-white p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
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
                        <p className="font-medium text-gray-900">-</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">Account Size</p>
                        <p className="font-medium text-gray-900">-</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">Account Phases</p>
                        <p className="font-medium text-gray-900">-</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                            Prop Firm Rules (Clearly Stated)
                        </p>
                        <p className="font-medium text-gray-900">-</p>
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">Login ID</p>
                        <p className="font-medium text-gray-900">-</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">Server Name</p>
                        <p className="font-medium text-gray-900">-</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">Server Type (MT5)</p>
                        <p className="font-medium text-gray-900">-</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                            Trading Platform (MetaTrader 5 Only)
                        </p>
                        <p className="font-medium text-gray-900">-</p>
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">Prop Firm Website Link</p>
                        <p className="font-medium text-gray-900">-</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">Cost Of Prop Account</p>
                        <p className="font-medium text-gray-900">-</p>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <p className="text-sm text-gray-600">WhatsApp Number</p>
                        <p className="font-medium text-gray-900">-</p>
                    </div>

                    <div className="space-y-2 md:col-span-4">
                        <p className="text-sm text-gray-600">Telegram Username</p>
                        <p className="font-medium text-gray-900">-</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
