import { Project } from "@/components/project-table";
import { useEffect, useState } from "react";
import { api } from "../services/api.service";
import { useParams, useNavigate } from "react-router";
import { ChevronLeftIcon, DownloadIcon, FileIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/project-card";
import { FileFieldKeys } from "@/lib/schema/formSchema";
import { UploadedFile } from "./admin/proposal-details";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const navigate = useNavigate();
  const [files, setFiles] = useState<
    { fileData: UploadedFile; type: string }[]
  >([]);
  const [projectOverviewFile, setProjectOverviewFile] =
    useState<UploadedFile>();

  useEffect(() => {
    if (!id) return;

    api
      .getProject(id)
      .then((res) => setProject(res.data))
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    if (project) {
      setProjectOverviewFile(project.projectOverview);

      const fileNames: FileFieldKeys[] = [
        "companyRegistration",
        "businessPlan",
        "financialStatements",
        "partnerships",
        "techStudies",
        "other",
      ];
      const projectFiles: { fileData: UploadedFile; type: string }[] = [];

      fileNames.forEach((fName) => {
        if (project[fName]?.key) {
          projectFiles.push({
            type: fName,
            fileData: project[fName] as UploadedFile,
          });
        }
      });

      setFiles(projectFiles);
    }
  }, [project]);

  if (!project) {
    return (
      <div className="p-6 space-y-4 max-w-3xl mx-auto">
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

        <ProjectCard data={project} showButton={false} />

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold mb-4">
              Project Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            {projectOverviewFile ? (
              <div className="flex items-center justify-between rounded-md border p-2">
                <span>{projectOverviewFile.originalName}</span>

                <FileIcon className="h-4 w-4 text-gray-500" />
                {/* <div className="flex items-center space-x-2">
                  <FileIcon className="h-4 w-4 text-gray-500" />
                  <span>{projectOverviewFile.originalName}</span>
                </div>
                <a href={projectOverviewFile.presignedURL} target="_blank">
                  <DownloadIcon className="h-4 w-4 text-gray-600 hover:text-gray-900" />
                </a> */}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <FileIcon className="h-4 w-4 text-gray-500" />
                <span>Project Overview Missing!</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
