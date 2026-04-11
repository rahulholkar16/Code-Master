"use server";

import { db } from "@/lib/db";
import { useAuthStore } from "@/modules/auth/store/auth-store";
import { revalidatePath } from "next/cache";

export const getAllProblem = async () => {
    try {
        const problems = await db.problem.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                tags: { include: { tag: true } },
            },
        });

        return {
            success: true,
            message: "Problems fetched successfully",
            data: problems,
        };
    } catch (error) {
        console.error("Error fetching problems:", error);

        return {
            success: false,
            message: "Something went wrong while fetching problems",
        };
    }
};

export const getProblemById = async (id: string) => {
    try {
        const problem = await db.problem.findUnique({
            where: {
                id: id
            },
            include: {
                tags: { include: { tag: true } },
                examples: true,
                snippets: true,
                solutions: true,
                testCases: { where: { isHidden: false } },
            },
        });

        return {
            success: true,
            message: "Problem fetched successfully",
            data: problem,
        };
    } catch (error) {
        console.error("Error fetching problem:", error);

        return {
            success: false,
            message: "Something went wrong while fetching problem",
        };
    }
};

export const deleteProblemById = async (id: string) => {
    try {
        const { user } = useAuthStore.getState();

        if (!user || user.role !== "ADMIN") {
            return {
                success: false,
                message: "Unauthorized: Only admins can delete problems",
            };
        };

        await db.problem.delete({
            where: { id }
        });

        revalidatePath("/problems");
        return {
            success: true,
            message: "Problems deleted successfully",
        };
    } catch (error) {
        console.error("Error Deleteing problem:", error);

        return {
            success: false,
            message: "Something went wrong while Deleteing problem",
        };
    }
};