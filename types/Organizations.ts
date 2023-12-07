import { organizationsTableSchema } from '@/app/api/organizations/schema'
import { z } from 'zod'

export type OrganizationDataType = z.infer<typeof organizationsTableSchema>
