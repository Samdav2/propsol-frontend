export function StatsBanner() {
    return (
        <div className="w-full bg-blue-600 py-8 text-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-blue-100">
                            Pending Accounts
                        </span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold">11</span>
                            <span className="text-xs text-blue-200">Current</span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-blue-100">
                            In Progress
                        </span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold">00</span>
                            <span className="text-xs text-blue-200">Current</span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-blue-100">
                            Passed Accounts
                        </span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold">00</span>
                            <span className="text-xs text-blue-200">Current</span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-blue-100">
                            Failed Accounts
                        </span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold">00</span>
                            <span className="text-xs text-blue-200">Current</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
