import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building2,
  ClipboardCheck,
  Dot,
  FileText,
  Globe,
  Leaf,
  LineChart,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";

export default function ProposalLandingPage() {
  const cardColors = [
    "#d5edd9",
    "#c8e6cb",
    "#b9debe",
    "#a7d0ac",
    "#95c19b",
    "#6f946f",
  ];

  const eligibilityPoints = [
    "Deliver measurable environmental benefits.",
    "Align with Zambia's Green Finance Taxonomy.",
    "Support national green growth priorities.",
    "Include measurable environmental or social outcomes.",
    "Comply with environmental and social safeguards.",
  ];

  const basicDocs = [
    "Project title",
    "Organization details",
    "Contact information",
    "Implementation timeline",
    "Sector & project stage",
    "Estimated investment required",
    "Project partners",
    "Gender inclusion information",
  ];

  const projectOverview = [
    "Problem statement",
    "Green investment opportunity",
    "Proposed solution",
    "Innovation & differentiation",
    "Expected impacts",
    "Alignment with national priorities",
    "Contribution to sustainability goals",
  ];

  const supportingDocs = [
    { title: "Company Registration", required: "Required" },
    { title: "Business Plan / Feasibility Study", required: "Required" },
    { title: "Financial Statements", required: "Recommended" },
    { title: "Partnership Agreements", required: "If Available" },
    { title: "Technical Studies / Designs", required: "If Applicable" },
    { title: "Other Supporting Documentsn", required: "Optional" },
  ];

  const submissionSteps = [
    "Create Account",
    "Complete Application",
    "Upload Documents",
    "Submit Proposal",
    "Administrative Review",
    "Project Published",
  ];
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      {/* Hero */}
      <section className="grid lg:grid-cols-2 gap-12 items-center py-6">
        <div className="relative">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#d5edd9] to-[#6f946f] blur-3xl opacity-20" />

          <img
            src="/images/chris-boland-afGA-TbGNbA-unsplash.jpg"
            alt="Green investment"
            className="relative rounded-3xl shadow-xl object-cover w-full h-[450px]"
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-5xl font-bold tracking-tight leading-tight">
            Prepare Your
            <span className="text-green-700"> Project Proposal</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl">
            Before creating an account, review the information and supporting
            documents you'll need for your application. Preparing everything in
            advance helps ensure a smooth and efficient submission process.
          </p>
        </div>
      </section>

      {/* Eligibility */}
      <Card className="border-green-600">
        <CardContent className="p-8">
          <div className="grid gap-8 md:grid-cols-[1fr_auto_1fr] items-center">
            {/* Left */}
            <div className="text-right">
              <h2 className="text-4xl font-bold mb-4">
                Is Your Project Eligible?
              </h2>

              <p className="text-muted-foreground text-sm">
                Projects submitted to the Green Investment Portal should satisfy
                the following minimum requirements before being considered for
                review.
              </p>
            </div>
            <div className="hidden lg:block h-full w-px bg-border" />
            {/* Right */}
            <ul className="space-y-4">
              {eligibilityPoints.map((text) => (
                <li className="flex gap-3">
                  <BadgeCheck className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Information Cards */}
      <section>
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Information You'll Need
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-t-4 border-t-lime-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-6 w-6 text-green-700" />
                Basic Project Information
              </CardTitle>
            </CardHeader>

            <CardContent>
              <ul className="space-y-2 text-sm">
                {basicDocs.map((element) => (
                  <>
                    <li className="flex gap-2 items-start">
                      <Dot className="h-4 w-4 mt-0.5 shrink-0" />
                      <span>{element}</span>
                    </li>
                  </>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-lime-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Investor Project Overview
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-sm mb-4 italic">A short PDF covering:</p>
              <ul className="space-y-2 text-sm">
                {projectOverview.map((element) => (
                  <>
                    <li className="flex gap-2 items-start">
                      <Dot className="h-4 w-4 mt-0.5 shrink-0" />
                      <span>{element}</span>
                    </li>
                  </>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-lime-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5" />
                Environmental & Social Impact
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="border-t-4 border-t-lime-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5" />
                Financial Information
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="border-t-4 border-t-lime-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                Governance & Compliance
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="border-t-4 border-t-lime-600">
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
          <div className="grid md:grid-cols-2 gap-4 ">
            {supportingDocs.map((element) => (
              <DocumentItem title={element.title} required={element.required} />
            ))}
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
          {submissionSteps.map((step, index) => (
            <Card key={step} style={{ backgroundColor: cardColors[index] }}>
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

      {/* CTA */}
      <section
        className="relative overflow-hidden rounded-3xl py-24 px-8 text-white"
        style={{
          backgroundImage: `
      linear-gradient(rgba(28, 55, 35, 0.75), rgba(28, 55, 35, 0.75)),
      url("/images/eston-oboch-N1DUHxo7x58-unsplash.jpg")
    `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <Globe className="mx-auto h-12 w-12 mb-6" />

          <h2 className="text-5xl font-bold mb-4">
            Ready to Submit Your Project?
          </h2>

          <p className="text-lg text-white/90 mb-8">
            Create an account to access the Green Investment Portal and begin
            your application.
          </p>

          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              className="border-white text-white bg-black hover:bg-white hover:text-black"
            >
              <Link to="/user/register">Create Account</Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white text-white bg-black hover:bg-white hover:text-black"
            >
              <Link to="/user/login">Login</Link>
            </Button>
          </div>
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
    <div
      className="flex items-center justify-between rounded-lg border border-transparent p-4
    bg-gradient-to-br from-[#c5e6dc] to-[#adc5c5]
    transition-all duration-300
    hover:border-green-600/30
    hover:shadow-md
    hover:-translate-y-1"
    >
      <span>{title}</span>
      <Badge variant="secondary">{required}</Badge>
    </div>
  );
}
