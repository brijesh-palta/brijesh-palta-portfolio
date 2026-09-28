/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/brijesh-palta-portfolio" : "",
  productionBrowserSourceMaps: false,

  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  compress: true,
}

export default nextConfig
