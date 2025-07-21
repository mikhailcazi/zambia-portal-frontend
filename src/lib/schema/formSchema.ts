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

  contactDetails: z.object({
    site: z.object({
      name: z.string(),
      capacity: z.string(),
      phone: z.string(),
      email: z.string(),
    }),
    advisors: z.object({
      name: z.string(),
      phone: z.string(),
      email: z.string(),
    }),
  }),
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
  attachments: z.array(
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
  | "contactDetails.site.name"
  | "contactDetails.site.capacity"
  | "contactDetails.site.phone"
  | "contactDetails.site.email"
  | "contactDetails.advisors.name"
  | "contactDetails.advisors.phone"
  | "contactDetails.advisors.email"
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
