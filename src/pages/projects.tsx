/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { api } from "../services/api.service";

export default function ProjectList() {
  const [projects, setProjects] = useState<any>([]);

  useEffect(() => {
    api
      .getProjects()
      .then((res) => setProjects(res.data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {projects.map((p) => (
          <li key={p.id}>
            <strong>{p.projectName}</strong> – {p.location}
          </li>
        ))}
      </ul>
    </div>
  );
}
