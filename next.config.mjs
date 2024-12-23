/** @type {import('next').NextConfig} */
const nextConfig = {};
nextConfig.images = {
  domains: [],
  remotePatterns: [
    {
      protocol: "https",
      hostname: "**",
    },
  ],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true, 
  },
};
export default nextConfig;
