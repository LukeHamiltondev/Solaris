/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static site in `out/` for Cloudflare Pages (see wrangler.toml).
  output: "export",
  // /work/index.html rather than /work.html, so Pages serves clean URLs.
  trailingSlash: true,
  // No image server on a static export; screenshots are pre-sized WebP.
  images: { unoptimized: true },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
