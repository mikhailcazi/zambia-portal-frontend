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
      console.log(files);
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
      <div className="p-6 max-w-7xl mx-auto space-y-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/projects")}
        >
          <ChevronLeftIcon /> Back
        </Button>

        <div className="flex gap-6">
          {/* Left Column - Project Card */}
          <div className="w-1/3">
            <ProjectCard data={project} showButton={false} />
            <Card className="my-4 bg-[#F7F8FA]">
              <CardHeader>
                <CardTitle>Supporting Documents Uploaded</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {files.map((file, index) => (
                    <li
                      key={index}
                      className="bg-[#a5d8c7] flex items-center justify-between rounded-3xl p-2"
                    >
                      <div className="flex items-center space-x-2">
                        <FileIcon className="h-4 w-4 text-gray-500" />
                        <span>{camelToTitle(file.type)}</span>
                      </div>
                      <div className="bg-[#4e6e54] hover:bg-[#1ab46f] p-1 rounded-xl">
                        <a href={file.fileData?.presignedURL} target="_blank">
                          <DownloadIcon className="h-4 w-4 text-white" />
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Project Overview */}
          <div className="w-2/3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold border-b-2 border-[#a5d8c7] pb-1">
                  Project Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                {projectOverviewFile ? (
                  <iframe
                    src={projectOverviewFile.presignedURL}
                    width="100%"
                    height="600px"
                    className="rounded-md border"
                    title={projectOverviewFile.originalName}
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <FileIcon className="h-4 w-4 text-gray-500" />
                    <span>Project Overview Missing!</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
