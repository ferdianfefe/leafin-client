const withPWA = require('next-pwa');

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
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
