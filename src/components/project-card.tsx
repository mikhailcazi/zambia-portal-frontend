import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, MapPin, Building } from "lucide-react";
import { Project } from "./project-table";

export default function ProjectCard({ data }: { data: Project }) {
  console.log(data);
  return (
    <Card className="rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition gap-0 max-h-[344px]">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-semibold text-gray-900">
            {data.projectTitle}
          </CardTitle>
          <p className="text-sm text-gray-500">{data.sector}</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-semibold text-gray-900">{`${data.currency} ${data.estimatedInvestment}`}</p>
          <p className="text-xs text-gray-500">{`Total Cost: ${data.currency} ${data.totalCost}`}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 leading-relaxed min-h-10">
          {data.envImpactDescription}
        </p>

        <div className="grid grid-cols-2 text-sm text-gray-600 gap-y-1">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span>{data.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4 text-gray-500" />
            <span>{"6 years"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Building className="h-4 w-4 text-gray-500" />
            <span>{data.organization}</span>
          </div>
          <div>
            <span>{"Scalable? " + data.scalable}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {data.categories.slice(0, 3).map((c) => (
            <Badge variant="outline">{c}</Badge>
          ))}
          <Badge className="bg-[#c5e6dc] text-green-700 hover:bg-[#a5d8c7]">
            {data.stage}
          </Badge>
        </div>

        <Button className="w-full mt-3 bg-[#4e6e54] hover:bg-[#849b3f] text-white">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
