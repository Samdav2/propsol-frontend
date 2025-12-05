import { Package } from "lucide-react";

export function OrderSummary() {
    return (
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
                <span className="text-sm font-semibold text-gray-500">Product</span>
                <span className="text-sm font-semibold text-gray-500">Subtotal</span>
            </div>

            <div className="mb-8 flex items-start justify-between">
                <div className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                        <Package className="h-6 w-6" />
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-gray-900">
                            Account passing model V1.0
                        </h4>
                        <p className="text-xs text-gray-500">Prop Firm</p>
                    </div>
                </div>
                <span className="text-sm font-semibold text-gray-900">$36.00</span>
            </div>

            <div className="space-y-3 border-t border-gray-100 pt-4">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-medium text-gray-900">$108.00</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">VAT</span>
                    <span className="font-medium text-gray-900">$0.85</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Discount (-)</span>
                    <span className="font-medium text-gray-900">$0.00</span>
                </div>
            </div>

            <div className="mt-6 flex justify-between border-t border-gray-100 pt-4">
                <span className="text-base font-semibold text-gray-900">
                    Total Payable
                </span>
                <span className="text-base font-bold text-gray-900">$108.85</span>
            </div>
        </div>
    );
}
