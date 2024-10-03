/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  removeConsole:
    process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
};

export default nextConfig;
