import { ProjectTable } from "@/components/project-table";
import { api } from "../../services/api.service";
import { useEffect, useState } from "react";
import { FilterBar, FilterStatus } from "@/components/filter-bar";
import Loading from "@/components/ui/loading";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const [proposals, setProposals] = useState([]);
  const [status, setStatus] = useState<FilterStatus>("pending");
  const [globalFilter, setGlobalFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleStatusChange = (newStatus: FilterStatus) => {
    setStatus(newStatus);
  };

  const handleGlobalFilterChange = (newGlobalFilter: string) => {
    setGlobalFilter(newGlobalFilter);
  };

  useEffect(() => {
    setLoading(true);

    api
      .getProposals(status)
      .then((res) => {
        setProposals(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.status === 401) {
          nav("/admin/login");
        }
        setLoading(false);
      });
  }, [status]);

  return (
    <>
      <div className="border-b-1">
        <FilterBar
          isAdmin={true}
          onStatusChange={handleStatusChange}
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
