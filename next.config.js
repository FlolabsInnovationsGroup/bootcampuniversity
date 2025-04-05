/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    minimumCacheTTL: 60,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  // Add transpilePackages for problematic dependencies
  transpilePackages: ['cheerio', 'undici'],
  // Handle modern JS features not supported in some environments
  experimental: {
    // Opt-in to newer JS transforms
    serverActions: true,
    swcMinify: true,
  },
};

module.exports = nextConfig; 