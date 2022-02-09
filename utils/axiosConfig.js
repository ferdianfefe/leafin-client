import axios from "axios";
import config from "../config";

const app = axios.create({
  baseURL: config.apiURL,
  withCredentials: true,
});

app.interceptors.response.use(
  (response) => response,
  (error) => {
    Promise.reject(error.response.data.message);
  }
);

export default app;
