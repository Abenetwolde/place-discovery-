import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.ambalaymaps.com',
        pathname: '/v1/staticmap/**',
      },
      {
        protocol: 'https',
        hostname: 'maps.geoapify.com',
        pathname: '/v1/staticmap/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ]},
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
  /* config options here */
};

export default nextConfig;
