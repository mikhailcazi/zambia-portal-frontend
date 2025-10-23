import { Card } from "@/components/ui/card";
import { useSearchParams } from "react-router";

export function Submission() {
  const [searchParams] = useSearchParams();
  return (
    <>
      <div className="m-5 bg-white w-3xl p-5 rounded-xl mx-auto">
        <h1 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Success
        </h1>
        <Card className="border-green-500 text-sm p-4 my-4">
          <p>Your proposal has been submitted!</p>

          <p>
            Please note the following tracking ID for the proposal:{" "}
            {searchParams.get("proposalID")}
          </p>
        </Card>
      </div>
    </>
  );
}
