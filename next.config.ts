import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Empêche ESLint de bloquer le build

  },
    experimental: {
    nodeMiddleware: true, // <-- Permet d'utiliser runtime: 'nodejs' pour middleware
  },
   allowedDevOrigins: ['http://localhost:10000', 'https://mentiscare.onrender.com'],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
