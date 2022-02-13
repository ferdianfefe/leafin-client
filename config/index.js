const api =
  process.env.NODE_ENV == 'development'
    ? {
        apiURL: 'http://localhost:5000/api',
      }
    : {
        apiURL: 'https://api.hunaki.my.id/api',
      };

export default api;
