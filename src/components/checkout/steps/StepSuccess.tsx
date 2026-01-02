import { CheckCircle } from "lucide-react";
import Link from "next/link";

interface Props {
    orderId: string;
}

export function StepSuccess({ orderId }: Props) {
    return (
        <div className="bg-[#111836] p-8 rounded-2xl border border-gray-800 text-center">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-500" />
            </div>

            <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
            <p className="text-gray-400 mb-8">Thank you for choosing PropSol. Your evaluation pass service has been initiated.</p>

            <div className="bg-[#1A2040] rounded-xl p-6 mb-8">
                <div className="text-sm text-gray-500 uppercase mb-1">Order ID</div>
                <div className="text-2xl font-mono font-bold text-white tracking-wider">{orderId}</div>
            </div>

            <div className="text-left space-y-6 mb-8">
                <h3 className="font-semibold text-lg">What Happens Next?</h3>

                <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                    <div>
                        <div className="font-medium mb-1">Confirmation Email</div>
                        <div className="text-sm text-gray-400">You'll receive a confirmation email with your order details and payment receipt.</div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                    <div>
                        <div className="font-medium mb-1">Account Verification</div>
                        <div className="text-sm text-gray-400">Our team will verify your MT5 credentials within 24 hours and confirm account access.</div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                    <div>
                        <div className="font-medium mb-1">Trading Begins</div>
                        <div className="text-sm text-gray-400">Our professional traders will start executing your evaluation following all rules and requirements.</div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                    <div>
                        <div className="font-medium mb-1">Progress Updates</div>
                        <div className="text-sm text-gray-400">You'll receive weekly progress updates via email. Target completion is 30 trading days.</div>
                    </div>
                </div>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-900/50 rounded-lg p-4 mb-8 text-xs text-yellow-500">
                <span className="font-bold">Important Reminder:</span> Do not trade on your account. Any trading activity will void your package benefits and guarantees. Let our professionals handle your evaluation.
            </div>

            <Link
                href="/dashboard"
                className="block w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-xl transition-colors"
            >
                Back to Home
            </Link>
        </div>
    );
}
