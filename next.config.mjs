/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable production source maps. Cloudflare Pages rejects any single file
  // larger than 25 MiB, and Next.js/Turbopack was emitting a 54.9 MiB
  // server chunk source map that broke the deploy.
  productionBrowserSourceMaps: false,
  experimental: {
    // Turbopack-specific: don't emit server source maps in production.
    serverSourceMaps: false,
  },
};

export default nextConfig;
