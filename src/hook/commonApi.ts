import axios from "axios";

export const commonApis = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api/v1",
  timeout: 120000,
  withCredentials: true,
});