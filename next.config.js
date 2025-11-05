/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' because we have API routes (backend)
  // API routes require a Node.js server and cannot be statically exported
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig
