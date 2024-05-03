import { envs } from "@constant";
import axios from "axios";

export const apiInstances = axios.create({
  baseURL: `${envs.BASE_URL}/api`,
  responseType: "json",
});

apiInstances.interceptors.request.use(
  async (config) => {
    config.headers["Authorization"] = `Bearer ${
      localStorage.getItem("act") || ""
    }`;
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json;charset=UTF-8";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function download(url, config) {
  const res = await apiInstances.get(url, config);
  return res;
}

export async function get(url, config) {
  const res = await apiInstances.get(url, config);
  return res.data;
}

export async function put(url, data, config) {
  const res = await apiInstances.put(url, data, config);
  return res.data;
}

export async function post(url, data, config) {
  const res = await apiInstances.post(url, data, config);
  return res.data;
}
