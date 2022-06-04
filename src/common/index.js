import axios from "axios";
// Add a request interceptor

export const rootUrl = "http://localhost:5022";
// export const rootUrl = "";
export const host = `${rootUrl}/api`;
//  export const host = '';
export const base = `${rootUrl}`;

export const http = axios.create({
  baseURL: host,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// express http
export const expressUrl = rootUrl;
// export const expressUrl = '';
export const expressHost = `${expressUrl}/api`;

export const expressHttp = axios.create({
  baseURL: expressHost,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
