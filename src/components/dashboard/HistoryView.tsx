import { useEffect, useState } from "react";
import Image from "next/image";
import { propFirmService, PropFirmRegistration } from "@/services/prop-firm.service";
import { AccountCard } from "./AccountCard";

export function HistoryView() {
    const [passedAccounts, setPassedAccounts] = useState<PropFirmRegistration[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPassedAccounts = async () => {
            try {
                const data = await propFirmService.getUserRegistrations("passed");
                setPassedAccounts(data);
            } catch (error) {
                console.error("Failed to fetch passed accounts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPassedAccounts();
    }, []);

    if (loading) {
        return <div className="p-6 text-center text-gray-500">Loading history...</div>;
    }

    if (passedAccounts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="relative mb-6 h-48 w-48 animate-float">
                    {/* 3D star image with animation */}
                    <div className="absolute inset-0 flex items-center justify-center bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
                    <Image
                        src="/assets/star.png"
                        alt="Star"
                        fill
                        className="object-contain animate-spin-slow"
                    />
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                    No Account Passed
                </h3>
                <button className="text-sm font-semibold text-blue-600 hover:underline">
                    View Current
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Passed Accounts History</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {passedAccounts.map((account) => (
                    <AccountCard
                        key={account.id}
                        id={account.login_id}
                        name={account.propfirm_name}
                        status={account.account_status}
                        currentStep={3} // Since these are passed accounts
                        account={account}
                    />
                ))}
            </div>
        </div>
    );
}
