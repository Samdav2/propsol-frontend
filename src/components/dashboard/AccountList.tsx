import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { AccountCard } from "@/components/dashboard/AccountCard";
import { StatsBanner } from "@/components/dashboard/StatsBanner";
import { PropFirmRegistration } from "@/services/prop-firm.service";

interface AccountListProps {
    accounts?: PropFirmRegistration[];
}

export function AccountList({ accounts }: AccountListProps) {
    const [filter, setFilter] = useState<"pending" | "in_progress" | "passed" | "failed">("pending");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const filteredAccounts = accounts?.filter((account) => {
        const status = account.account_status || "pending";
        return status === filter;
    });

    const filterOptions = [
        { value: "pending", label: "Pending Accounts" },
        { value: "in_progress", label: "In Progress" },
        { value: "passed", label: "Passed Accounts" },
        { value: "failed", label: "Failed Accounts" },
    ];

    const currentLabel = filterOptions.find((opt) => opt.value === filter)?.label;

    return (
        <div className="space-y-8">
            <div className="-mx-4 sm:mx-0">
                <StatsBanner accounts={accounts} />
            </div>

            <div className="container mx-auto px-4">
                {/* Filter Dropdown */}
                <div className="mb-8 flex justify-end relative">
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
                        >
                            <span>{currentLabel}</span>
                            <ChevronDown className="h-4 w-4" />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                                {filterOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => {
                                            setFilter(option.value as any);
                                            setIsDropdownOpen(false);
                                        }}
                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Account List */}
                <div className="space-y-6">
                    {filteredAccounts && filteredAccounts.length > 0 ? (
                        filteredAccounts.map((account) => (
                            <AccountCard
                                key={account.id}
                                id={account.login_id} // Using login_id as display ID
                                name={account.propfirm_name}
                                status={account.account_status || "pending"}
                                currentStep={account.account_status === 'pending' ? 1 : (account.challenges_step as 1 | 2 | 3)}
                                account={account}
                            />
                        ))
                    ) : (
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
                                No {currentLabel?.toLowerCase()} found
                            </h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
