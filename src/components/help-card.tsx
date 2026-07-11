import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export function HelpCard() {
  return (
    <Card>
      <CardContent className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-semibold">Need Assistance?</h3>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            If you require assistance completing your proposal or have questions
            about the application process, please refer to the submission
            guidelines or contact the portal administrator.
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link to="/guidelines">Guidelines</Link>
          </Button>

          <Button asChild>
            <Link to="/contact">Contact Support</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
