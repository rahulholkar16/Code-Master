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

        const dbUser = await db.user.findUnique({
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

        const playlist = await db.playList.create({
            data: {
                name: name.trim(),
                description: description?.trim() || null,
                userId: dbUser.id,
            },
            include: {
                problems: {
                    include: {
                        problem: {
                            select: {
                                id: true,
                                title: true,
                                difficulty: true,
                            },
                        },
                    },
                },
            },
        });

        return NextResponse.json({
            success: true,
            message: "Playlist created successfully.",
            playlist,
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

        const dbUser = await db.user.findUnique({
            where: {
                id: session.user.id
            }
        });

        if (!dbUser) return NextResponse.json({
            success: false, message: "User not found"
        }, { status: 404 });

        const playlists = await db.playList.findMany({
            where: {
                userId: dbUser.id
            },
            include: {
                problems: {
                    include: {
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
            success: true, playlists
        }, { status: 200 });
    } catch (error) {
        console.error("Error fetch playlist:", error);
        return NextResponse.json({
            success: false, message: "Failed to fetch playlists"
        });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const playlistId = request.nextUrl.searchParams.get("id");
        const { name, description } = await request.json();

        if (!playlistId) return NextResponse.json({
            success: false, message: "Playlist id is required."
        }, { status: 400 });

        if (!name?.trim()) return NextResponse.json({
            success: false, message: "Playlist name is required."
        }, { status: 400 });

        const playlist = await db.playList.update({
            where: {
                id: playlistId,
                userId: session.user.id,
            },
            data: {
                name: name.trim(),
                description: description?.trim() || null,
            },
            include: {
                problems: {
                    include: {
                        problem: {
                            select: {
                                id: true,
                                title: true,
                                difficulty: true,
                            },
                        },
                    },
                },
            },
        });

        return NextResponse.json({
            success: true,
            message: "Playlist updated successfully.",
            playlist,
        }, { status: 200 });
    } catch (error) {
        console.error("Error updating playlist:", error);
        return NextResponse.json({
            success: false, message: "Failed to update playlist."
        }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const playlistId = request.nextUrl.searchParams.get("id");

        if (!playlistId) return NextResponse.json({
            success: false, message: "Playlist id is required."
        }, { status: 400 });

        await db.playList.delete({
            where: {
                id: playlistId,
                userId: session.user.id,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Playlist deleted successfully.",
        }, { status: 200 });
    } catch (error) {
        console.error("Error deleting playlist:", error);
        return NextResponse.json({
            success: false, message: "Failed to delete playlist."
        }, { status: 500 });
    }
}
