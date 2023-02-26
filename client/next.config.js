/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
    },
    env: {
      DB_URL: 'mongodb://127.0.0.1/usersdb',
      NEXTAUTH_SECRET: 'ASDFFIUDSHGAOIFNCIVJBN'
    }
  };
  
  module.exports = nextConfig;