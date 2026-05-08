import { auth } from "@/lib/auth";
import { ChildrenProps } from "@/types";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const ProfileLayout = async ({ children }: ChildrenProps) => {
    const isAuthenticate = await auth.api.getSession({
        headers: await headers(),
    });
    if (!isAuthenticate) redirect("/sign-in");
    return <>{children}</>;
};

export default ProfileLayout;
