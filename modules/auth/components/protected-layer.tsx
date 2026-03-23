"use client";

import { useAuthStore } from "@/modules/auth/store/auth-store";
import { ProtectedLayerProp } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const ProtectedLayer = ({ children }: ProtectedLayerProp) => {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace("/sign-in"); // 🔥 better than push
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) return null;

    return <>{children}</>;
};
