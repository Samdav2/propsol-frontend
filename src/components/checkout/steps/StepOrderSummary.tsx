import { CheckoutData } from "../CheckoutWizard";

interface Props {
    data: CheckoutData;
    onNext: () => void;
    onBack: () => void;
}

export function StepOrderSummary({ data, onNext }: Props) {
    return (
        <div className="bg-[#111836] p-8 rounded-2xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
            <p className="text-gray-400 mb-6 text-sm">Review your selections and total price</p>

            <div className="bg-[#1A2040] rounded-xl p-6 space-y-4 mb-8">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div className="text-xs text-gray-500 uppercase mb-1">Prop Firm</div>
                        <div className="font-medium">{data.propFirm}</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-500 uppercase mb-1">Challenge Type</div>
                        <div className="font-medium">{data.challengeType}</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-500 uppercase mb-1">Scope</div>
                        <div className="font-medium">{data.scope || "Full Pass"}</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-500 uppercase mb-1">Account Size</div>
                        <div className="font-medium">${data.accountSize.toLocaleString()}</div>
                    </div>
                    <div className="col-span-2">
                        <div className="text-xs text-gray-500 uppercase mb-1">Package</div>
                        <div className="font-medium">{data.packageType}</div>
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-4 mt-4 flex justify-between items-center">
                    <div className="text-gray-400">Total Price</div>
                    <div className="text-2xl font-bold text-white">${data.price}</div>
                </div>
            </div>

            <button
                onClick={onNext}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-xl transition-colors"
            >
                Proceed to Account Details
            </button>
        </div>
    );
}
