import { FakeTableConfig, addForeignIds, createNewId, generateWebsite, getRandomForeignIds, rollOptional } from '@/app/api/utils/fakerUtils'
import { faker } from '@faker-js/faker'
import { z } from 'zod'
import { getDbConfigMap } from '../utils/serverUtils'

export const schema = z.object({
  id: z.string(),
  name: z.string().optional(),
  website: z.string().optional(),
  billingAddressId: z.string().optional(),
  contactIds: z.array(z.string()).optional(),
  referralIds: z.array(z.string()).optional(),
  propertyIds: z.array(z.string()).optional(),
  integrationIds: z.array(z.string()).optional(),
})

export type TypeFromSchema = z.infer<typeof schema>

/**
 * Table Dependencies: 
 *  [
 *    addresses?, 
 *    contacts?,
 *    properties?,
 *    integrations?
 *  ]
 */
export const dbConfig: FakeTableConfig<TypeFromSchema> = [
  {
    dataKey: 'name',
    metaDataType: 'str',
  },
  {
    dataKey: 'website',
    metaDataType: 'str',
  },
  {
    dataKey: 'billingAddressId',
    metaDataType: 'foreignKey',
    metaDataConfig: {
      foreignTable: {
        table: 'addresses',
        create: true
      }
    }
  },
  {
    dataKey: 'contactIds',
    metaDataType: 'foreignKey',
    metaDataConfig: {
      numEntriesMinMax: [1, 3],
      foreignTable: {
        table: 'contacts',
        create: true,
      },
    }
  },
  {
    dataKey: 'referralIds',
    metaDataType: 'foreignKey',
    metaDataConfig: {
      optional: true,
      foreignTable: {
        table: 'contacts',
        create: true,
      }
    }
  },
  // {
  //   dataKey: 'propertyIds',
  //   metaDataType: 'foreignKey',
  //   metaDataConfig: {
  //     foreignTable: {
  //       table: 'properties'
  //     },
  //     numEntriesMinMax: [3, 7]
  //   }
  // },
  // {
  //   dataKey: 'integrationIds',
  //   metaDataType: 'foreignKey',
  //   metaDataConfig: {
  //     foreignTable: {
  //       table: 'integrations',
  //       optional: true
  //     },
  //     numEntriesMinMax: [1, 4]
  //   }
  // }
]

const dbConfigMap = getDbConfigMap<TypeFromSchema>(dbConfig)

export const createNew = (newId?: string) => {
  const NULL_PROBABILITY_MAX = 3;
  const newOrgName = `${faker.hacker.adjective().replace(/^./, (letter: any) => letter.toUpperCase())} ${faker.hacker.noun().replace(/^./, (letter: any) => letter.toUpperCase())}`
  
  let newOrg: TypeFromSchema = { 
    id: newId ?? createNewId(),
    name: newOrgName,
    website: generateWebsite(newOrgName)
  };

  return addForeignIds<TypeFromSchema>(newOrg, dbConfig, NULL_PROBABILITY_MAX)
}
