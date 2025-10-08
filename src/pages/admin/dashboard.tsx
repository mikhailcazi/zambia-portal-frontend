import { ProjectTable } from "@/components/project-table";
import { api } from "../../services/api.service";
import { useEffect, useState } from "react";
import {
  DEFAULT_FILTERS,
  FilterBar,
  FilterPair,
} from "@/components/filter-bar";
import Loading from "@/components/ui/loading";

export default function Dashboard() {
  const [proposals, setProposals] = useState([]);
  const [filters, setFilters] = useState<FilterPair>(DEFAULT_FILTERS);
  const [globalFilter, setGlobalFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFilterChanges = (newfilters: FilterPair) => {
    setFilters(newfilters);
  };

  const handleGlobalFilterChange = (newGlobalFilter: string) => {
    setGlobalFilter(newGlobalFilter);
  };

  useEffect(() => {
    setLoading(true);
    api
      .getProposals(filters)
      .then((res) => {
        setProposals(res.data);
        setLoading(false);
      })
      .catch(console.error);
  }, [filters]);

  return (
    <>
      <div className="border-b-1">
        <FilterBar
          isAdmin={true}
          onFilterChange={handleFilterChanges}
          onGlobalFilterChange={handleGlobalFilterChange}
        />
        {loading ? (
          <Loading />
        ) : (
          <ProjectTable
            data={proposals}
            isAdmin={true}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        )}
      </div>
    </>
  );
}
