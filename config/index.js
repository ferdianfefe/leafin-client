const api = {
  apiURL:
    process.env.NODE_ENV == "development"
      ? "http://localhost:5000/api"
      : "http://localhost:5000/api",
  socketURL: "http://localhost:5000",
};

export default api;
