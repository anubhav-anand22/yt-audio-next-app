/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["https://i.ytimg.com"],
    remotePatterns: [{
      protocol: "https",
      hostname: "i.ytimg.com"
    }]
  }
}

module.exports = nextConfig
