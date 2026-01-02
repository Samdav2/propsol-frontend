export function PaymentProcessing() {
    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="mb-4 text-center">
                <h3 className="text-xl font-bold text-blue-600">PropSol</h3>
                <p className="text-sm text-gray-500">Processing Payment</p>
            </div>
            <div className="relative h-16 w-16">
                <div className="absolute inset-0 rounded-full border-4 border-gray-100"></div>
                <div className="absolute inset-0 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
        </div>
    );
}
