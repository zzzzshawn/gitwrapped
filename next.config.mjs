/** @type {import('next').NextConfig} */
const nextConfig = {};
nextConfig.images = {
    domains: [],
    remotePatterns: [
        {
            protocol: 'https',
            hostname: '**',
        },
    ],
};
export default nextConfig;
