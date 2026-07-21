import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  FileText,
  MapPin,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { api } from "@/services/api.service";
import ProjectCard from "@/components/project-card";
import { Project } from "@/components/project-table";
import Loading from "@/components/ui/loading";

type ProposalStatus = "PENDING" | "APPROVED" | "REJECTED";

export default function UserProposals() {
  const [proposals, setProposals] = useState<Project[]>([]);

  const [projects, setProjects] = useState<Project[]>([]);

  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    api.getProposalsByUser().then((res) => {
      setloading(false);
      setProposals(res.data);
    });

    api.getProjectsByUser().then((res) => {
      setloading(false);
      setProjects(res.data);
    });
  }, []);

  const submitted = proposals;

  const approved = projects;

  return (
    <div className="max-w-6xl mx-auto space-y-6 mt-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Proposals</h1>

        <p className="text-muted-foreground mt-2">
          View the status of your submitted investment proposals.
        </p>
      </div>

      <Tabs defaultValue="submitted">
        <TabsList>
          <TabsTrigger value="submitted">
            Submitted ({submitted.length})
          </TabsTrigger>

          <TabsTrigger value="approved">
            Approved ({approved.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="submitted" className="mt-6">
          <div className="col-span-4 md:col-span-3 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 auto-rows-min content-start items-start">
            {loading ? (
              <Loading />
            ) : submitted.length === 0 ? (
              <EmptyState text="No approved proposals yet." />
            ) : (
              submitted.map((project) => (
                <ProjectCard
                  key={project.id}
                  data={project}
                  showButton={true}
                />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="approved" className="mt-6">
          <div className="col-span-4 md:col-span-3 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 auto-rows-min content-start items-start">
            {loading ? (
              <Loading />
            ) : approved.length === 0 ? (
              <EmptyState text="No approved proposals yet." />
            ) : (
              approved.map((project) => (
                <ProjectCard
                  key={project.id}
                  data={project}
                  showButton={true}
                />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ProposalCard({ proposal }: { proposal: Proposal }) {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-start">
        <div>
          <CardTitle>{proposal.title}</CardTitle>

          <CardDescription>
            Submitted {new Date(proposal.submittedAt).toLocaleDateString()}
          </CardDescription>
        </div>

        <Badge
          variant={
            proposal.status === "APPROVED"
              ? "default"
              : proposal.status === "REJECTED"
                ? "destructive"
                : "secondary"
          }
        >
          {proposal.status}
        </Badge>
      </CardHeader>

      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <InfoRow
            icon={<MapPin className="h-4 w-4" />}
            label="Location"
            value={proposal.location}
          />

          <InfoRow
            icon={<DollarSign className="h-4 w-4" />}
            label="Estimated Investment"
            value={`$${proposal.estimatedInvestment.toLocaleString()}`}
          />

          <InfoRow
            icon={<Calendar className="h-4 w-4" />}
            label="Submitted"
            value={new Date(proposal.submittedAt).toLocaleDateString()}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <Button variant="outline" size="sm">
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 text-muted-foreground">{icon}</div>

      <div>
        <p className="text-sm text-muted-foreground">{label}</p>

        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <FileText className="h-10 w-10 text-muted-foreground mb-4" />

        <h3 className="font-semibold">Nothing to display</h3>

        <p className="text-muted-foreground mt-2">{text}</p>
      </CardContent>
    </Card>
  );
}
