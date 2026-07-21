import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building2,
  ClipboardCheck,
  FileText,
  Globe,
  Leaf,
  LineChart,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";

export default function ProposalLandingPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      {/* Hero */}
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-bold tracking-tight">
          Prepare Your Project Proposal
        </h1>

        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
          Before creating an account, review the information and supporting
          documents you'll need for your application. Preparing everything in
          advance will make the submission process much faster.
        </p>

        {/* <div className="flex justify-center gap-4">
          <Button size="lg">Create Account</Button>

          <Button size="lg" variant="outline">
            Login
          </Button>
        </div> */}
      </section>

      {/* Eligibility */}

      <Card className="border-green-600">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BadgeCheck className="h-5 w-5 text-green-600" />
            Is Your Project Eligible?
          </CardTitle>

          <CardDescription>
            Projects submitted to the Green Investment Portal should satisfy the
            following minimum requirements.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ul className="space-y-3 list-disc pl-6">
            <li>Deliver measurable environmental benefits.</li>
            <li>Align with Zambia's Green Finance Taxonomy.</li>
            <li>Support national green growth priorities.</li>
            <li>Include measurable environmental or social outcomes.</li>
            <li>Comply with environmental and social safeguards.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Information Cards */}

      <section>
        <h2 className="text-3xl font-semibold mb-6">Information You'll Need</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Basic Project Information
              </CardTitle>
            </CardHeader>

            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Project title</li>
                <li>• Organization details</li>
                <li>• Contact information</li>
                <li>• Project location</li>
                <li>• Implementation timeline</li>
                <li>• Sector & project stage</li>
                <li>• Estimated investment required</li>
                <li>• Project partners</li>
                <li>• Gender inclusion information</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Investor Project Overview
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-sm mb-4">
                Prepare a short PDF presentation covering:
              </p>

              <ul className="space-y-2 text-sm">
                <li>• Problem statement</li>
                <li>• Green investment opportunity</li>
                <li>• Proposed solution</li>
                <li>• Innovation & differentiation</li>
                <li>• Expected impacts</li>
                <li>• Alignment with national priorities</li>
                <li>• Contribution to sustainability goals</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5" />
                Environmental & Social Impact
              </CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5" />
                Financial Information
              </CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                Governance & Compliance
              </CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5" />
                Monitoring & Reporting
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Supporting Documents */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Supporting Documents
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <DocumentItem title="Company Registration" required="Required" />

            <DocumentItem
              title="Business Plan / Feasibility Study"
              required="Required"
            />

            <DocumentItem title="Financial Statements" required="Recommended" />

            <DocumentItem
              title="Partnership Agreements"
              required="If Available"
            />

            <DocumentItem
              title="Technical Studies / Designs"
              required="If Applicable"
            />

            <DocumentItem
              title="Other Supporting Documents"
              required="Optional"
            />
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            PDF format is recommended for all uploaded documents.
          </p>
        </CardContent>
      </Card>

      {/* Submission Process */}

      <section>
        <h2 className="text-3xl font-semibold mb-8">Submission Process</h2>

        <div className="grid md:grid-cols-6 gap-4">
          {[
            "Create Account",
            "Complete Application",
            "Upload Documents",
            "Submit Proposal",
            "Administrative Review",
            "Project Published",
          ].map((step, index) => (
            <Card key={step}>
              <CardContent className="p-6 text-center">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4">
                  {index + 1}
                </div>

                <p className="text-sm font-medium">{step}</p>

                {index !== 5 && (
                  <ArrowRight className="mx-auto mt-6 hidden md:block h-5 w-5 text-muted-foreground" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Before You Start */}

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle>Before You Begin</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <ChecklistItem text="Project presentation (PDF)" />
            <ChecklistItem text="Company registration documents" />
            <ChecklistItem text="Business plan" />
            <ChecklistItem text="Estimated project budget" />
            <ChecklistItem text="Implementation timeline" />
            <ChecklistItem text="Environmental impact information" />
            <ChecklistItem text="Contact details" />
            <ChecklistItem text="Supporting documents (where applicable)" />
          </div>
          {/* 
          <Separator className="my-6" />

          <p className="text-muted-foreground">
            Application should take <strong>5-10 minutes</strong> when all
            information has been prepared beforehand.
          </p> */}
        </CardContent>
      </Card>

      {/* CTA */}

      <section className="text-center py-10">
        <Globe className="mx-auto h-12 w-12 mb-4 text-primary" />

        <h2 className="text-4xl font-bold mb-3">
          Ready to Submit Your Project?
        </h2>

        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Create an account to access the Green Investment Portal and begin your
          application.
        </p>

        <div className="flex justify-center gap-4">
          <Button size="lg">
            <Link to={"/user/register"}>Create Account</Link>
          </Button>

          <Button variant="outline" size="lg">
            <Link to={"/user/login"}>Login</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

function DocumentItem({
  title,
  required,
}: {
  title: string;
  required: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <span>{title}</span>
      <Badge variant="secondary">{required}</Badge>
    </div>
  );
}

function ChecklistItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <Users className="h-4 w-4 text-green-600" />
      <span>{text}</span>
    </div>
  );
}
