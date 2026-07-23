import { Project } from "@/components/project-table";
import { useEffect, useState } from "react";
import { api } from "../services/api.service";
import { useParams, useNavigate } from "react-router";
import {
  ChevronLeftIcon,
  DownloadIcon,
  FileIcon,
  GlobeIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/project-card";
import { FileFieldKeys } from "@/lib/schema/formSchema";
import { camelToTitle, UploadedFile } from "./admin/proposal-details";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BACKEND_BASE_URL = "/api";

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
    <div className="max-w-7xl mx-auto space-y-4 p-4 md:p-6">
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate("/projects")}
        className="flex items-center gap-2"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        Back
      </Button>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Left column */}
        <div className="w-full space-y-4 lg:w-1/3">
          <ProjectCard data={project} showButton={false} />

          <Card className="bg-[#F7F8FA]">
            <CardHeader>
              <CardTitle className="text-base">Contact Information</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <UserIcon className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Contact Name</p>
                  <p className="font-medium">{project.contactName}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MailIcon className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <a
                    href={`mailto:${project.contactEmail}`}
                    className="font-medium text-[#4e6e54] hover:underline break-all"
                  >
                    {project.contactEmail}
                  </a>
                </div>
              </div>

              {project.contactPhone && (
                <div className="flex items-start gap-3">
                  <PhoneIcon className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Phone</p>
                    <a
                      href={`tel:${project.contactPhone}`}
                      className="font-medium text-[#4e6e54] hover:underline"
                    >
                      {project.contactPhone}
                    </a>
                  </div>
                </div>
              )}

              {project.website && (
                <div className="flex items-start gap-3">
                  <GlobeIcon className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Website</p>
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#4e6e54] hover:underline break-all"
                    >
                      {project.website}
                    </a>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

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
                    className="flex items-center justify-between rounded-2xl bg-[#a5d8c7] px-3 py-2"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <FileIcon className="h-4 w-4 shrink-0 text-gray-600" />
                      <span className="truncate">
                        {camelToTitle(file.type)}
                      </span>
                    </div>

                    <a
                      href={BACKEND_BASE_URL + file.fileData.presignedURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-[#4e6e54] p-2 hover:bg-[#1ab46f]"
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
              <CardTitle className="border-b border-[#a5d8c7] pb-2 text-lg font-semibold">
                Project Overview
              </CardTitle>
            </CardHeader>

            <CardContent>
              {projectOverviewFile ? (
                <iframe
                  src={BACKEND_BASE_URL + projectOverviewFile.presignedURL}
                  title={projectOverviewFile.originalName}
                  className="h-[400px] w-full rounded-md border md:h-[600px]"
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
