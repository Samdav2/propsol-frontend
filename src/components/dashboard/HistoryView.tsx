
import Image from "next/image";

export function HistoryView() {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="relative mb-6 h-48 w-48 animate-float">
                {/* 3D star image with animation */}
                <div className="absolute inset-0 flex items-center justify-center bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
                <Image
                    src="/assets/star.png"
                    alt="Star"
                    fill
                    className="object-contain animate-spin-slow"
                />
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">
                No Account Passed
            </h3>
            <button className="text-sm font-semibold text-blue-600 hover:underline">
                View Current
            </button>
        </div>
    );
}
