/** @type {import('next').NextConfig} */
// const nextConfig = {}

const nextConfig = {
  experimental: {
    serverActions: true,
    mdxRs: true,
    serverComponentsExternalPackages: ['mongoose'],
  }
}

module.exports = nextConfig
