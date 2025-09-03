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
  FormDefaultValues,
  FormSchema,
  FundingOptionsMapping,
} from "@/lib/schema/formSchema";
import TextField from "@/components/ui/form/form-text-field";
import TextAreaField from "@/components/ui/form/form-textarea-field";
import FormArrayField from "@/components/ui/form/form-array-field";
import FormCheckboxField from "@/components/ui/form/form-checkbox-field";
import { FormCheckboxGroupArrayField } from "@/components/ui/form/form-checkbox-array-field";
import { FormFileUploadField } from "@/components/ui/form/form-file-field";
import { api } from "@/services/api.service";

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

  const getFundingOptions = () => {
    return Object.keys(FundingOptionsMapping).map((key) => ({
      label: FundingOptionsMapping[key],
      value: key,
    }));
  };

  return (
    <>
      <h1 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight mb-6">
        Zambia Green Investment Portal
      </h1>
      <h2 className="text-xl font-medium text-neutral-800 dark:text-neutral-200 mb-4">
        Project Eligibility Form
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-3xl mx-auto py-10"
        >
          <TextField
            form={form}
            name="projectTitle"
            label="Project Title"
            placeholder="Your project name"
          />

          <TextField
            form={form}
            name="contactPerson"
            label="Main Contact Person"
            placeholder="John Doe"
          />

          <TextField
            form={form}
            name="location"
            label="Project Location"
            placeholder="Your project location"
          />

          <FormField
            control={form.control}
            name="status"
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
                    <SelectItem value="Concept">
                      Concept (Pre-seed Funding - proof of concept)
                    </SelectItem>
                    <SelectItem value="Greenfield">
                      Greenfield (Seed Funding - product launch & marketing){" "}
                    </SelectItem>
                    <SelectItem value="Brownfield">
                      Brownfield (Early Stage Funding - increase market share
                      and scale)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose the current status of your project
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormLabel>Main Contact Details</FormLabel>
          <div className="grid grid-cols-12 gap-4 mt-4">
            <div className="grid col-span-6 gap-4">
              <FormLabel>Site</FormLabel>
              <TextField
                form={form}
                name="siteName"
                label="Name"
                placeholder="John Doe"
              />
              <TextField
                form={form}
                name="siteCapacity"
                label="Capacity"
                placeholder="Project capacity"
              />
              <TextField
                form={form}
                name="sitePhone"
                label="Tel No"
                placeholder="9876543210"
              />
              <TextField
                type="email"
                form={form}
                name="siteEmail"
                label="Email"
                placeholder="johndoe@email.com"
              />
            </div>
            <div className="grid col-span-6 gap-4">
              <FormLabel>Financial Advisors</FormLabel>
              <TextField
                form={form}
                name="advisorName"
                label="Name"
                placeholder="John Doe"
              />
              <TextField
                form={form}
                name="advisorPhone"
                label="Tel No"
                placeholder="9876543210"
              />
              <TextField
                type="email"
                form={form}
                name="advisorEmail"
                label="Email"
                placeholder="johndoe@email.com"
              />
              <div className="h-[58px]"></div>
            </div>
          </div>

          <TextField
            form={form}
            name="website"
            label="Website"
            placeholder="project.com"
          />

          <TextAreaField
            form={form}
            name="partners"
            label="Project Partners (if applicable)"
            placeholder="Start typing here..."
          />

          <TextAreaField
            form={form}
            name="description"
            label='Description of the Biodiversity Investment Opportunity ("The
                  Project")'
            placeholder="Start typing here..."
          />

          <TextAreaField
            form={form}
            name="problems"
            label="What problem(s) is the project addressing?"
            placeholder="Start typing here..."
          />

          <TextAreaField
            form={form}
            name="solution"
            label="What is the proposed solution (or nature of business)?"
            placeholder="Start typing here..."
          />

          <TextAreaField
            form={form}
            name="priorities"
            label="What are the biodiversity and conservation priorities of the project?"
            placeholder="Start typing here..."
          />

          <TextAreaField
            form={form}
            name="outcomes"
            label="What are the expected outcomes / impact? (e.g. economic development, job development)"
            placeholder="Start typing here..."
          />

          <TextAreaField
            form={form}
            name="challenges"
            label="What barriers or challenges does the project face?"
            placeholder="Start typing here..."
          />

          <FormArrayField
            name="funding"
            label="What is the nature of capital investment or support required?"
            form={form}
          />

          <div className="relative overflow-hidden grid gap-4 items-center">
            <FormCheckboxField
              name="biodiversityHotspot"
              label="Is the project located in a biodiversity hotspot or biodiversity rich area?"
              form={form}
            />

            <FormCheckboxField
              name="protectedAreaExpansion"
              label="Does the project promote expansion of protected areas?"
              form={form}
            />

            <FormCheckboxField
              name="generatingRevenue"
              label="Is the project generating revenue? (Please provide full financial projections in the business plan)"
              form={form}
            />
          </div>

          <TextAreaField
            form={form}
            name="communities"
            label="Does the project support communities (young people and women)?"
            placeholder="Start typing here..."
            description="If yes, please elaborate and give examples to support"
          />

          <TextAreaField
            form={form}
            name="smmes"
            label="Does the project promote SMMEs?"
            placeholder="Start typing here..."
            description="If yes, please elaborate and give examples to support"
          />

          <div className="relative overflow-hidden grid gap-4 items-center">
            <FormCheckboxGroupArrayField
              name="fundingOptions"
              label="Project Funding Options"
              options={getFundingOptions()}
            />
          </div>

          <hr className="my-8 border-t border-neutral-300 dark:border-neutral-700" />

          <h2 className="text-xl font-medium text-neutral-800 dark:text-neutral-200 mb-4">
            Investment Case
          </h2>

          <TextAreaField
            form={form}
            name="org"
            label="Organization and Governance"
            placeholder="Start typing here..."
            description="Please outline your governance structure"
          />

          <TextAreaField
            form={form}
            name="scalable"
            label="Can the project be scaled and can it be copied?"
            placeholder="Start typing here..."
          />

          <TextAreaField
            form={form}
            name="envImpact"
            label="Environmental impact:"
            placeholder="Start typing here..."
            description="How will it improve the existing environmental conditions?"
          />

          <TextAreaField
            form={form}
            name="socialImpact"
            label="Social impact:"
            placeholder="Start typing here..."
            description="How will it improve the livelihoods of local communities and marginalized people?"
          />

          <TextAreaField
            form={form}
            name="sustainability"
            label="Sustainability:"
            placeholder="Start typing here..."
            description="Can the project continue to thrive post-investment?"
          />

          <TextAreaField
            form={form}
            name="profitability"
            label="Profitability (for enterprises):"
            placeholder="Start typing here..."
            description="Is the business model viable?"
          />

          <FormFileUploadField
            name="attachments"
            label="Make sure the following supporting documents are attached:"
            description={`1. Business Plan (including current financials, employees, business history) and projected cashflows\n2. Company Registration documents`}
            form={form}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
