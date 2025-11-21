/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  },
  experimental: {
    optimizePackageImports: ["clsx", "date-fns", "nanoid", "framer-motion"]
  }
};

export default nextConfig;
