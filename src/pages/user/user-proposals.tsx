import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { api } from "@/services/api.service";
import ProjectCard from "@/components/project-card";
import { Project } from "@/components/project-table";
import Loading from "@/components/ui/loading";

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
                  isProposal={true}
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
                  isProposal={true}
                />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
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
