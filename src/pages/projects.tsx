/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { api } from "../services/api.service";
import { ProjectTable } from "@/components/ProjectTable";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api
      .getProjects()
      .then((res) => setProjects(res.data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="my-5 font-bold">Investment Opportunities</h1>
      <ProjectTable data={projects} isAdmin={false} />
    </div>
  );
}
