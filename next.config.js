/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PORT: process.env.PORT,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
}

module.exports = nextConfig
