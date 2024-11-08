/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  env: {
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
};

export default nextConfig;