import { FakeTableConfig, createNewId } from '@/app/api/utils/fakerUtils'
import { faker } from '@faker-js/faker'
import { z } from 'zod'

export const schema = z.object({
  id: z.string(),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
})

export type TypeFromSchema = z.infer<typeof schema>

/**
 * Table Dependencies: 
 *  [ ]
 */
export const dbConfig: FakeTableConfig<TypeFromSchema> = [
  {
    dataKey: 'street',
    metaDataType: 'address',
  },
  {
    dataKey: 'city',
    metaDataType: 'address',
  },
  {
    dataKey: 'state',
    metaDataType: 'address',
  },
  {
    dataKey: 'zipCode',
    metaDataType: 'address',
  }
]

export const createNew = (newId?: string): TypeFromSchema => ({
  id: newId ?? createNewId(),
  street: faker.location.streetAddress(),
  city: faker.location.city(),
  state: faker.location.state({ abbreviated: true }),
  zipCode: faker.location.zipCode(),
})