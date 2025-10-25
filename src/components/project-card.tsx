import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, MapPin, Building, CircleDollarSign } from "lucide-react";
import { Project } from "./project-table";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export default function ProjectCard({
  data,
  showButton = true,
}: {
  data: Project;
  showButton?: boolean;
}) {
  const nav = useNavigate();
  const [duration, setDuration] = useState("");

  const navigateToProject = () => {
    nav("/projects/" + data.id);
  };
  // console.log(data);

  useEffect(() => {
    console.log(data);
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    const totalMonths =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());

    if (totalMonths >= 12) {
      const years = totalMonths / 12;
      setDuration(`${years.toFixed(1)} year${years >= 2 ? "s" : ""}`);
    } else {
      setDuration(`${totalMonths} month${totalMonths > 1 ? "s" : ""}`);
    }
  });

  return (
    <Card
      className={
        "rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition gap-0 bg-gradient-to-br from-[#c5e6dc] to-[#adc5c5]"
      }
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className={"text-lg font-semibold text-gray-900"}>
            {data.projectTitle}
          </CardTitle>
          <p className={"text-sm text-gray-500"}>{data.sector}</p>
        </div>
        <div className="text-right">
          <p
            className={"text-xl font-semibold text-black"}
          >{`${data.currency} ${data.estimatedInvestment}`}</p>
          <p
            className={"text-xs text-grey-900"}
          >{`Total Cost: ${data.currency} ${data.totalCost}`}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className={"text-sm leading-relaxed min-h-10 text-gray-600"}>
          {data.envImpactDescription}
        </p>

        <div className={"grid grid-cols-2 text-sm gap-y-1 text-gray-600"}>
          <div className="flex items-center gap-1">
            <MapPin className={"h-4 w-4 text-gray-500"} />
            <span>{data.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className={"h-4 w-4 text-gray-500"} />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Building className={"h-4 w-4 text-gray-500"} />
            <span>{data.organization}</span>
          </div>
          <div className="flex items-center gap-1">
            <CircleDollarSign className={"h-4 w-4 text-gray-500"} />
            <span>{data.fundingSought[0]}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2 min-h-[60px]">
          {data.categories.slice(0, 3).map((c, i) => (
            <Badge
              key={i}
              variant="outline"
              className="max-h-[21.33px] bg-white"
            >
              {c}
            </Badge>
          ))}
          <Badge className="bg-[#c5e6dc] text-green-700 hover:bg-[#a5d8c7] max-h-[21.33px]">
            {data.stage}
          </Badge>
        </div>

        {showButton && (
          <Button
            className="w-full mt-3 bg-[#4e6e54] hover:bg-[#849b3f] text-white cursor-pointer"
            onClick={navigateToProject}
          >
            View Details
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
