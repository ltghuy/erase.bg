/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    KEY: process.env.KEY
  }
}

module.exports = nextConfig
