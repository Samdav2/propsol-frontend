import { CheckCircle2, XCircle } from "lucide-react";

export function NotificationsView() {
    return (
        <div className="space-y-4 max-w-4xl mx-auto">
            {/* Notification Item: Success */}
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gray-100 bg-gray-50 p-1">
                        {/* Placeholder for Admin Logo */}
                        <div className="h-full w-full rounded-full bg-blue-100"></div>
                        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900">Admin PropSol</h4>
                        <span className="text-xs text-gray-500">25, Nov 2025</span>
                    </div>
                </div>

                <h3 className="mb-2 text-lg font-bold text-green-600">
                    Your Prop Firm Account Has Been Successfully Passed!
                </h3>
                <p className="mb-4 text-sm text-gray-600">
                    We're thrilled to inform you that your prop firm challenge has been successfully passed within the guaranteed timeframe. 💪
                </p>
                <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                    <li>You now have access to your live funded trading account</li>
                    <li>You've been granted access to our Live Trading System</li>
                    <li>Our team is still here to support you through your next steps</li>
                </ul>
            </div>

            {/* Notification Item: Failure */}
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gray-100 bg-gray-50 p-1">
                        {/* Placeholder for Admin Logo */}
                        <div className="h-full w-full rounded-full bg-blue-100"></div>
                        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-red-500 border-2 border-white"></div>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900">Admin PropSol</h4>
                        <span className="text-xs text-gray-500">25, Nov 2025</span>
                    </div>
                </div>

                <h3 className="mb-2 text-lg font-bold text-gray-900">
                    Account Challenge Unsuccessful – <span className="text-blue-600">But We've Got You Covered</span>
                </h3>
                <p className="mb-4 text-sm text-gray-600">
                    We regret to inform you that despite our best efforts, your prop firm challenge was not successfully passed within the 30-day window.
                </p>
                <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                    <li>Full refund of your service fee</li>
                    <li>$100 compensation for your inconvenience</li>
                    <li>Refund of your prop firm account purchase</li>
                    <li>Continued access to our system for live trading in the future</li>
                </ul>
            </div>
        </div>
    );
}
