/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { api } from "../services/api.service";
import ProjectCard from "@/components/project-card";
import Loading from "@/components/ui/loading";
import { Project } from "@/components/project-table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ProjectFilter from "@/components/filter";
import { filterList } from "@/lib/schema/filterSchema";

type FilterObject = {
  [k: string]: string[];
};

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FilterObject>(
    Object.fromEntries(filterList.map((k) => [k, []]))
  );

  const updateTextFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setFilterText(text);
    const newFilteredProjects = getTextFilteredList(projects, text);
    setFilteredProjects(newFilteredProjects);
  };

  const handleFilterChanged = (field: string, values: string[]) => {
    const newFilters = {
      ...filters,
      [field]: values,
    };
    setFilters(newFilters);

    const newFilteredProjects = getCheckFilteredList(projects, newFilters);
    setFilteredProjects(newFilteredProjects);
  };

  const getCheckFilteredList = (
    projectList: Project[],
    newFilters: FilterObject
  ) => {
    console.log(projectList);
    return projectList.filter((project) =>
      Object.entries(newFilters).every(([key, values]) => {
        if (values.length === 0) return true; // no filter on this key

        const field = project[key as keyof Project] as string;
        if (Array.isArray(field)) {
          // check if any of the filter values exist in the project array
          return field.some((v) => values.includes(v));
        }

        // otherwise, just do a direct match
        return values.includes(field as string);
      })
    );
  };
  const getTextFilteredList = (projectList: Project[], text: string | null) => {
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
        const filtered = getTextFilteredList(res.data, null);
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
          {filterList.map((filter, index) => (
            <ProjectFilter
              key={index}
              field={filter}
              onFilterChanged={handleFilterChanged}
            />
          ))}
        </div>
        <div className="col-span-3 grid gap-6 grid-cols-2 auto-rows-min content-start items-start">
          {loading ? (
            <Loading />
          ) : (
            filteredProjects.map((project) => (
              <ProjectCard key={project.id} data={project} showButton={true} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
