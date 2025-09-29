/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { api } from "../services/api.service";
import { ProjectTable } from "@/components/ProjectTable";
import { FilterBar } from "@/components/filter-bar";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const handleGlobalFilterChange = (newGlobalFilter: string) => {
    setGlobalFilter(newGlobalFilter);
  };

  useEffect(() => {
    api
      .getProjects()
      .then((res) => setProjects(res.data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="my-5 font-bold">Investment Opportunities</h1>
      <FilterBar
        isAdmin={false}
        onGlobalFilterChange={handleGlobalFilterChange}
      />
      <ProjectTable
        data={projects}
        isAdmin={false}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </div>
  );
}
