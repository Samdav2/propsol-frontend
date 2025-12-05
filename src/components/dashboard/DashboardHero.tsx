import Image from "next/image";
import { Plus } from "lucide-react";

export function DashboardHero() {
    return (
        <div className="w-full bg-blue-50 py-8">
            <div className="container mx-auto flex flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-white shadow-sm">
                        <Image
                            src="/assets/avatar-placeholder.png" // Placeholder
                            alt="Jude Mike"
                            fill
                            className="object-cover"
                        />
                        <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500">
                            JM
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-gray-900">Jude Mike</span>
                        <span className="text-sm text-gray-500">@jde321@gmail.com</span>
                    </div>
                </div>

                <button className="flex w-auto items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700 shadow-md md:px-6 md:py-3 md:text-sm">
                    <span>Pass New Account</span>
                    <Plus className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
