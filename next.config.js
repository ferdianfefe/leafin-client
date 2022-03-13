const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    runtimeCaching,
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
    buildExcludes: [
      /middleware-manifest\.json$/,
      /_middleware.js$/,
      /_middleware.js.map$/,
      /middleware-runtime.js$/,
    ],
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
  async rewrites() {
    return [
      {
        source: '/ar',
        destination: '/ar.html',
      },
    ];
  },
});
