/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Disable SWC compiler
  experimental: {
    forceSwcTransforms: false,
  },
};

module.exports = nextConfig;