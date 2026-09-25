/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  productionBrowserSourceMaps: false,

  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  compress: true,
}

export default nextConfig
