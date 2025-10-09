/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { api } from "../services/api.service";
import { FilterBar } from "@/components/filter-bar";
import ProjectCard from "@/components/project-card";
import Loading from "@/components/ui/loading";
import { Project } from "@/components/project-table";
import { Input } from "@/components/ui/input";

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(false);

  const updateTextFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setFilterText(text);
  };

  const getFilteredList = (projectList: Project[]) => {
    return projectList;
  };

  useEffect(() => {
    setLoading(true);
    api
      .getProjects()
      .then((res) => {
        setProjects(res.data);
        const filtered = getFilteredList(res.data);
        setFilteredProjects(filtered);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <div className="m-5 w-10/12 p-5 rounded-xl mx-auto">
      <h1 className="my-5 font-bold text-3xl">Investment Opportunities</h1>
      <div className="my-5">
        <Input
          placeholder="Search projects, sectors or keywords..."
          value={filterText}
          onChange={updateTextFilter}
          className="max-w-sm bg-white"
        />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid gap-6 grid-cols-4">
          <div className="col-span-1 bg-white rounded-xl">
            <h2 className="my-5 font-bold text-3xl">Filters</h2>
          </div>
          <div className="col-span-3 grid gap-6 grid-cols-2">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} data={project} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
