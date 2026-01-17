import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    color?: "blue" | "green" | "purple" | "orange" | "indigo";
}

export function StatsCard({ title, value, icon: Icon, trend, color = "blue" }: StatsCardProps) {
    // Gradient mappings for premium icon backgrounds
    const gradientClasses = {
        blue: "from-blue-500 to-indigo-600",
        green: "from-emerald-500 to-teal-600",
        purple: "from-purple-500 to-fuchsia-600",
        orange: "from-amber-500 to-orange-600",
        indigo: "from-indigo-500 to-violet-600",
    };

    const shadowClasses = {
        blue: "shadow-blue-500/25",
        green: "shadow-emerald-500/25",
        purple: "shadow-purple-500/25",
        orange: "shadow-amber-500/25",
        indigo: "shadow-indigo-500/25",
    };

    const glowClasses = {
        blue: "from-blue-500",
        green: "from-emerald-500",
        purple: "from-purple-500",
        orange: "from-amber-500",
        indigo: "from-indigo-500",
    };

    return (
        <div className="relative rounded-2xl bg-white p-5 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden border border-slate-100">
            {/* Subtle dot pattern background */}
            <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_1px_1px,_rgba(0,0,0,0.15)_1px,_transparent_0)] bg-[length:16px_16px]" />

            {/* Glow effect on hover */}
            <div className={`absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br ${glowClasses[color]} to-transparent opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-opacity duration-500`} />

            <div className="relative flex items-start justify-between mb-4">
                {/* Premium gradient icon */}
                <div className={`relative p-3 rounded-xl bg-gradient-to-br ${gradientClasses[color]} shadow-lg ${shadowClasses[color]} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <Icon className="h-5 w-5 text-white drop-shadow-sm" />
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/0 via-white/25 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Trend indicator badge */}
                {trend && (
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${trend.isPositive
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-red-50 text-red-600"
                        }`}>
                        {trend.isPositive ? (
                            <TrendingUp className="w-3 h-3" />
                        ) : (
                            <TrendingDown className="w-3 h-3" />
                        )}
                        {trend.isPositive ? "+" : ""}{trend.value}%
                    </div>
                )}
            </div>

            <div className="relative">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
                <p className="text-sm text-slate-500 font-medium mt-1">{title}</p>
            </div>

            {/* Bottom accent line */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradientClasses[color]} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
        </div>
    );
}
