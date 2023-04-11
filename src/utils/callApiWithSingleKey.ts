import axios from "axios";
import { API_BASE_URL, HERPLAN_SINGLE_KEY } from "src/shared/constants";

const axiosIntSingleKey = axios.create({
  baseURL: API_BASE_URL,
});

axiosIntSingleKey.interceptors.request.use(async (config) => {
  const token = HERPLAN_SINGLE_KEY;
  if (token) {
    (config as any).headers["Authorization"] = token;
  }
  return config;
}, Promise.reject);

axiosIntSingleKey.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject((error.response && error.response.data) || "There is an error!");
  }
);

export default axiosIntSingleKey;
