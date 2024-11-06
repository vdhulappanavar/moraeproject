import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // output: 'export',
    basePath: '/moraeproject', 
    images: {
        unoptimized: true, 
    },
};

export default nextConfig;
