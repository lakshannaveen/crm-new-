// api.js
import axios from "axios";

// Create axios instance with relative baseURL so CRA dev proxy can forward requests
// In development the `proxy` in package.json forwards calls to the backend
const api = axios.create({
  baseURL: "",
  timeout: 120000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    // If running in a browser and offline, fail fast with a clear error
    try {
      if (typeof navigator !== "undefined" && navigator && !navigator.onLine) {
        return Promise.reject(new Error("Network Error: offline"));
      }
    } catch (e) {
      // ignore
    }
    // Prefer the unified `token` key set by auth flow; fallback to configured legacy key
    const tokenKey = "token";
    const fallbackKey =
      (config && config.auth && config.auth.tokenKey) || "cd_crm_token";
    const token =
      localStorage.getItem(tokenKey) || localStorage.getItem(fallbackKey);
    if (token) {
      // preflight issues when `Authorization` isn't allowed by the server.
      config.headers["auth-key"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Distinguish network/offline errors vs server responses
    if (!error.response) {
      const msg = (error && error.message) || "Network Error";
      console.warn("API Network Error:", msg, error.config && error.config.url);
      return Promise.reject(
        new Error("Network Error: Unable to reach API. " + msg)
      );
    }

    // Server responded with a status code
    console.error(
      "API Error:",
      error.response.status,
      error.response.data || error.message
    );
    return Promise.reject(error);
  }
);

export default api;
