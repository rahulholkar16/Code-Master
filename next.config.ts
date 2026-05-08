import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone",
  serverExternalPackages: ["@prisma/client", "prisma"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // GitHub
      },
    ],
  },
};

export default nextConfig;