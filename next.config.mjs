/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/api/v2": ["./*"],
    },
  },
};

export default nextConfig;
