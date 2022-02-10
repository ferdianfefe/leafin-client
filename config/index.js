const api =
  process.env.NEXT_PUBLIC_TYPE == 'PRODUCTION'
    ? {
        apiURL: 'https://leafinback/api',
      }
    : {
        apiURL: 'http://localhost:5000/api',
      };

export default api;
