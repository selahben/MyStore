import axios from "axios";
import config from "../config.json";

axios.defaults.baseURL = config.apiUrl;
axios.defaults.headers.common = {
  "Content-Type": "application/json",
};

const httpService = {
  get: axios.get,
  post: axios.post,
  patch: axios.patch,
  put: axios.put,
  delete: axios.delete,
};

export default httpService;
