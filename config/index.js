const api = {
  apiURL:
    process.env.NODE_ENV == 'development'
      ? 'http://localhost:5000/api'
      : 'http://localhost:5000/api',
  socketURL:
    process.env.NODE_ENV == 'development'
      ? 'http://localhost:5000/api'
      : 'http://localhost:5000/api',
};

export default api;
