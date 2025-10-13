/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { api } from "../services/api.service";
import ProjectCard from "@/components/project-card";
import Loading from "@/components/ui/loading";
import { Project } from "@/components/project-table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ProjectFilter from "@/components/filter";
import {
  CategoryValues,
  FinancialOptions,
  ProjectStages,
} from "@/lib/schema/formSchema";

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(false);

  const updateTextFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setFilterText(text);
    const newFilteredProjects = getFilteredList(projects, text);
    setFilteredProjects(newFilteredProjects);
  };

  const getFilteredList = (projectList: Project[], text: string | null) => {
    if (text == null) return projectList;

    const filterValue = text.toLowerCase();

    const filteredRows = projectList.filter((row) => {
      return (Object.keys(row) as (keyof Project)[]).some((key) => {
        const value = row[key];

        if (value == null) return false;

        if (Array.isArray(value)) {
          return value.some((v) =>
            String(v).toLowerCase().includes(filterValue)
          );
        }

        if (typeof value === "object") {
          // for nested objects
          return Object.values(value).some((v) =>
            String(v).toLowerCase().includes(filterValue)
          );
        }

        return String(value).toLowerCase().includes(filterValue);
      });
    });

    return filteredRows;
  };

  useEffect(() => {
    setLoading(true);
    api
      .getProjects()
      .then((res) => {
        setProjects(res.data);
        const filtered = getFilteredList(res.data, null);
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
      <div className="relative my-5 w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5 pointer-events-none" />
        <Input
          placeholder="Search projects, sectors or keywords..."
          value={filterText}
          onChange={updateTextFilter}
          className="pl-9 bg-white"
        />
      </div>

      <div className="grid gap-6 grid-cols-4">
        <div className="col-span-1 bg-white rounded-xl">
          <h2 className="mx-4 mt-4 font-bold text-xl">Filter by:</h2>
          <ProjectFilter
            field={"stage"}
            name={"Stage"}
            values={ProjectStages}
          />
          <ProjectFilter
            field={"categories"}
            name={"Categories"}
            values={CategoryValues}
          />
          <ProjectFilter
            field={"fundingSought"}
            name={"Funding Sought"}
            values={FinancialOptions}
          />
        </div>
        <div className="col-span-3 grid gap-6 grid-cols-2 auto-rows-min content-start items-start">
          {loading ? (
            <Loading />
          ) : (
            filteredProjects.map((project) => (
              <ProjectCard key={project.id} data={project} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
