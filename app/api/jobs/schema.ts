import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const jobSchema = z.object({
  id: z.string(),
  endDate: z.string().optional(),
  estimatedLength: z.number().optional(),
  address: z.string().optional(),
  location: z.string().optional(),
  jobType: z.string().optional(),
  organizationName: z.string().optional(),
  priority: z.number().optional(),
  propertyName: z.string().optional(),
  startDate: z.string().optional(),
  status: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  cleaningDate: z.string().optional(),
  cleanerAssigned: z.string().optional(),
  totalBilled: z.number().optional(),
})
