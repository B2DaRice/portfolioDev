import { usersTableSchema } from '@/app/api/users/schema'
import { z } from 'zod'

export type UserDataType = z.infer<typeof usersTableSchema>
