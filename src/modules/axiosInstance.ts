import Axios from "axios";
import config from "../../config.json";

const axiosInstance = Axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
