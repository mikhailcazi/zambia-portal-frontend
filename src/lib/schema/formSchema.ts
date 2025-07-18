import * as z from "zod";

export const FormSchema = z.object({
  projectName: z.string().min(1, "Required!"),
  contactPerson: z.string().min(1, "Required!"),
  location: z.string(),
  status: z.string(),

  contactDetails: z.object({
    site: z.object({
        name: z.string(),
        capacity: z.string(),
        phone: z.string(),
        email: z.string().email(),
    }),
    advisors: z.object({
        name: z.string(),
        phone: z.string(),
        email: z.string().email()
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
  // funding: z.array(z.object({
  //       activity: z.string(),
  //       amount: z.number()
  // })),
//   biodiversityHotspot: z.boolean(),
//   protectedAreaExpansion: z.boolean(),
//   generatingRevenue: z.boolean(),
//   communities: z.object({
//     supports: z.boolean(),
//     info: z.string()
//   }),
//   smmes: z.object({
//     promotes: z.boolean(),
//     info: z.string()
//   }),
//   fundingOptions: z.array(z.string()),
//   org: z.string(),
//   scalable: z.boolean(),
//   envImpact: z.string(),
//   socialImpact: z.string(),
//   sustainability: z.string(),
//   profitability: z.string(),
//   supportingDocuments: z.array(z.boolean()),
});