import axios, { AxiosInstance } from "axios";

const prodApi: AxiosInstance = axios.create({
  baseURL: `https://4582-2409-4070-2b9a-770f-ccc5-70c3-e563-8dd3.in.ngrok.io/`,
  headers: {
    "ngrok-skip-browser-warning": "true",
    Accept: "application/json",
    "Access-Control-Allow-Origin": true,
  },
});

const sanboxApi: AxiosInstance = axios.create({
  baseURL: `https://4582-2409-4070-2b9a-770f-ccc5-70c3-e563-8dd3.in.ngrok.io/`,
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
