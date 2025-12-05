"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AccountInfoModal } from "@/components/dashboard/AccountInfoModal";
import Link from "next/link";

interface AccountCardProps {
    id: string;
    password?: string; // Optional for security/mock
    name: string;
    status: "pending" | "in-progress" | "passed" | "failed";
    currentStep: 1 | 2 | 3; // 1: Register, 2: Passing, 3: Passed
}

export function AccountCard({
    id,
    password = "*************",
    name,
    status,
    currentStep,
}: AccountCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isFailed = status === "failed";

    return (
        <>
            <div
                className={cn(
                    "overflow-hidden rounded-xl border border-gray-100 border-t-4 bg-white p-6 shadow-sm",
                    isFailed ? "border-t-red-500" : "border-t-blue-600"
                )}
            >
                {/* Header */}
                <div className="mb-8 flex items-start justify-between">
                    <div>
                        <h3 className="mb-4 text-lg font-bold text-gray-900">
                            Prop Account Information
                        </h3>
                        <div className="space-y-1 text-sm text-gray-600">
                            <p>
                                <span className="font-medium text-gray-500">Prop Account ID:</span>{" "}
                                {id}
                            </p>
                            <p>
                                <span className="font-medium text-gray-500">Password:</span>{" "}
                                {password}
                            </p>
                            <p>
                                <span className="font-medium text-gray-500">Account Name:</span>{" "}
                                {name}
                            </p>
                        </div>
                    </div>
                    {status === "passed" ? (
                        <Link
                            href="/dashboard/account-passed"
                            className="text-sm font-medium text-blue-600 hover:underline"
                        >
                            Check Prop firm account full information
                        </Link>
                    ) : (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-sm font-medium text-blue-600 hover:underline"
                        >
                            Check Prop firm account full information
                        </button>
                    )}
                </div>

                {/* Progress Stepper */}
                <div className="mx-auto max-w-3xl">
                    <div className="flex items-center justify-between">
                        {/* Step 1 */}
                        <div className="flex flex-col items-center gap-3 relative z-10">
                            <div
                                className={cn(
                                    "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors bg-white",
                                    currentStep >= 1
                                        ? isFailed && currentStep === 1
                                            ? "border-red-500 bg-red-500 text-white"
                                            : "border-blue-600 bg-blue-600 text-white"
                                        : "border-gray-300 text-gray-300"
                                )}
                            >
                                {currentStep > 1 || (currentStep === 1 && !isFailed) ? (
                                    <Check className="h-4 w-4" />
                                ) : isFailed && currentStep === 1 ? (
                                    <X className="h-4 w-4" />
                                ) : (
                                    <div className="h-2 w-2 rounded-full bg-current" />
                                )}
                            </div>
                            <span className="absolute top-10 hidden w-32 text-center text-sm font-medium text-gray-500 sm:block">
                                Register & Submit
                            </span>
                        </div>

                        {/* Line 1-2 */}
                        <div className="flex-1 h-0.5 bg-gray-200 mx-2 relative">
                            <div
                                className={cn(
                                    "absolute inset-0 transition-all duration-500",
                                    isFailed ? "bg-red-500" : "bg-blue-600"
                                )}
                                style={{ width: currentStep >= 2 ? "100%" : currentStep === 1 ? "50%" : "0%" }}
                            />
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col items-center gap-3 relative z-10">
                            <div
                                className={cn(
                                    "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors bg-white",
                                    currentStep >= 2
                                        ? isFailed && currentStep === 2
                                            ? "border-red-500 bg-red-500 text-white"
                                            : "border-blue-600 bg-blue-600 text-white"
                                        : "border-gray-300 text-gray-300"
                                )}
                            >
                                {currentStep > 2 || (currentStep === 2 && !isFailed) ? (
                                    <Check className="h-4 w-4" />
                                ) : isFailed && currentStep === 2 ? (
                                    <X className="h-4 w-4" />
                                ) : (
                                    <div className="h-2 w-2 rounded-full bg-current" />
                                )}
                            </div>
                            <span className="absolute top-10 hidden w-32 text-center text-sm font-medium text-gray-500 sm:block">
                                Passing Process
                            </span>
                        </div>

                        {/* Line 2-3 */}
                        <div className="flex-1 h-0.5 bg-gray-200 mx-2 relative">
                            <div
                                className={cn(
                                    "absolute inset-0 transition-all duration-500",
                                    isFailed ? "bg-red-500" : "bg-blue-600"
                                )}
                                style={{ width: currentStep >= 3 ? "100%" : currentStep === 2 ? "50%" : "0%" }}
                            />
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col items-center gap-3 relative z-10">
                            <div
                                className={cn(
                                    "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors bg-white",
                                    currentStep >= 3
                                        ? isFailed && currentStep === 3
                                            ? "border-red-500 bg-red-500 text-white"
                                            : "border-blue-600 bg-blue-600 text-white"
                                        : "border-gray-300 text-gray-300"
                                )}
                            >
                                {currentStep === 3 && !isFailed ? (
                                    <Check className="h-4 w-4" />
                                ) : isFailed && currentStep === 3 ? (
                                    <X className="h-4 w-4" />
                                ) : (
                                    <div className="h-2 w-2 rounded-full bg-current" />
                                )}
                            </div>
                            <span className="absolute top-10 hidden w-32 text-center text-sm font-medium text-gray-500 sm:block">
                                Account Passed
                            </span>
                        </div>
                    </div>
                    {/* Spacer for the absolute text labels */}
                    <div className="h-8"></div>
                </div>
            </div>

            <AccountInfoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
