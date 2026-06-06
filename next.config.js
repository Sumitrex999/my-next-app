/**
 * Next.js configuration
 * Allows remote image loading from images.unsplash.com used in `app/page.tsx`.
 */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

module.exports = nextConfig;
