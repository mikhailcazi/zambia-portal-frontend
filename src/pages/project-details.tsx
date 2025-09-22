import { Project } from "@/components/ProjectTable";
import { useEffect, useState } from "react";
import { api } from "../services/api.service";
import { useParams, useNavigate } from "react-router";
import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    api
      .getProject(id)
      .then((res) => setProject(res.data))
      .catch(console.error);
  }, [id]);

  if (!project) {
    return (
      <div className="p-4">
        <p>Loading project...</p>
      </div>
    );
  }

  return (
    <>
      <div className="p-6 space-y-4 max-w-3xl mx-auto">
        <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
          <ChevronLeftIcon /> Back
        </Button>
        {/* <h1 className="text-2xl font-bold">{project.projectName}</h1> */}
        {/* Display other project fields as before */}
      </div>
    </>
  );
}
