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
import { FormSchema } from "@/lib/schema/formSchema";
import TextField from "@/components/ui/form/form-text-field";
import TextAreaField from "@/components/ui/form/form-textarea-field";
import FormArrayField from "@/components/ui/form/form-array-field";
import FormCheckboxField from "@/components/ui/form/form-checkbox-field";

export default function ProjectForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      projectName: "",
      contactPerson: "",
      location: "",
      status: "",
      contactDetails: {
        site: {
          name: "",
          capacity: "",
          email: "",
          phone: "",
        },
        advisors: {
          name: "",
          email: "",
          phone: "",
        },
      },
      description: "",
      website: "",
      partners: "",
      problems: "",
      solution: "",
      priorities: "",
      outcomes: "",
      challenges: "",
      funding: [],
      biodiversityHotspot: false,
      protectedAreaExpansion: false,
      generatingRevenue: false,
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <>
      <h1 className="text-xl">Please enter the details of your project...</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-3xl mx-auto py-10"
        >
          <TextField
            form={form}
            name="projectName"
            label="Project Name"
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
                name="contactDetails.site.name"
                label="Name"
                placeholder="John Doe"
              />
              <TextField
                form={form}
                name="contactDetails.site.capacity"
                label="Capacity"
                placeholder="Project capacity"
              />
              <TextField
                form={form}
                name="contactDetails.site.phone"
                label="Tel No"
                placeholder="9876543210"
              />
              <TextField
                type="email"
                form={form}
                name="contactDetails.site.email"
                label="Email"
                placeholder="johndoe@email.com"
              />
            </div>
            <div className="grid col-span-6 gap-4">
              <FormLabel>Financial Advisors</FormLabel>
              <TextField
                form={form}
                name="contactDetails.advisors.name"
                label="Name"
                placeholder="John Doe"
              />
              <TextField
                form={form}
                name="contactDetails.advisors.phone"
                label="Tel No"
                placeholder="9876543210"
              />
              <TextField
                type="email"
                form={form}
                name="contactDetails.advisors.email"
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
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
