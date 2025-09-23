import * as z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
];

const singleFileType = z
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
  );

export const FormSchema = z.object({
  projectTitle: z.string().nonempty("Required field!"),
  organization: z.string().nonempty("Required field!"),
  contactPerson: z.string().nonempty("Required field!"),
  location: z.string().nonempty("Required field!"),
  sector: z.string().nonempty("Required field!"),
  startDate: z.date(),
  endDate: z.date(),
  stage: z.string().nonempty("Required field!"),
  estimatedInvestment: z.string().nonempty("Required field!"),
  currency: z.string().nonempty("Required field!"),
  partners: z.string().nonempty("Required field!"),

  // section b
  projectOverview: z
    .array(
      z.custom<File>((file) => file instanceof File, {
        message: "Invalid file",
      })
    )
    .min(1, { message: "At least one file is required" })
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
  categories: z
    .array(z.string())
    .min(1, { message: "Please select at least one option" }),
  categoriesOther: z.string(),
  envImpact: z
    .array(z.string())
    .min(1, { message: "Please select at least one option" }),
  envImpactIndicator: z.string().nonempty("Required field!"),
  envImpactDescription: z.string().nonempty("Required field!"),
  socialImpact: z
    .array(z.string())
    .min(1, { message: "Please select at least one option" }),
  socialImpactDescription: z.string().nonempty("Required field!"),
  compliance: z
    .record(z.string())
    .refine((val) => Object.keys(val).length >= 6, {
      message: "Please answer all Government & Compliance questions",
    }),
  fundingOptions: z
    .record(z.string())
    .refine((val) => Object.keys(val).length >= 3, {
      message: "Please answer all Financial Readiness questions",
    }),
  fundingOptionsOther: z.string(),
  totalCost: z.string().nonempty("Required field!"),
  fundingSought: z
    .array(z.string())
    .min(1, { message: "Please select at least one option" }),

  scalable: z.string().nonempty("Required field!"),

  // section d
  measureableImpact: z.boolean(),
  annualReporting: z.boolean(),
  keyIndicators: z.boolean(),

  // section e
  monitoring: z.boolean(),

  companyRegistration: singleFileType,
  businessPlan: singleFileType,
  financialStatements: singleFileType,
  partnerships: singleFileType,
  techStudies: singleFileType,
  other: singleFileType,

  signedName: z.string().nonempty("Required field!"),
  position: z.string().nonempty("Required field!"),
});

export const FormDefaultValues: z.infer<typeof FormSchema> = {
  projectTitle: "",
  organization: "",
  contactPerson: "",
  location: "",
  startDate: new Date(),
  endDate: new Date(),
  sector: "",
  stage: "",
  estimatedInvestment: "",
  currency: "",

  partners: "",

  projectOverview: [],

  categories: [],
  categoriesOther: "",

  envImpact: [],
  envImpactIndicator: "",
  envImpactDescription: "",
  socialImpact: [],
  socialImpactDescription: "",
  compliance: {},
  fundingOptions: {},
  fundingOptionsOther: "",
  totalCost: "",
  fundingSought: [],
  scalable: "",

  measureableImpact: false,
  annualReporting: false,
  keyIndicators: false,

  // section e
  monitoring: false,

  companyRegistration: [],
  businessPlan: [],
  financialStatements: [],
  partnerships: [],
  techStudies: [],
  other: [],
  position: "",
  signedName: "",
};

export type StringFieldNames =
  | "projectTitle"
  | "organization"
  | "contactPerson"
  | "location"
  | "sector"
  | "estimatedInvestment"
  | "partners"
  | "signedName"
  | "position"
  | "envImpactIndicator"
  | "envImpactDescription"
  | "socialImpactDescription"
  | "scalable"
  | "totalCost";

export const FileFields = [
  "projectOverview",
  "companyRegistration",
  "businessPlan",
  "financialStatements",
  "partnerships",
  "techStudies",
  "other",
];

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
