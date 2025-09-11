import * as z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
];

export const FormSchema = z.object({
  projectTitle: z.string(),
  organization: z.string(),
  contactPerson: z.string(),
  location: z.string(),
  implementationPeriod: z.string(),
  sector: z.string(),
  stage: z.string(),
  estimatedInvestment: z.string(),
  partners: z.string(),

  // section b
  projectOverview: z
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

  // section c
  categories: z.array(z.string()),
  envImpact: z.array(z.string()),
  envImpactIndicator: z.string(),
  envImpactDescription: z.string(),
  socialImpact: z.array(z.string()),
  socialImpactDescription: z.string(),
  compliance: z.record(z.string()),
  fundingOptions: z.record(z.string()),
  fundingSought: z.array(z.string()),
  scalable: z.string(),

  // section d
  measureableImpact: z.boolean(),
  annualReporting: z.boolean(),
  keyIndicators: z.boolean(),

  // section e
  monitoring: z.boolean(),

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

  signedName: z.string(),
  position: z.string(),
});

export const FormDefaultValues: z.infer<typeof FormSchema> = {
  projectTitle: "",
  organization: "",
  contactPerson: "",
  location: "",
  implementationPeriod: "",
  sector: "",
  stage: "",
  estimatedInvestment: "",
  partners: "",

  projectOverview: [],

  categories: [],
  envImpact: [],
  envImpactIndicator: "",
  envImpactDescription: "",
  socialImpact: [],
  socialImpactDescription: "",
  compliance: {},
  fundingOptions: {},
  fundingSought: [],
  scalable: "",

  measureableImpact: false,
  annualReporting: false,
  keyIndicators: false,

  // section e
  monitoring: false,

  attachments: [],
  position: "",
  signedName: "",
};

export type StringFieldNames =
  | "projectTitle"
  | "organization"
  | "contactPerson"
  | "location"
  | "implementationPeriod"
  | "sector"
  | "stage"
  | "estimatedInvestment"
  | "partners"
  | "categories"
  | "envImpact"
  | "envImpactIndicator"
  | "envImpactDescription"
  | "socialImpactDescription"
  | "socialImpact"
  | "compliance"
  | "scalable"
  | "signedName"
  | "position";

export const FinancialOptions = [
  "Grant",
  "Reimbursable grant",
  "Guarantees",
  "Equity",
  "Subordinated loan",
  "Senior loan",
  "Lease finance",
];

export const ProjectStages = [
  "Concept",
  "Early Stage",
  "Feasibility",
  "Development",
  "Ready to Implement",
  "Operational",
  "Expansion",
];

export const CategoryValues = [
  "Renewable Energy",
  "Energy Efficiency",
  "Sustainable Agriculture & Food Systems / Forestry",
  "Biodiversity & Ecosystem Services",
  "Water & Waste Management",
  "Green Transport & Urban Infrastructure",
  "Climate Adaptation & Resilience",
  "Green Buildings",
  "Social Co-Benefits",
];

export const ClimateImpactValues = [
  "GHG emissions reduction (mitigation)",
  "Climate change adaptation",
  "Biodiversity protection/enhancement",
  "Pollution prevention/control",
  "Resource efficiency & circular economy",
];

export const SocialImpactValues = [
  "Job creation",
  "Community well-being / social inclusion",
  "Gender empowerment",
  "Just Transition",
];

export const ComplianceQuestions = [
  "Legally registered in Zambia?",
  "Environmental and Social Impact Assessment (ESIA) conducted?",
  "Climate risk screening completed?",
  "Compliant with national laws?",
  "No adverse impacts on critical habitats, indigenous communities, cultural heritage?",
  "Do No Significant Harm Principle met?",
];

export const ComplianceOptions = ["Done", "Not Done", "Not Applicable"];

export const FundingQuestions = [
  "Feasibility Study / Business Plan Developed?",
  "No Estimated IRR / ROI available?",
  "Any Co-financing secured?",
];

export const FundingOptions = ["Yes", "No"];
