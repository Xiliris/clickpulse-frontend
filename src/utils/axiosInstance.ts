import Axios from "axios";
import config from "../../config.json";

const axiosInstance = Axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
