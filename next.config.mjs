/** @type {import('next').NextConfig} */
// GitHub Pages serves project sites under /<repo-name>/, so production builds
// (including the static export deployed to Pages) need a matching basePath.
const basePath = process.env.NODE_ENV === "production" ? "/ariya-techno" : "";

const nextConfig = {
  output: "export",
  basePath,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};
export default nextConfig;
