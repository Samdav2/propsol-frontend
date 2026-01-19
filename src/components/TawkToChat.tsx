"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
    interface Window {
        Tawk_API?: any;
        Tawk_LoadStart?: Date;
    }
}

export function TawkToChat() {
    const pathname = usePathname();

    // Don't show chat widget on admin pages
    const isAdminPage = pathname?.startsWith('/admin');

    useEffect(() => {
        // Skip loading on admin pages
        if (isAdminPage) {
            // Hide existing widget if navigating to admin
            if (window.Tawk_API?.hideWidget) {
                window.Tawk_API.hideWidget();
            }
            return;
        }

        // Show widget if already loaded and not on admin
        if (window.Tawk_API?.showWidget) {
            window.Tawk_API.showWidget();
            return;
        }

        // Load Tawk.to script
        window.Tawk_API = window.Tawk_API || {};
        window.Tawk_LoadStart = new Date();

        const script = document.createElement("script");
        script.async = true;
        script.src = "https://embed.tawk.to/696dd5dfab79ba197d95a1d3/default";
        script.charset = "UTF-8";
        script.setAttribute("crossorigin", "*");

        const firstScript = document.getElementsByTagName("script")[0];
        firstScript.parentNode?.insertBefore(script, firstScript);

        return () => {
            // Cleanup: hide widget when component unmounts
            if (window.Tawk_API?.hideWidget) {
                window.Tawk_API.hideWidget();
            }
        };
    }, [isAdminPage]);

    // Don't render anything - the widget is injected by the script
    return null;
}
