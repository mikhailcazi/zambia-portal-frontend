"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CategoryValues,
  ClimateImpactValues,
  ComplianceOptions,
  ComplianceQuestions,
  FormDefaultValues,
  FormSchema,
  FinancialOptions,
  ProjectStages,
  SocialImpactValues,
  FundingQuestions,
  FundingOptions,
} from "@/lib/schema/formSchema";
import TextField from "@/components/ui/form/form-text-field";
import TextAreaField from "@/components/ui/form/form-textarea-field";
import FormArrayField from "@/components/ui/form/form-array-field";
import { FormCheckboxGroupArrayField } from "@/components/ui/form/form-checkbox-array-field";
import { FormFileUploadField } from "@/components/ui/form/form-file-field";
import { api } from "@/services/api.service";
import { Label } from "@radix-ui/react-label";
import MultiRadioField from "@/components/ui/form/multi-radio-field";
import FormCheckboxField from "@/components/ui/form/form-checkbox-field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProjectForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: FormDefaultValues,
  });

  const createFormData = (values: z.infer<typeof FormSchema>) => {
    const attachments = values.attachments;
    values.attachments = [];

    const formData = new FormData();

    formData.append("data", JSON.stringify(values));
    attachments.forEach((file) => formData.append("files", file));

    return formData;
  };

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      console.log(values);

      const formData = createFormData(values);

      await api.createProposal(formData);
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <>
      <h1 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight mb-6">
        Project Eligibility Form
      </h1>
      {/* <h2 className="text-xl font-medium text-neutral-800 dark:text-neutral-200 mb-4">
        Project Eligibility Form
      </h2> */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-3xl mx-auto py-10"
        >
          <h2 className="text-xl font-medium text-neutral-800 dark:text-neutral-200 mb-4">
            Section A: Basic Information
          </h2>
          <TextField
            form={form}
            name="projectTitle"
            label="Project Title"
            placeholder="Your project name"
          />

          <TextField
            form={form}
            name="organization"
            label="Organization / Proponent"
            placeholder="John Doe"
          />

          <TextField
            form={form}
            name="contactPerson"
            label="Contact Person & Details"
            placeholder="John Doe"
          />

          <TextField
            form={form}
            name="location"
            label="Project Location"
            placeholder="Your project location"
          />

          <TextField
            form={form}
            name="sector"
            label="Sector / Subsector"
            placeholder="Your project sector"
          />

          <FormField
            control={form.control}
            name="stage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a category..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ProjectStages.map((stage, index) => (
                      <SelectItem key={index} value={stage}>
                        {stage}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose the current status of your project
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <TextField
            form={form}
            name="estimatedInvestment"
            label="Estimated Required Investment (USD / ZMW)"
            placeholder="Estimated investment"
          />

          <TextField
            form={form}
            name="partners"
            label="Project Partners (if applicable)"
            placeholder="Partners"
          />

          <hr className="my-8 border-t border-neutral-300 dark:border-neutral-700" />

          <h2 className="text-xl font-medium text-neutral-800 dark:text-neutral-200 mb-4">
            Section B: Investor-Friendly Project Overview (Pitch Deck Style)
          </h2>
          <FormFileUploadField
            name="projectOverview"
            label="Project Overview"
            description={`Please upload a PDF deck which covers each of the following points, in 80 words or less\n1. Problem Statement\n2. Green Investment Opportunity\n3. Proposed Solution\n4. Innovation / Differentiation - What makes your project innovative or different? Briefly explain any new technology, approach, or co-benefits that go beyond “business as usual.”\n5. Expected Impact / Outcomes (Environmental, Social, Financial)\n6. Alignment with National Priorities (Zambia’s Green Growth Strategy, NDCs, NBSAP, Green Finance Strategy, or other relevant frameworks)\n7. Contribution to recognized environmental or social goals (e.g., climate action, biodiversity protection, sustainable livelihoods, community resilience etc.)`}
            form={form}
          />

          <hr className="my-8 border-t border-neutral-300 dark:border-neutral-700" />

          <h2 className="text-xl font-medium text-neutral-800 dark:text-neutral-200 mb-4">
            Section C: Eligibility Screening
          </h2>
          <div className="relative overflow-hidden grid gap-4 items-center">
            <FormCheckboxGroupArrayField
              name="categories"
              label="Eligible Categories"
              options={CategoryValues}
              otherOption={true}
            />
          </div>

          <div className="relative overflow-hidden grid gap-4 items-center">
            <FormCheckboxGroupArrayField
              name="envImpact"
              label="Environmental & Climate Impact"
              options={ClimateImpactValues}
            />
          </div>

          <div className="relative overflow-hidden grid gap-4 items-center">
            <FormCheckboxGroupArrayField
              name="socialImpact"
              label="Social & Developmental Impact"
              options={SocialImpactValues}
            />
          </div>

          <div className="relative overflow-hidden grid gap-4 items-center">
            <MultiRadioField
              name="compliance"
              label="Governance & Compliance"
              questions={ComplianceQuestions}
              options={ComplianceOptions}
            />
          </div>

          <div className="relative overflow-hidden grid gap-4 items-center">
            <MultiRadioField
              name="fundingOptions"
              label="Financial Readiness & Funding Options"
              questions={FundingQuestions}
              options={FundingOptions}
            />
          </div>

          <div className="relative overflow-hidden grid gap-4 items-center">
            <FormCheckboxGroupArrayField
              name="fundingSought"
              label="Funding Instruments Sought After"
              options={FinancialOptions}
              otherOption={true}
            />
          </div>

          <TextAreaField
            form={form}
            name="scalable"
            label="Is the project scalable, replicable and sustainable?"
            placeholder="80 words or less..."
          />

          <hr className="my-8 border-t border-neutral-300 dark:border-neutral-700" />

          <h2 className="text-xl font-medium text-neutral-800 dark:text-neutral-200 mb-4">
            Section D: Monitoring, Reporting and Verification (MRV)
          </h2>

          <div className="relative overflow-hidden grid gap-4 items-center">
            <FormCheckboxField
              name="measureableImpact"
              label="Measurable Impact Indicators Identified"
              form={form}
            />

            <FormCheckboxField
              name="annualReporting"
              label="Commitment to Annual Reporting"
              form={form}
            />

            <FormCheckboxField
              name="keyIndicators"
              label="Key Indicators to Track (Environmental, Social, Financial)"
              form={form}
            />
          </div>

          <hr className="my-8 border-t border-neutral-300 dark:border-neutral-700" />

          <h2 className="text-xl font-medium text-neutral-800 dark:text-neutral-200 mb-4">
            Section E: Commitment
          </h2>
          <div className="relative overflow-hidden grid gap-4 items-center">
            <FormCheckboxField
              name="monitoring"
              label="Willingness to provide monitoring and annual impact reports"
              form={form}
            />
          </div>

          <Card className=" border-amber-500 p-3 text-sm ">
            <CardHeader>
              <CardTitle>Eligibility Note</CardTitle>
            </CardHeader>
            <CardContent>
              To qualify, projects must:
              <br />
              1. Deliver clear positive environmental impacts (e.g., reduced
              emissions, restored ecosystems, sustainable resource use). <br />
              2. Align with the Green Finance Taxonomy and national/sectoral
              priorities. <br />
              3. Present measurable outcomes (e.g., CO₂ avoided, hectares
              restored). <br />
              4. Comply with environmental and social safeguards. Cut-off:
              Projects that do not meet these minimum criteria are ineligible
              for financing.
            </CardContent>
          </Card>

          <hr className="my-8 border-t border-neutral-300 dark:border-neutral-700" />

          <h2 className="text-xl font-medium text-neutral-800 dark:text-neutral-200 mb-4">
            Section F: Supporting Documents
          </h2>

          <FormFileUploadField
            name="attachments"
            label="Applicants are requested to attach the following mandatory supporting documents (where applicable):"
            description={`1. Company registration documents (PACRA, Tax Registration) 
              2. Business plan / Feasibility Study (project history, financials, staffing) 
              3. Historical & Projected Financial Statements 
              4. Existing partnership / Co-financing agreements / MoUs 
              5. Technical Studies, Designs, or Permits
              6. Other (Specify`}
            form={form}
          />

          <hr className="my-8 border-t border-neutral-300 dark:border-neutral-700" />

          <h2 className="text-xl font-medium text-neutral-800 dark:text-neutral-200 mb-4">
            Section G: Declaration
          </h2>

          <TextField
            form={form}
            name="signedName"
            label="Name"
            placeholder="Signed..."
          />

          <TextField
            form={form}
            name="position"
            label="Position"
            placeholder="Your position"
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
