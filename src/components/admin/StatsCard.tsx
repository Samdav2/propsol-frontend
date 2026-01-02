import { LucideIcon } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    color?: "blue" | "green" | "purple" | "orange";
}

export function StatsCard({ title, value, icon: Icon, trend, color = "blue" }: StatsCardProps) {
    const colorClasses = {
        blue: "bg-blue-50 text-blue-600",
        green: "bg-green-50 text-green-600",
        purple: "bg-purple-50 text-purple-600",
        orange: "bg-orange-50 text-orange-600",
    };

    return (
        <div className="rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <h3 className="mt-2 text-2xl font-bold text-gray-900">{value}</h3>
                </div>
                <div className={`rounded-lg p-3 ${colorClasses[color]}`}>
                    <Icon className="h-6 w-6" />
                </div>
            </div>
            {trend && (
                <div className="mt-4 flex items-center text-sm">
                    <span
                        className={`font-medium ${trend.isPositive ? "text-green-600" : "text-red-600"
                            }`}
                    >
                        {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
                    </span>
                    <span className="ml-2 text-gray-500">since last month</span>
                </div>
            )}
        </div>
    );
}
