import { Check } from "lucide-react";

export function PaymentSuccess() {
    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="mb-8 text-center">
                <h3 className="text-xl font-bold text-blue-600">PropSol</h3>
                <p className="text-sm text-gray-500">Processing Payment</p>
            </div>
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-200">
                <Check className="h-10 w-10 stroke-[3]" />
            </div>
        </div>
    );
}
