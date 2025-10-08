import { FilterPair } from "@/components/filter-bar";
import { FormSchema } from "@/lib/schema/formSchema";
import axios from "axios";
import * as z from "zod";

const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://undp-backend.onrender.com";

const protectedRoutes = ["/proposals"];

// Create an Axios instance
const axiosInstance = axios.create({ baseURL: API_BASE });

// Add a request interceptor to attach JWT for protected routes
axiosInstance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("token");
  if (token && protectedRoutes.some((path) => config.url?.startsWith(path))) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  login: (username: string, password: string) =>
    axiosInstance.post("/auth/login", { username, password }),

  getProposals: (filters: FilterPair) =>
    axiosInstance.get("/proposals", { params: filters }),

  getProposal: (id: string) => axiosInstance.get(`/proposals/${id}`),

  createProposal: (data: FormData) =>
    axiosInstance.post("/proposals", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  approveProposal: (id: string) =>
    axiosInstance.patch(`/proposals/${id}/approve`),

  getProjects: () => axiosInstance.get("/projects"),

  getProject: (id: string) => axiosInstance.get(`/projects/${id}`),

  createProject: (data: z.infer<typeof FormSchema>) =>
    axiosInstance.post("/projects", data),
};
