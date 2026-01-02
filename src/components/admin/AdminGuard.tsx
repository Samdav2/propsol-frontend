"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminGuard({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("access_token");
            const isAdmin = localStorage.getItem("is_admin");

            if (!token) {
                router.push("/admin/login");
                return;
            }

            if (isAdmin) {
                setIsAuthorized(true);
                return;
            }

            // Token exists but is_admin flag is missing. Verify with backend.
            try {
                // Dynamically import adminService to avoid circular dependencies if any,
                // though here it should be fine.
                const { adminService } = await import("@/services/admin.service");
                await adminService.getMe();
                // If successful, set flag and authorize
                localStorage.setItem("is_admin", "true");
                setIsAuthorized(true);
            } catch (error) {
                console.error("Admin verification failed:", error);
                localStorage.removeItem("access_token");
                localStorage.removeItem("user_data");
                router.push("/admin/login");
            }
        };

        checkAuth();
    }, [router]);

    if (!isAuthorized) {
        return null; // Or a loading spinner
    }

    return <>{children}</>;
}
