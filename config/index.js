const api =
  process.env.NEXT_PUBLIC_TYPE == 'PRODUCTION'
    ? {
        apiURL: 'http://api.hunaki.my.id/api',
      }
    : {
        apiURL: 'http://localhost:5000/api',
      };

export default api;
