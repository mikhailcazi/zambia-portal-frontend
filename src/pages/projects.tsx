/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { api } from "../services/api.service";
import { FilterBar } from "@/components/filter-bar";
import ProjectCard from "@/components/project-card";
import Loading from "@/components/ui/loading";
import { Project } from "@/components/project-table";

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGlobalFilterChange = (newGlobalFilter: string) => {
    console.log(globalFilter);
    setGlobalFilter(newGlobalFilter);
  };

  useEffect(() => {
    setLoading(true);
    api
      .getProjects()
      .then((res) => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <div className="m-5 w-5xl p-5 rounded-xl mx-auto">
      <h1 className="my-5 font-bold">Investment Opportunities</h1>
      <FilterBar
        isAdmin={false}
        onGlobalFilterChange={handleGlobalFilterChange}
      />
      {loading ? (
        <Loading />
      ) : (
        <div className="grid gap-6 grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} data={project} />
          ))}
        </div>
      )}
    </div>
  );
}
