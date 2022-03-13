const api = {
  apiURL:
    process.env.NODE_ENV == 'development'
      ? 'http://localhost:5000/api'
      : 'https://api.hunaki.my.id/api',
  socketURL:
    process.env.NODE_ENV == 'development'
      ? 'http://localhost:5000/api'
      : 'https://api.hunaki.my.id/api',
};

export default api;
