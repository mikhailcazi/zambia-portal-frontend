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
import { FormCheckboxGroupArrayField } from "@/components/ui/form/form-checkbox-array-field";
import { FormFileUploadField } from "@/components/ui/form/form-file-field";
import { api } from "@/services/api.service";
import { Label } from "@radix-ui/react-label";
import MultiRadioField from "@/components/ui/form/multi-radio-field";
import FormCheckboxField from "@/components/ui/form/form-checkbox-field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormFileUploadFieldSmall } from "@/components/ui/form/form-file-field-small";
import { DatePicker } from "@/components/ui/date-picker";

export default function ProjectForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: FormDefaultValues,
  });

  const createFormData = (values: z.infer<typeof FormSchema>) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(values));

    if (values.projectOverview) {
      formData.append("projectOverview", values.projectOverview[0]);
    }
    if (values.companyRegistration) {
      formData.append("companyRegistration", values.companyRegistration[0]);
    }
    if (values.businessPlan) {
      formData.append("businessPlan", values.businessPlan[0]);
    }
    if (values.financialStatements) {
      formData.append("financialStatements", values.financialStatements[0]);
    }
    if (values.partnerships) {
      formData.append("partnerships", values.partnerships[0]);
    }
    if (values.techStudies) {
      formData.append("techStudies", values.techStudies[0]);
    }
    if (values.other) {
      formData.append("other", values.other[0]);
    }

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
      <h1 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
        Project Eligibility Form
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-3xl mx-auto py-10"
        >
          <Card className="border-amber-500 text-sm ">
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
              4. Comply with environmental and social safeguards. <br />
              <br /> All form fields are mandatory.
            </CardContent>
          </Card>
          <h2 className="text-xl font-medium text-neutral-800 dark:text-neutral-200 mb-4">
            Section A: Basic Information
          </h2>
          <TextField
            form={form}
            name="projectTitle"
            label="Project Title"
            placeholder="Your project name"
            mandatory={true}
          />
          <TextField
            form={form}
            name="organization"
            label="Organization / Proponent"
            placeholder="John Doe"
            mandatory={true}
          />
          <TextField
            form={form}
            name="contactPerson"
            label="Contact Person & Details"
            placeholder="John Doe"
            mandatory={true}
          />
          <TextField
            form={form}
            name="location"
            label="Project Location"
            placeholder="Your project location"
            mandatory={true}
          />

          {/* Date Picker */}

          <FormLabel>
            Implementation Date<span className="text-red-500"> *</span>
          </FormLabel>

          <div className="grid grid-cols-2">
            <DatePicker
              name="startDate"
              label="Start Date"
              endMonth={new Date(2035, 12)}
            />
            <DatePicker
              name="endDate"
              label="End Date"
              endMonth={new Date(2035, 12)}
            />
          </div>

          <TextField
            form={form}
            name="sector"
            label="Sector / Subsector"
            placeholder="Your project sector"
            mandatory={true}
          />
          <FormField
            control={form.control}
            name="stage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Project Stage<span className="text-red-500"> *</span>
                </FormLabel>
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
          <FormLabel>
            Estimated Required Investment
            <span className="text-red-500"> *</span>
          </FormLabel>
          <div className="flex">
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a currency..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["USD", "ZMW"].map((currency, index) => (
                        <SelectItem key={index} value={currency}>
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <TextField
              form={form}
              name="estimatedInvestment"
              placeholder="Estimated investment"
              mandatory={true}
            />
          </div>
          <TextField
            form={form}
            name="partners"
            label="Project Partners (if applicable)"
            placeholder="Partners"
            mandatory={true}
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
              mandatory={true}
            />
          </div>
          <div className="relative overflow-hidden grid gap-4 items-center">
            <FormCheckboxGroupArrayField
              name="envImpact"
              label="Environmental & Climate Impact"
              options={ClimateImpactValues}
              mandatory={true}
            />
            <div className="flex">
              <Label className="text-sm p-3">
                Targets/Indicators:<span className="text-red-500"> *</span>
              </Label>
              <TextField
                form={form}
                name="envImpactIndicator"
                mandatory={true}
              />
            </div>
            <div className="flex">
              <Label className="text-sm p-3">
                Brief Description of Impact:
                <span className="text-red-500"> *</span>
              </Label>
              <TextField
                form={form}
                name="envImpactDescription"
                mandatory={true}
              />
            </div>
          </div>
          <div className="relative overflow-hidden grid gap-4 items-center">
            <FormCheckboxGroupArrayField
              name="socialImpact"
              label="Social & Developmental Impact"
              options={SocialImpactValues}
              mandatory={true}
            />
            <div className="flex">
              <Label className="text-sm p-3">
                Brief Description of Impact:
                <span className="text-red-500"> *</span>
              </Label>
              <TextField
                form={form}
                name="socialImpactDescription"
                mandatory={true}
              />
            </div>
          </div>
          <div className="relative overflow-hidden grid gap-4 items-center">
            <MultiRadioField
              name="compliance"
              label="Governance & Compliance"
              questions={ComplianceQuestions}
              options={ComplianceOptions}
              mandatory={true}
            />
          </div>
          <div className="relative overflow-hidden grid gap-4 items-center">
            <MultiRadioField
              name="fundingOptions"
              label="Financial Readiness & Funding Options"
              questions={FundingQuestions}
              options={FundingOptions}
              mandatory={true}
            />
            <div className="flex">
              <Label className="text-sm p-3">
                Total Project Cost (USD/ZMW):
                <span className="text-red-500"> *</span>
              </Label>
              <TextField form={form} name="totalCost" mandatory={true} />
            </div>
          </div>
          <div className="relative overflow-hidden grid gap-4 items-center">
            <FormCheckboxGroupArrayField
              name="fundingSought"
              label="Funding Instruments Sought After"
              options={FinancialOptions}
              otherOption={true}
              mandatory={true}
            />
          </div>
          <TextAreaField
            form={form}
            name="scalable"
            label="Is the project scalable, replicable and sustainable?"
            placeholder="80 words or less..."
            mandatory={true}
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
          <hr className="my-8 border-t border-neutral-300 dark:border-neutral-700" />
          <h2 className="text-xl font-medium text-neutral-800 dark:text-neutral-200 mb-4">
            Section F: Supporting Documents
          </h2>
          <FormDescription>
            Applicants are requested to attach the following supporting
            documents (where applicable):
          </FormDescription>
          <FormFileUploadFieldSmall
            name="companyRegistration"
            label="1. Company registration documents (PACRA, Tax Registration)"
            form={form}
          />
          <FormFileUploadFieldSmall
            name="businessPlan"
            label="2. Business plan / Feasibility Study (project history, financials, staffing)"
            form={form}
          />
          <FormFileUploadFieldSmall
            name="financialStatements"
            label="3. Historical & Projected Financial Statements"
            form={form}
          />
          <FormFileUploadFieldSmall
            name="partnerships"
            label="4. Existing partnership / Co-financing agreements / MoUs"
            form={form}
          />
          <FormFileUploadFieldSmall
            name="techStudies"
            label="5. Technical Studies, Designs, or Permits"
            form={form}
          />
          <FormFileUploadFieldSmall
            name="other"
            label="6. Other (Specify)"
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
            mandatory={true}
          />
          <TextField
            form={form}
            name="position"
            label="Position"
            placeholder="Your position"
            mandatory={true}
          />

          {Object.keys(form.formState.errors).length > 0 && (
            <p className="text-red-500 text-sm mt-2">
              Please fix the errors above before submitting.
            </p>
          )}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
