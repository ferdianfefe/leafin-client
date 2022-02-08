module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/ar',
        destination: '/ar.html',
      },
    ];
  },
};
