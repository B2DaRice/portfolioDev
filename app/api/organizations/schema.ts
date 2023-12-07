import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const organizationsTableSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  contactEmail: z.string().optional(),
  referredBy: z.string().optional(),
  properties: z.array(z.string()).optional(),
  integrations: z.array(z.string()).optional(),
})
