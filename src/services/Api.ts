import axios, { AxiosInstance } from "axios";

const prodApi: AxiosInstance = axios.create({
  baseURL: `https://frontend-engine.sandbox.getknit.dev/`,
  headers: {
    "ngrok-skip-browser-warning": "true",
    Accept: "application/json",
    "Access-Control-Allow-Origin": true,
  },
});

const sanboxApi: AxiosInstance = axios.create({
  baseURL: `https://frontend-engine.sandbox.getknit.dev/`,
  headers: {
    "ngrok-skip-browser-warning": "true",
    Accept: "application/json",
    "Access-Control-Allow-Origin": true,
  },
});
const getAxiosInstance = (sandBoxVar: boolean = false): AxiosInstance => {
  return sandBoxVar ? sanboxApi : prodApi;
};

export default getAxiosInstance;
