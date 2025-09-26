/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Disable turbopack to avoid CSS conflicts
    turbo: false,
  },
  // Ensure CSS is properly loaded
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    return config
  },
}

module.exports = nextConfig