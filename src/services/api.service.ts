import { FilterStatus } from "@/components/filter-bar";
import { FormSchema } from "@/lib/schema/formSchema";
import { UpdateProfileFormData } from "@/pages/user/user-profile";
import axios from "axios";
import * as z from "zod";

const API_BASE = "/api";

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

  resendEmail: (email: string) =>
    axiosInstance.post("/auth/resend-email", { email }),

  updateProfile: (newProfileData: UpdateProfileFormData) =>
    axiosInstance.patch("/project-owner/profile", newProfileData),

  getProposals: (status: FilterStatus) =>
    axiosInstance.get("/proposals", {
      params: {
        status: status.toUpperCase(),
      },
    }),

  // getProposals: (filters: FilterPair) =>
  //   axiosInstance.get("/proposals", { params: filters }),

  getProposalsByUser: (status: FilterStatus) =>
    axiosInstance.get("/proposals/user", {
      params: {
        status: status.toUpperCase(),
      },
    }),

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

  uploadProposalDocuments: (id: string, files: FormData) =>
    axiosInstance.post(`/proposals/${id}/documents`, files, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  getProjects: () => axiosInstance.get("/projects"),

  getProject: (id: string) => axiosInstance.get(`/projects/${id}`),

  getProjectsByUser: () => axiosInstance.get("/projects/user"),

  createProject: (data: z.infer<typeof FormSchema>) =>
    axiosInstance.post("/projects", data),

  getUser: (id: number) => axiosInstance.get(`/users/${id}`),
};
