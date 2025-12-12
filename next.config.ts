import type { NextConfig } from "next";
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  serverExternalPackages: ['drizzle-kit', 'esbuild', '@esbuild/darwin-arm64'],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), 'drizzle-kit', 'esbuild']
    }
    config.resolve.alias = {
      ...config.resolve.alias,
      '@esbuild/darwin-arm64': false,
      '@esbuild/linux-x64': false,
      '@esbuild/win32-x64': false,
    }
    return config
  },
};

export default withPayload(nextConfig);
