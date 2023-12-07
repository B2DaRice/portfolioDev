import { jobSchema } from '@/app/api/jobs/schema'
import { z } from 'zod'

export type JobDataType = z.infer<typeof jobSchema>
