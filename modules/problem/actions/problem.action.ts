"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { headers } from "next/headers";

export const getAllProblem = async () => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) return {
            success: false,
            message: "Unauthorized",
        }

        const problems = await db.problem.findMany({
            orderBy: {
                createdAt: "desc",
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
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) return {
            success: false,
            message: "Unauthorized",
        }

        const problem = await db.problem.findUnique({
            where: {
                id: id
            }
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