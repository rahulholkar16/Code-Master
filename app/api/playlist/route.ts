import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const session = await auth.api.getSession({ 
            headers: await headers()
        });

        if (!session) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const dbUser = await db.findUnique({
            where: {
                id: session.user.id
            }
        });

        if (!dbUser) return NextResponse.json({
            success: false, message: "User not found"
        }, { status: 404 });

        const { name, description } = await request.json();

        if (!name) return NextResponse.json({
            success: false, message: "Playlist name is required."
        }, { status: 400 });

        await db.playlist.create({
            data: {
                name,
                description,
                userId: dbUser.id,
            }
        });

        return NextResponse.json({
            success: true, message: "Playlist craete successfully."
        }, { status: 200 });
    } catch (error) {
        console.error("Error creating playlist::", error);
        return NextResponse.json({
            success: false, message: "Failed to create PlayList."
        }, { status: 500 });
    }
};

export async function GET() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const dbUser = await db.findUnique({
            where: {
                id: session.user.id
            }
        });

        if (!dbUser) return NextResponse.json({
            success: false, message: "User not found"
        }, { status: 404 });

        const playlists = await db.playlist.findMany({
            where: {
                userId: dbUser.id
            },
            includes: {
                problems: {
                    includes: {
                        problem: {
                            select: {
                                id: true,
                                title: true,
                                difficulty: true,

                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return NextResponse.json({
            success: false, playlists
        }, { status: 200 });
    } catch (error) {
        console.error("Error fetch playlist:", error);
        return NextResponse.json({
            success: false, message: "Failed to fetch playlists"
        });
    }
}