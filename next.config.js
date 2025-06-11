/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: { unoptimized: true },
    env: {
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    },
    reactStrictMode: true,
    webpack: (config, { isServer }) => {
        // Handle case sensitivity issues in Windows
        config.module.rules.push({
            test: /\.js$/,
            resolve: {
                fullySpecified: false,
            },
        });

        // Allow importing heroicons
        config.resolve.fallback = {
            ...config.resolve.fallback,
            '@heroicons/react/24/outline': '@heroicons/react',
        };

        // Ensure consistent path casing
        config.resolve.symlinks = false;

        // Force case-sensitive path resolution
        config.resolve.plugins = config.resolve.plugins || [];

        return config;
    },
};

module.exports = nextConfig;