import axios from "axios";
import { DOMAIN } from "../utils/setting/config";
const request = axios.create({withCredentials:true, baseURL:DOMAIN});

// request.interceptors.request.use(
//   function (config) {
//     config.baseURL = DOMAIN
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

request.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    if (error.response.status === 403) {
      alert("error 403");
    }
    if (error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default request;
