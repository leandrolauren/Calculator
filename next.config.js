/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    PORT: process.env.PORT,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  experimental: {
    outputStandalone: true
  }
}

module.exports = nextConfig
