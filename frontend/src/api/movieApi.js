import axios from "axios";
import { ENV } from "../config/env";

const api = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
