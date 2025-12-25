import { CheckCircle2, XCircle } from "lucide-react";

import { useEffect, useState } from "react";
import { notificationService, Notification } from "@/services/notification.service";
import { format } from "date-fns";
import Image from "next/image";

export function NotificationsView() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const data = await notificationService.getMyNotifications();
                setNotifications(data);
            } catch (error) {
                console.error("Failed to fetch notifications:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    if (loading) {
        return <div className="p-6 text-center text-gray-500">Loading notifications...</div>;
    }

    if (notifications.length === 0) {
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
                <h3 className="mb-2 text-lg font-medium text-gray-900">No Notifications Yet</h3>
                <p className="text-sm text-gray-500">
                    We'll notify you when there's an update on your account.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4 max-w-4xl mx-auto">
            {notifications.map((notification) => (
                <div key={notification.id} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gray-100 bg-gray-50 p-1">
                            <div className="h-full w-full rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                                PS
                            </div>
                            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-blue-500 border-2 border-white"></div>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-gray-900">Admin PropSol</h4>
                            <span className="text-xs text-gray-500">
                                {format(new Date(notification.created_at), "dd, MMM yyyy")}
                            </span>
                        </div>
                    </div>

                    <h3 className="mb-2 text-lg font-bold text-gray-900">
                        {notification.title}
                    </h3>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">
                        {notification.message}
                    </p>
                </div>
            ))}
        </div>
    );
}
