/** @type {import('next').NextConfig} */
const nextConfig = {
  // Moved from experimental to top level in Next.js 15
  serverExternalPackages: ["@prisma/client", "bcryptjs"],
  images: {
    // Configure image optimization
    formats: ["image/webp", "image/avif"],
  },
  // Enable strict mode for development
  reactStrictMode: true,
  // Disable x-powered-by header for security
  poweredByHeader: false,
}

export default nextConfig
