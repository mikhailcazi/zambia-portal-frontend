import { FilterPair } from "@/components/filter-bar";
import { FormSchema } from "@/lib/schema/formSchema";
import axios from "axios";
import * as z from "zod";

const API_BASE =
  import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:3000";

// Create an Axios instance
const axiosInstance = axios.create({ baseURL: API_BASE });

// Add a request interceptor to attach JWT for protected routes
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      console.log(error);
      // window.location.href = "/user/login";
    }

    return Promise.reject(error);
  },
);

export const api = {
  adminLogin: (username: string, password: string) =>
    axiosInstance.post("/auth/admin/login", { username, password }),

  userLogin: (username: string, password: string) =>
    axiosInstance.post("/auth/login", { username, password }),

  userRegister: (
    email: string,
    password: string,
    name: string,
    organization: string,
    location: string,
    position: string,
  ) =>
    axiosInstance.post("/auth/register", {
      email,
      password,
      name,
      organization,
      location,
      position,
    }),

  verifyEmail: (token: string) =>
    axiosInstance.post("/auth/verify-email", { token }),

  resendEmail: (token: string) =>
    axiosInstance.post("/auth/resend-email", { token }),

  getProposals: (filters: FilterPair) =>
    axiosInstance.get("/proposals", { params: filters }),

  getProposal: (id: string) => axiosInstance.get(`/proposals/${id}`),

  createProposal: (data: FormData) =>
    axiosInstance.post("/proposals", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  approveProposal: (id: string, comment: string) =>
    axiosInstance.patch(
      `/proposals/${id}/approve`,
      { comment },
      { headers: { "Content-Type": "application/json" } },
    ),

  rejectProposal: (id: string, comment: string) =>
    axiosInstance.patch(
      `/proposals/${id}/reject`,
      { comment },
      { headers: { "Content-Type": "application/json" } },
    ),

  addComment: (id: string, comment: string) =>
    axiosInstance.post(
      `/proposals/${id}/comments`,
      { comment },
      { headers: { "Content-Type": "application/json" } },
    ),

  getProjects: () => axiosInstance.get("/projects"),

  getProject: (id: string) => axiosInstance.get(`/projects/${id}`),

  createProject: (data: z.infer<typeof FormSchema>) =>
    axiosInstance.post("/projects", data),
};
