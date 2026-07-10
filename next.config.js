/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export so this can be deployed to Surge (or any static host).
  // If you switch to Vercel instead, you can safely remove this line —
  // Vercel handles Next.js natively without needing a static export.
  output: "export",
  images: {
    unoptimized: true, // required for static export, next/image needs a server otherwise
  },
};

module.exports = nextConfig;
