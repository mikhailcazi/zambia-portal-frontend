import { FormSchema } from "@/lib/schema/formSchema";
import axios from "axios";
import * as z from "zod";

const API_BASE = "http://localhost:3000"; // or from env

export const api = {
  getProjects: () => axios.get(`${API_BASE}/projects`),
  getProject: (id: string) => axios.get(`${API_BASE}/projects/${id}`),
  createProject: (data: z.infer<typeof FormSchema>) =>
    axios.post(`${API_BASE}/projects`, data),
};
