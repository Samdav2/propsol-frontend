import { ChevronDown } from "lucide-react";
import { AccountCard } from "@/components/dashboard/AccountCard";
import { StatsBanner } from "@/components/dashboard/StatsBanner";

export function AccountList() {
    return (
        <div className="space-y-8">
            <div className="-mx-4 sm:mx-0">
                <StatsBanner />
            </div>

            <div className="container mx-auto px-4">
                {/* Filter Dropdown */}
                <div className="mb-8 flex justify-end">
                    <button className="flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300">
                        <span>Pending Accounts</span>
                        <ChevronDown className="h-4 w-4" />
                    </button>
                </div>

                {/* Account List */}
                <div className="space-y-6">
                    <AccountCard
                        id="HQA111223"
                        name="Jude Mike"
                        status="pending"
                        currentStep={1}
                    />
                    <AccountCard
                        id="HQA111223"
                        name="Jude Mike"
                        status="passed"
                        currentStep={3}
                    />
                    {/* Example of a failed account as per mockup logic (though mockup shows failed count 00) */}
                    <AccountCard
                        id="HQA111223"
                        name="Jude Mike"
                        status="failed"
                        currentStep={2} // Failed at step 2
                    />
                </div>
            </div>
        </div>
    );
}
