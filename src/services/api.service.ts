import { FormSchema } from "@/lib/schema/formSchema";
import axios from "axios";
import * as z from "zod";

// const API_BASE = "https://undp-backend.onrender.com";
const API_BASE = "http://localhost:3000"; // or from env

export const api = {
  getProposals: () => axios.get(`${API_BASE}/proposals`),
  getProposal: (id: string) => axios.get(`${API_BASE}/proposals/${id}`),
  createProposal: (data: z.infer<typeof FormSchema>) =>
    axios.post(`${API_BASE}/proposals`, data),

  getProjects: () => axios.get(`${API_BASE}/projects`),
  getProject: (id: string) => axios.get(`${API_BASE}/projects/${id}`),
  createProject: (data: z.infer<typeof FormSchema>) =>
    axios.post(`${API_BASE}/projects`, data),
};
