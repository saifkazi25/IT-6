/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: 'loose',
  },
  images: {
    domains: ['oaidalleapiprodscus.blob.core.windows.net'],
  },
};
module.exports = nextConfig;