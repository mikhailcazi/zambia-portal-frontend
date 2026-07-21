import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export function UserWelcome() {
  return (
    <>
      <div
        className="h-[65vh] w-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/zambia-fields.jpeg')",
        }}
      >
        <div className="flex h-full items-center justify-center bg-black/40 text-white">
          <div className="grid w-full max-w-7xl grid-cols-2 gap-16 px-8">
            {/* Left column */}
            <div className="flex justify-end">
              <div className="max-w-md text-right">
                <h1 className="text-4xl font-bold tracking-tight">
                  Welcome back!
                </h1>
              </div>
            </div>

            {/* Right column */}
            <div className="flex justify-start">
              <div className="max-w-md">
                <p className="text-white/90">
                  Submit and manage green investment proposals that contribute
                  to Zambia's Nationally Determined Contributions (NDCs). Access
                  your profile, monitor proposal progress, and submit new
                  applications from one place.
                </p>

                <Button asChild className="mt-8">
                  <Link to="/form">
                    Submit a Proposal
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
