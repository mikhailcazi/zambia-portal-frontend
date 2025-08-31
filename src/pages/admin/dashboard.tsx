import { ProjectTable } from "@/components/ProjectTable";
import { api } from "../../services/api.service";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    api
      .getProposals()
      .then((res) => setProposals(res.data))
      .catch(console.error);
  }, []);

  return (
    <>
      <div>
        <h1 className="my-5 font-bold">Proposal Dashboard</h1>
        <ProjectTable data={proposals} isAdmin={true} />
      </div>
    </>
  );
}
