/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@react-three/drei', 'framer-motion'],
  },
  webpack: (config) => {
    config.optimization = {
      ...config.optimization,
      sideEffects: false,
    }
    return config
  },
  modularizeImports: {
    lodash: {
      transform: 'lodash/{{member}}',
    },
  },
}

let configWithAnalyzer = nextConfig
if (process.env.ANALYZE === 'true') {
  const withBundleAnalyzer = (await import('@next/bundle-analyzer')).default({
    enabled: true,
  })
  configWithAnalyzer = withBundleAnalyzer(nextConfig)
}

export default configWithAnalyzer
