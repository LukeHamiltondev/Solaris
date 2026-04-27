/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Emit a static site to `out/` so Cloudflare Pages can serve it directly.
  // Every page in this project is fully static (no API routes, no server
  // components that need a server), so static export is the simplest path.
  output: "export",

  // Cleaner URLs on Pages: /examples/index.html instead of /examples.html
  trailingSlash: true,

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
