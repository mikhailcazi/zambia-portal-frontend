import * as z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
];

export const FormSchema = z.object({
  projectName: z.string(),
  contactPerson: z.string(),
  location: z.string(),
  status: z.string(),

  siteName: z.string(),
  siteCapacity: z.string(),
  sitePhone: z.string(),
  siteEmail: z.string().email(),

  advisorName: z.string(),
  advisorPhone: z.string(),
  advisorEmail: z.string().email(),

  website: z.string(),
  partners: z.string(),
  description: z.string(),

  problems: z.string(),
  solution: z.string(),
  priorities: z.string(),
  outcomes: z.string(),
  challenges: z.string(),
  funding: z.array(
    z.object({
      activity: z.string(),
      amount: z.string(),
    })
  ),
  biodiversityHotspot: z.boolean(),
  protectedAreaExpansion: z.boolean(),
  generatingRevenue: z.boolean(),
  communities: z.string(),
  smmes: z.string(),
  fundingOptions: z.array(z.string()),
  org: z.string(),
  scalable: z.string(),
  envImpact: z.string(),
  socialImpact: z.string(),
  sustainability: z.string(),
  profitability: z.string(),
  attachments: z
    .array(
      z.custom<File>((file) => file instanceof File, {
        message: "Invalid file",
      })
    )
    // .min(1, { message: "At least one file is required" })
    .refine((files) => files.every((file) => file.size <= MAX_FILE_SIZE), {
      message: "Each file must be under 5MB",
    })
    .refine(
      (files) => files.every((file) => ACCEPTED_TYPES.includes(file.type)),
      {
        message: "Only PDF or DOCX files are allowed",
      }
    ),
});

export const FormDefaultValues = {
  projectName: "",
  contactPerson: "",
  location: "",
  status: "",

  siteName: "",
  siteCapacity: "",
  sitePhone: "",
  siteEmail: "",

  advisorName: "",
  advisorPhone: "",
  advisorEmail: "",

  description: "",
  website: "",
  partners: "",
  problems: "",
  solution: "",
  priorities: "",
  outcomes: "",
  challenges: "",
  funding: [{ activity: "", amount: "0" }],
  biodiversityHotspot: false,
  protectedAreaExpansion: false,
  generatingRevenue: false,
  communities: "",
  smmes: "",
  fundingOptions: [],
  org: "",
  scalable: "",
  envImpact: "",
  socialImpact: "",
  sustainability: "",
  profitability: "",
  attachments: [],
};

export type StringFieldNames =
  | "projectName"
  | "contactPerson"
  | "location"
  | "status"
  | "siteName"
  | "siteCapacity"
  | "sitePhone"
  | "siteEmail"
  | "advisorName"
  | "advisorPhone"
  | "advisorEmail"
  | "website"
  | "partners"
  | "description"
  | "problems"
  | "solution"
  | "priorities"
  | "outcomes"
  | "challenges"
  | "smmes"
  | "communities"
  | "org"
  | "scalable"
  | "envImpact"
  | "socialImpact"
  | "sustainability"
  | "profitability";

export const FundingOptionsMapping: { [key: string]: string } = {
  grant: "Grant",
  reimbursable_grant: "Reimbursable grant",
  guarantees: "Guarantees",
  equity: "Equity",
  sub_loan: "Subordinated loan",
  senior_loan: "Senior loan",
  other: "Other",
};
