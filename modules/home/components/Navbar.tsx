"use client";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useAuthStore } from "@/modules/auth/store/auth-store";
import { Code2, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AvatarDropdown } from "./AvatarDrop";

const Navbar = () => {
    const user = useAuthStore(s => s.user);
    const isLoggedIn = useAuthStore(s => s.isAuthenticated);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const closeMobileMenu = () => setMobileMenuOpen(false);

    return (
        <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-8">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-primary group shrink-0"
                        >
                            <div className="p-2 rounded-lg bg-linear-to-br from-yellow-400 to-orange-500 transition-all group-hover:from-yellow-500 group-hover:to-orange-600">
                                <Code2 className="w-5 h-5 text-black" />
                            </div>
                            <span className="font-bold text-xl bg-linear-to-r from-foreground to-foreground/70 bg-clip-text">
                                CodeMaster
                            </span>
                        </Link>

                        <div className="hidden md:flex items-center gap-1">
                            <Link
                                href="/problems"
                                className="px-4 py-2 rounded-lg text-foreground/70 transition-all hover:text-foreground hover:bg-accent/50"
                            >
                                Problems
                            </Link>
                            <Link
                                href="/playlist"
                                className="px-4 py-2 rounded-lg text-foreground/70 transition-all hover:text-foreground hover:bg-accent/50"
                            >
                                Playlists
                            </Link>
                            <Link
                                href="/about"
                                className="px-4 py-2 rounded-lg text-foreground/70 transition-all hover:text-foreground hover:bg-accent/50"
                            >
                                About
                            </Link>
                            <Link
                                href="/profile"
                                className="px-4 py-2 rounded-lg text-foreground/70 transition-all hover:text-foreground hover:bg-accent/50"
                            >
                                Profile
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <ModeToggle />

                        <div className="hidden md:flex items-center gap-3 justify-center">
                            {isLoggedIn ? (
                                <>
                                    {user?.role === "ADMIN" && (
                                        <Button
                                            asChild
                                            className="bg-linear-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg px-4 hover:from-yellow-500 hover:to-orange-600"
                                        >
                                            <Link href="/create-problem">
                                                Create Problem
                                            </Link>
                                        </Button>
                                    )}

                                    <AvatarDropdown user={user} />
                                </>
                            ) : (
                                <>
                                    <Button
                                        asChild
                                        variant="ghost"
                                        className="rounded-lg"
                                    >
                                        <Link href="/sign-in">Sign In</Link>
                                    </Button>

                                    <Button
                                        asChild
                                        className="bg-linear-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg shadow-lg shadow-orange-500/20 transition-all hover:from-yellow-500 hover:to-orange-600 hover:shadow-orange-500/40"
                                    >
                                        <Link href="/sign-up">Sign Up</Link>
                                    </Button>
                                </>
                            )}
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg transition-all hover:bg-accent/50"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="size-6" />
                            ) : (
                                <Menu className="size-6" />
                            )}
                        </button>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden py-4 space-y-2 border-t border-border/40">
                        <Link
                            href="/problems"
                            className="block px-4 py-2 rounded-lg text-foreground/70 transition-all hover:text-foreground hover:bg-accent/50"
                            onClick={closeMobileMenu}
                        >
                            Problems
                        </Link>

                        <Link
                            href="/playlist"
                            className="block px-4 py-2 rounded-lg text-foreground/70 transition-all hover:text-foreground hover:bg-accent/50"
                            onClick={closeMobileMenu}
                        >
                            Playlists
                        </Link>

                        <Link
                            href="/about"
                            className="block px-4 py-2 rounded-lg text-foreground/70 transition-all hover:text-foreground hover:bg-accent/50"
                            onClick={closeMobileMenu}
                        >
                            About
                        </Link>

                        <Link
                            href="/profile"
                            className="block px-4 py-2 rounded-lg text-foreground/70 transition-all hover:text-foreground hover:bg-accent/50"
                            onClick={closeMobileMenu}
                        >
                            Profile
                        </Link>

                        <div className="pt-2 space-y-2">
                            {isLoggedIn ? (
                                <>
                                    {user?.role === "ADMIN" && (
                                        <Button
                                            asChild
                                            className="w-full bg-linear-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg"
                                        >
                                            <Link
                                                href="/create-problem"
                                                onClick={closeMobileMenu}
                                            >
                                                Create Problem
                                            </Link>
                                        </Button>
                                    )}

                                    <div className="px-4 py-2 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-black font-bold">
                                            {user?.name
                                                ?.charAt(0)
                                                .toUpperCase() || "U"}
                                        </div>
                                        <div>
                                            <p className="font-semibold">
                                                {user?.name}
                                            </p>
                                            <p className="text-sm text-foreground/60">
                                                {user?.role}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Button
                                        asChild
                                        variant="ghost"
                                        className="w-full rounded-lg"
                                    >
                                        <Link
                                            href="/sign-in"
                                            onClick={closeMobileMenu}
                                        >
                                            Sign In
                                        </Link>
                                    </Button>

                                    <Button
                                        asChild
                                        className="w-full bg-linear-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg shadow-lg shadow-orange-500/20"
                                    >
                                        <Link
                                            href="/sign-up"
                                            onClick={closeMobileMenu}
                                        >
                                            Sign Up
                                        </Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
