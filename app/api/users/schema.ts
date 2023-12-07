import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const usersTableSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  status: z.string().optional()
})
