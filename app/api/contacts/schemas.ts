import { FakeTableConfig, createNewId } from '@/app/api/utils/fakerUtils'
import { faker } from '@faker-js/faker'
import { z } from 'zod'

export const schema = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
})

export type TypeFromSchema = z.infer<typeof schema>

/**
 * Table Dependencies: 
 *  [ ]
 */
export const dbConfig: FakeTableConfig<TypeFromSchema> = [
  {
    dataKey: 'name',
    metaDataType: 'person'
  },
  {
    dataKey: 'email',
    metaDataType: 'person'
  },
  {
    dataKey: 'phone',
    metaDataType: 'person'
  }
]

export const createNew = (newId?: string): TypeFromSchema => ({
  id: newId ?? createNewId(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
})
