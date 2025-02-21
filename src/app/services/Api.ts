import axios from "axios";
import { DB_TOKEN, DB_LOGGED_IN_PROFILE, API_URL } from "../../Constants";
import Utils from "./Utils";

// Create an axios instance with default configuration
const api = axios.create({
  // baseURL: "https://fabricare.hambren.com/api", // Backend API base URL
  baseURL: API_URL, // Backend API base URL
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Function to handle user registration
export async function register(email: string, password: string) {
  return handleAuth("users/register", { username: email, password });
}

// Function to handle user login
export async function login(email: string, password: string) {
  return handleAuth("users/login", { username: email, password });
}

// Common function to handle authentication
async function handleAuth(path: string, params: Record<string, any>) {
  try {
    const resp = await http_post(path, params);
    saveUserData(resp);
    return resp;
  } catch (error) {
    throw new Error(`${path.split("/").pop()} failed: ${error}`);
  }
}

// Save user data to local storage
interface UserResponse {
  remember_token: string;
  [key: string]: any;
}

function saveUserData(resp: UserResponse) {
  const token = resp.remember_token;
  if (!token || token.length <= 5) {
    throw new Error("Invalid token received");
  }
  try {
    Utils.saveToDatabase(DB_TOKEN, token);
    Utils.saveToDatabase(DB_LOGGED_IN_PROFILE, resp);
  } catch (error) {
    throw new Error("Failed to save data to local storage: " + error);
  }
}

// Add an interceptor for request authorization
api.interceptors.request.use(
  (config) => {
    const token = Utils.loadFromDatabase(DB_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.tok = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

// Function to make a POST request
export const http_post = async (path: string, params: Record<string, any>) => {
  try {
    const response = await api.post(path, params, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });
    return handleResponse(response);
  } catch (error) {
    console.error("POST request failed:", error);
    throw new Error("" + error);
  }
};

// Function to make a GET request
export const http_get = async (path: string, params?: Record<string, any>) => {
  try {
    const response = await api.get(path, { params });
    return response.data;
  } catch (error) {
    console.error("GET request failed:", error);
    throw new Error("GET request failed: " + error);
  }
};

// Handle API response
function handleResponse(response: any) {
  if (!response) {
    throw new Error("Failed to fetch data because response is null");
  }
  const { data } = response;
  if (!data) {
    throw new Error("Failed to fetch data because data is null");
  }
  const code = parseInt(data.code, 10); // should be int
  if (code !== 1) {
    throw new Error(data.message);
  }
  return data.data;
}

export default api;
