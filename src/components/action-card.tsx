import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router";

interface Props {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

export function QuickActionCard({ title, description, icon, href }: Props) {
  return (
    <Link to={href}>
      <Card className="group h-full transition-all hover:-translate-y-1 hover:border-primary hover:shadow-md">
        <CardContent className="flex items-start gap-4 p-6">
          <div className="rounded-lg bg-primary/10 p-3 text-primary">
            {icon}
          </div>

          <div className="flex-1">
            <h3 className="font-semibold">{title}</h3>

            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>

          <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </CardContent>
      </Card>
    </Link>
  );
}
