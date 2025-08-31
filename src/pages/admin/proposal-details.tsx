import { Project } from "@/components/ProjectTable";
import { useEffect, useState } from "react";
import { api } from "../../services/api.service";
import { useParams, useNavigate } from "react-router";
import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { FundingOptionsMapping } from "@/lib/schema/formSchema";
import { Textarea } from "@/components/ui/textarea";

export function ProposalDetails() {
  const { id } = useParams<{ id: string }>();
  const [proposal, setProposal] = useState<Project | null>(null);
  const navigate = useNavigate();

  const isAdmin = () => {
    return true;
  };

  useEffect(() => {
    if (!id) return;

    api
      .getProposal(id)
      .then((res) => setProposal(res.data))
      .catch(console.error);
  }, [id]);

  if (!proposal) {
    return (
      <div className="p-4">
        <p>Loading proposal...</p>
      </div>
    );
  }

  return (
    <>
      <div className="p-6 space-y-4 max-w-6xl mx-auto">
        <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
          <ChevronLeftIcon /> Back
        </Button>
        <h1 className="text-2xl font-bold">{proposal.projectName}</h1>
        <div className="mx-auto p-6 space-y-6 max-w-6xl">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Contact Person:</strong> {proposal.contactPerson}
              </p>

              <p>
                <strong>Location:</strong> {proposal.location}
              </p>

              <p>
                <strong>Status:</strong> {proposal.status}
              </p>
              <p>
                <strong>Website:</strong> {proposal.website}
              </p>
            </CardContent>
          </Card>

          {/* Site & Advisor Info side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Site Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>Site Name:</strong> {proposal.siteName}
                </p>
                <p>
                  <strong>Site Capacity:</strong> {proposal.siteCapacity}
                </p>
                <p>
                  <strong>Site Phone:</strong> {proposal.sitePhone}
                </p>
                <p>
                  <strong>Site Email:</strong> {proposal.siteEmail}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Advisor Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>Advisor Name:</strong> {proposal.advisorName}
                </p>
                <p>
                  <strong>Advisor Phone:</strong> {proposal.advisorPhone}
                </p>
                <p>
                  <strong>Advisor Email:</strong> {proposal.advisorEmail}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Project Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{proposal.description}</p>
            </CardContent>

            <CardContent>
              <strong>Project Partners</strong>
              <p>{proposal.partners}</p>
              <hr className="m-5"></hr>

              <strong>What problem(s) is the project addressing?</strong>
              <p>{proposal.problems}</p>
              <hr className="m-5"></hr>

              <strong>
                What is the proposed solution (or nature of business)?
              </strong>
              <p>{proposal.solution}</p>
              <hr className="m-5"></hr>

              <strong>
                What are the biodiversity and conservation priorities of the
                project?
              </strong>
              <p>{proposal.priorities}</p>
              <hr className="m-5"></hr>

              <strong>
                What are the expected outcomes / impact? (e.g. economic
                development, job development)
              </strong>
              <p>{proposal.outcomes}</p>
              <hr className="m-5"></hr>

              <strong>
                What barriers or challenges does the project face?
              </strong>
              <p>{proposal.challenges}</p>
            </CardContent>
          </Card>

          {/* Environmental Relevance */}
          <Card>
            <CardHeader>
              <CardTitle>Environmental Relevance</CardTitle>
            </CardHeader>
            <CardContent className="">
              <p>
                Is the project located in a biodiversity hotspot or biodiversity
                rich area?{" "}
                <strong>{proposal.biodiversityHotspot ? "Yes" : "No"}</strong>
              </p>
              <p>
                Does the project promote expansion of protected areas?{" "}
                <strong>
                  {proposal.protectedAreaExpansion ? "Yes" : "No"}
                </strong>
              </p>
            </CardContent>
          </Card>

          {/* Financials */}
          <Card>
            <CardHeader>
              <CardTitle>Financials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Is the project generating revenue?{" "}
                <strong>{proposal.generatingRevenue ? "Yes" : "No"}</strong>
              </p>
              <div>
                <p className="font-semibold">
                  What is the nature of capital investment or support required?
                </p>
                <ul className="list-disc list-inside">
                  {proposal.funding.map((f, idx) => (
                    <li key={idx}>
                      {f.amount} — {f.activity}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-semibold">Funding Options:</p>
                <ul className="list-disc list-inside">
                  {proposal.fundingOptions
                    .map((option) => FundingOptionsMapping[option])
                    .map((option, idx) => (
                      <li key={idx}>{option}</li>
                    ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Further Concerns</CardTitle>
            </CardHeader>
            <CardContent>
              <strong>
                Does the project support communities (young people and women)?
              </strong>
              <p>{proposal.communities}</p>
              <hr className="m-5"></hr>

              <strong>Does the project promote SMMEs?</strong>
              <p>{proposal.smmes}</p>
              <hr className="m-5"></hr>

              <strong>Organization and Governance</strong>
              <p>{proposal.org}</p>
              <hr className="m-5"></hr>

              <strong>Can the project be scaled and can it be copied?</strong>
              <p>{proposal.scalable}</p>
              <hr className="m-5"></hr>

              <strong>Environmental impact</strong>
              <p>{proposal.envImpact}</p>
              <hr className="m-5"></hr>

              <strong>Social impact</strong>
              <p>{proposal.socialImpact}</p>
              <hr className="m-5"></hr>

              <strong>Sustainability</strong>
              <p>{proposal.sustainability}</p>
              <hr className="m-5"></hr>

              <strong>Profitability</strong>
              <p>{proposal.profitability}</p>
            </CardContent>
          </Card>

          {/* Metadata */}
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

          {isAdmin() && (
            <Card className="bg-[#ddeab1]">
              <CardHeader>
                <CardTitle>Proposal Review</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Comments:</p>
                <Textarea className="bg-white" />
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button>Accept</Button>
                <Button>Needs Changes</Button>
                <Button variant="destructive" className="bg-orange-900">
                  Reject
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
