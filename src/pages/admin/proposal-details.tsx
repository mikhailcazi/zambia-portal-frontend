import { Project } from "@/components/project-table";
import { Fragment, useEffect, useState } from "react";
import { api } from "../../services/api.service";
import { useParams, useNavigate } from "react-router";
import { Check, ChevronLeftIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileIcon, DownloadIcon } from "lucide-react";
import { FileFieldKeys } from "@/lib/schema/formSchema";
import Loading from "@/components/ui/loading";
import CommentList from "@/components/comment-list";

export type UploadedFile = {
  originalName: string;
  key: string;
  id: string;
  name: string;
  url: string;
  presignedURL: string;
};

const BACKEND_BASE_URL =
  import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:3000";

export function ProposalDetails() {
  const { id } = useParams<{ id: string }>();
  const [proposal, setProposal] = useState<Project | null>(null);
  const navigate = useNavigate();
  const [files, setFiles] = useState<
    { fileData: UploadedFile; type: string }[]
  >([]);
  const [projectOverviewFile, setProjectOverviewFile] =
    useState<UploadedFile>();
  const isAdmin = () => {
    return true;
  };
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    api
      .getProposal(id)
      .then((res) => setProposal(res.data))
      .catch((err) => {
        console.error(err);
        if (err.status === 401) {
          navigate("/admin/login");
        }
      });
  }, [id]);

  useEffect(() => {
    if (proposal) {
      setProjectOverviewFile(proposal.projectOverview);

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
        if (proposal[fName]?.key) {
          projectFiles.push({
            type: fName,
            fileData: proposal[fName] as UploadedFile,
          });
        }
      });

      setFiles(projectFiles);
    }
  }, [proposal]);

  if (!proposal) {
    return <Loading />;
  }

  const approveProposal = () => {
    api
      .approveProposal(proposal.id, comment)
      .then((res) => {
        console.log(res);
        navigate(-1);
      })
      .catch((err) => {
        setError("Something went wrong... Try again! ERR Code: " + err);
      });
  };

  const addComment = () => {
    api
      .addComment(proposal.id, comment)
      .then((res) => {
        console.log(res);
        navigate(-1);
      })
      .catch((err) => {
        setError("Something went wrong... Try again! ERR Code: " + err);
      });
  };

  const rejectProposal = () => {
    api
      .rejectProposal(proposal.id, comment)
      .then((res) => {
        console.log(res);
        navigate(-1);
      })
      .catch((err) => {
        setError("Something went wrong... Try again! ERR Code: " + err);
      });
  };

  return (
    <>
      <div className="p-6 max-w-7xl mx-auto space-y-4">
        <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
          <ChevronLeftIcon /> Back
        </Button>
        <div className="bg-gradient-to-b from-[#e4e9dd] to-[#c5e6dc] rounded-t-sm rounded-bl-sm p-4">
          <span className="font-bold">Project Title:</span>
          <h1 className="text-2xl font-bold text-[#4e6e54]">
            {proposal.projectTitle}
          </h1>
        </div>

        <div className="max-w-7xl grid grid-cols-3 space-x-6">
          <div className="col-span-2 space-y-4 my-4">
            <div className="grid grid-cols-8 space-x-6 ">
              <Card className="col-span-5">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold mb-4">
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                    <dt className="text-gray-600 font-medium">
                      Organization / Proponent
                    </dt>
                    <dd>{proposal.organization}</dd>

                    <dt className="text-gray-600 font-medium">
                      Contact Person & Details
                    </dt>
                    <dd>{proposal.contactPerson}</dd>

                    <dt className="text-gray-600 font-medium">
                      Project Location
                    </dt>
                    <dd>{proposal.location}</dd>

                    <dt className="text-gray-600 font-medium">
                      Implementation Date
                    </dt>
                    <dd>
                      {new Date(proposal.startDate).toLocaleDateString(
                        "en-gb"
                      ) +
                        " - " +
                        new Date(proposal.endDate)?.toLocaleDateString("en-gb")}
                    </dd>

                    <dt className="text-gray-600 font-medium">
                      Sector / Subsector
                    </dt>
                    <dd>{proposal.sector}</dd>

                    <dt className="text-gray-600 font-medium">Project Stage</dt>
                    <dd>{proposal.stage}</dd>

                    <dt className="text-gray-600 font-medium">
                      Estimated Required Investment
                    </dt>
                    <dd>{proposal.estimatedInvestment}</dd>
                  </dl>
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold mb-4">
                    Project Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {projectOverviewFile ? (
                    <div className="flex items-center justify-between rounded-md border p-2">
                      <div className="flex items-center space-x-2">
                        <FileIcon className="h-4 w-4 text-gray-500" />
                        <span>{projectOverviewFile.originalName}</span>
                      </div>
                      <a
                        href={
                          BACKEND_BASE_URL + projectOverviewFile.presignedURL
                        }
                        target="_blank"
                      >
                        <DownloadIcon className="h-4 w-4 text-gray-600 hover:text-gray-900" />
                      </a>
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

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold mb-4">
                  Eligibility Screening
                </CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                  <dt className="text-gray-600 font-medium">
                    Eligible Categories:
                  </dt>
                  <dd>
                    <ul>
                      {proposal.categories.map((cat, i) => {
                        if (cat !== "Other") {
                          return <li key={i}>{"• " + cat}</li>;
                        }
                        return (
                          <li key={i}>
                            {"• " + cat + ": " + proposal.categoriesOther}
                          </li>
                        );
                      })}
                    </ul>
                  </dd>

                  <dt className="text-gray-600 font-medium">
                    Environmental & Climate Impact:
                  </dt>
                  <dd>
                    <ul>
                      {proposal.envImpact.map((cat, i) => (
                        <li key={i}>{"• " + cat}</li>
                      ))}
                    </ul>
                  </dd>

                  <dt className="text-gray-600 font-medium">
                    Targets/Indicators:
                  </dt>
                  <dd>{proposal.envImpactIndicator}</dd>

                  <dt className="text-gray-600 font-medium">
                    Brief description of environmental impact
                  </dt>
                  <dd>{proposal.envImpactDescription}</dd>

                  <dt className="text-gray-600 font-medium">
                    Social & Developmental Impact:
                  </dt>
                  <dd>
                    <ul>
                      {proposal.socialImpact.map((cat, i) => (
                        <li key={i}>{"• " + cat}</li>
                      ))}
                    </ul>
                  </dd>

                  <dt className="text-gray-600 font-medium">
                    Brief description of social impact
                  </dt>
                  <dd>{proposal.envImpactDescription}</dd>
                </dl>
              </CardContent>
            </Card>
          </div>

          <div className="h-full col-span-1 bg-gradient-to-b from-[#c5e6dc] to-[#5a8495] px-4  rounded-b-xl mb-4 mt-[-16px]">
            <CardTitle className="my-4 text-lg font-semibold">
              Comments
            </CardTitle>
            {/* <div className="max-h-[1000px] overflow-y-auto"> */}
            <div className="">
              {proposal.comments ? (
                <CommentList comments={proposal.comments} />
              ) : (
                <span className="text-gray-500 text-sm">
                  There are no comments to display.
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 space-x-6 max-w-7xl">
          <Card>
            <CardHeader>
              <CardTitle>Governance & Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-5 gap-x-4 gap-y-3 text-sm">
                {Object.keys(proposal.compliance).map((key) => {
                  return (
                    <Fragment key={key}>
                      <dt className="text-gray-600 font-medium col-span-4">
                        {key}
                      </dt>
                      <dd>
                        {proposal.compliance[key] == "Done" ? (
                          <Check />
                        ) : proposal.compliance[key] == "Not Done" ? (
                          <X />
                        ) : (
                          "N/A"
                        )}
                      </dd>
                    </Fragment>
                  );
                })}
              </dl>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Financial Readiness & Funding Options</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-5 gap-x-4 gap-y-3 text-sm">
                {Object.keys(proposal.fundingOptions).map((key) => {
                  return (
                    <Fragment key={key}>
                      <dt className="text-gray-600 font-medium col-span-4">
                        {key}
                      </dt>
                      <dd>
                        {proposal.fundingOptions[key] == "Yes" ? (
                          <Check />
                        ) : (
                          <X />
                        )}
                      </dd>
                    </Fragment>
                  );
                })}
                <dt className="text-gray-600 font-medium col-span-4">
                  Total Project Cost:
                </dt>
                <dd>{proposal.totalCost}</dd>
              </dl>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Project Finances</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <dt className="text-gray-600 font-medium">
                Funding Instruments Sought
              </dt>
              <dd>
                <ul>
                  {proposal.fundingSought.map((funding, i) => (
                    <li key={i}>{"• " + funding}</li>
                  ))}
                </ul>
              </dd>

              <dt className="text-gray-600 font-medium">
                Is the project scalable, replicable and sustainable?
              </dt>
              <dd>{proposal.scalable}</dd>
            </dl>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 space-x-6 max-w-7xl">
          <div className="space-y-6">
            <Card>
              <CardContent>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                  <dt className="text-gray-600 font-medium">
                    Measurable Impact Indicators Identified
                  </dt>
                  <dd>
                    <ul>{proposal.measureableImpact ? <Check /> : <X />}</ul>
                  </dd>

                  <dt className="text-gray-600 font-medium">
                    Commitment to Annual Reporting
                  </dt>
                  <dd>
                    <ul>{proposal.annualReporting ? <Check /> : <X />}</ul>
                  </dd>
                  <dt className="text-gray-600 font-medium">
                    Key Indicators to Track (Environmental, Social, Financial)
                  </dt>
                  <dd>
                    <ul>{proposal.keyIndicators ? <Check /> : <X />}</ul>
                  </dd>
                  <dt className="text-gray-600 font-medium">
                    Willingness to provide monitoring and annual impact reports
                  </dt>
                  <dd>
                    <ul>{proposal.monitoring ? <Check /> : <X />}</ul>
                  </dd>
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(proposal.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <strong>Updated At:</strong>{" "}
                  {new Date(proposal.updatedAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Supporting Documents Uploaded</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {files.map((file, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between rounded-md border p-2"
                    >
                      <div className="flex items-center space-x-2">
                        <FileIcon className="h-4 w-4 text-gray-500" />
                        <span>{camelToTitle(file.type)}</span>
                      </div>
                      <a
                        href={BACKEND_BASE_URL + file.fileData?.presignedURL}
                        target="_blank"
                      >
                        <DownloadIcon className="h-4 w-4 text-gray-600 hover:text-gray-900" />
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
        {isAdmin() && (
          <Card className="border-[#ddeab1] bg-gradient-to-br from-[#e4e9dd] to-[#c5e6dc]">
            <CardHeader>
              <CardTitle>Proposal Review</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Comments:</p>
              <Textarea
                className="bg-white"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button
                className="bg-gradient-to-br from-[#9dc8b2] to-[#3d7e7d] cursor-pointer"
                onClick={approveProposal}
              >
                APPROVE
              </Button>
              <Button
                className="bg-gradient-to-br from-[#b8c89d] to-[#797e3d] cursor-pointer"
                onClick={addComment}
              >
                NEEDS CHANGES
              </Button>
              <Button
                onClick={rejectProposal}
                variant="destructive"
                className="bg-gradient-to-br from-[#c8a09d] to-[#7e3d3d] cursor-pointer"
              >
                REJECT
              </Button>
              {error && <p className="text-sm text-red-600">{error}</p>}
            </CardFooter>
          </Card>
        )}
      </div>
    </>
  );
}

export function camelToTitle(str: string): string {
  return str
    .replace(/([A-Z])/g, " $1") // insert space before capitals
    .replace(/^./, (s) => s.toUpperCase()); // capitalize first letter
}
