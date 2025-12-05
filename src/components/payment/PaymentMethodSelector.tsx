import { CreditCard, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaymentMethodSelectorProps {
    selectedMethod: "card" | "crypto";
    onSelect: (method: "card" | "crypto") => void;
}

export function PaymentMethodSelector({
    selectedMethod,
    onSelect,
}: PaymentMethodSelectorProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">Payment Method</h3>
                <div className="flex items-center gap-2">
                    {/* Simple visual representation of Visa/Bitcoin icons */}
                    <span className="text-xs font-bold text-red-600">●</span>
                    <span className="text-xs font-bold text-orange-500">●</span>
                    <span className="text-xs font-bold text-blue-600">VISA</span>
                    <span className="text-xs font-bold text-orange-500">₿</span>
                </div>
            </div>

            <div className="flex gap-4">
                <button
                    onClick={() => onSelect("card")}
                    className={cn(
                        "flex flex-1 flex-col items-center justify-center gap-2 rounded-lg border p-4 transition-all hover:bg-gray-50",
                        selectedMethod === "card"
                            ? "border-blue-600 bg-blue-50/50 text-blue-600 ring-1 ring-blue-600"
                            : "border-gray-200 text-gray-600"
                    )}
                >
                    <CreditCard className="h-6 w-6" />
                    <span className="text-sm font-medium">Card payment</span>
                </button>

                <button
                    onClick={() => onSelect("crypto")}
                    className={cn(
                        "flex flex-1 flex-col items-center justify-center gap-2 rounded-lg border p-4 transition-all hover:bg-gray-50",
                        selectedMethod === "crypto"
                            ? "border-blue-600 bg-blue-50/50 text-blue-600 ring-1 ring-blue-600"
                            : "border-gray-200 text-gray-600"
                    )}
                >
                    <Wallet className="h-6 w-6" />
                    <span className="text-sm font-medium">Crypto payment</span>
                </button>
            </div>

            {/* Input fields placeholder - only showing for Card for now as per mockup implication,
          but mockup shows empty fields below both. I'll add generic inputs. */}
            <div className="space-y-3 pt-2">
                <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    disabled={selectedMethod === "crypto"}
                />
                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="MM / YY"
                        className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        disabled={selectedMethod === "crypto"}
                    />
                    <input
                        type="text"
                        placeholder="CVC"
                        className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        disabled={selectedMethod === "crypto"}
                    />
                </div>
            </div>
        </div>
    );
}
