import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const httpClient = axios.create({
  baseURL: process.env.OMDB_BASE_URL,
  timeout: 6000,
});

export default httpClient;
