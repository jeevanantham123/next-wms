/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    "/api": ["./*"],
  },
};

export default nextConfig;
