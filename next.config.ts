import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.ambalaymaps.com",
        port: "",
        pathname: "/v1/staticmap",
      },
    ]}
  /* config options here */
};

export default nextConfig;
