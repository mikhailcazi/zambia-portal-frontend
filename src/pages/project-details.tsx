import { Project } from "@/components/project-table";
import { useEffect, useState } from "react";
import { api } from "../services/api.service";
import { useParams, useNavigate } from "react-router";
import { ChevronLeftIcon, DownloadIcon, FileIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/project-card";
import { FileFieldKeys } from "@/lib/schema/formSchema";
import { camelToTitle, UploadedFile } from "./admin/proposal-details";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BACKEND_BASE_URL =
  import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:3000";

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
    if (!project) return;

    setProjectOverviewFile(project.projectOverview);

    const fileNames: FileFieldKeys[] = [
      "companyRegistration",
      "businessPlan",
      "financialStatements",
      "partnerships",
      "techStudies",
      "other",
    ];

    const projectFiles = fileNames
      .filter((f) => project[f]?.key)
      .map((f) => ({
        type: f,
        fileData: project[f] as UploadedFile,
      }));

    setFiles(projectFiles);
  }, [project]);

  if (!project) {
    return (
      <div className="p-4 max-w-3xl mx-auto">
        <p>Loading project...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate("/projects")}
        className="flex items-center gap-2"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        Back
      </Button>

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left column */}
        <div className="w-full lg:w-1/3 space-y-4">
          <ProjectCard data={project} showButton={false} />

          <Card className="bg-[#F7F8FA]">
            <CardHeader>
              <CardTitle className="text-base">
                Supporting Documents Uploaded
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {files.map((file, index) => (
                  <li
                    key={index}
                    className="bg-[#a5d8c7] flex items-center justify-between rounded-2xl px-3 py-2"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <FileIcon className="h-4 w-4 text-gray-600 shrink-0" />
                      <span className="truncate">
                        {camelToTitle(file.type)}
                      </span>
                    </div>
                    <a
                      href={BACKEND_BASE_URL + file.fileData.presignedURL}
                      target="_blank"
                      className="bg-[#4e6e54] hover:bg-[#1ab46f] p-2 rounded-xl"
                    >
                      <DownloadIcon className="h-4 w-4 text-white" />
                    </a>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="w-full lg:w-2/3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold border-b border-[#a5d8c7] pb-2">
                Project Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              {projectOverviewFile ? (
                <iframe
                  src={BACKEND_BASE_URL + projectOverviewFile.presignedURL}
                  className="w-full rounded-md border h-[400px] md:h-[600px]"
                  title={projectOverviewFile.originalName}
                />
              ) : (
                <div className="flex items-center gap-2 text-sm">
                  <FileIcon className="h-4 w-4 text-gray-500" />
                  <span>Project Overview Missing</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
