import { FakeTableConfig, createNewId, generateWebsite, getRandomForeignIds, rollOptional } from '@/app/api/utils/fakerUtils'
import { faker } from '@faker-js/faker'
import { z } from 'zod'

export const schema = z.object({
  id: z.string(),
  name: z.string().optional(),
  website: z.string().optional(),
  addressId: z.string().optional(),
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
    dataKey: 'addressId',
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

export const createNew = (newId?: string) => {
  const NULL_PROBABILITY_MAX = 3;
  const newOrgName = `${faker.hacker.adjective().replace(/^./, (letter: any) => letter.toUpperCase())} ${faker.hacker.noun().replace(/^./, (letter: any) => letter.toUpperCase())}`
  
  const newOrg: TypeFromSchema = { 
    id: newId ?? createNewId(),
    name: newOrgName,
    website: generateWebsite(newOrgName)
  };

  const foreignKeys = dbConfig.filter(({ metaDataType, metaDataConfig }) => {
    const doAdd = !metaDataConfig?.optional || rollOptional(NULL_PROBABILITY_MAX)
    return doAdd && metaDataType === 'foreignKey'
  });

  foreignKeys.forEach(async ({ dataKey, metaDataConfig }) => {
    const { foreignTable, numEntriesMinMax, optional } = metaDataConfig!;
    const { table: foreignTableName, create } = foreignTable!;
    const numEntries = numEntriesMinMax ? faker.number.int({ min: numEntriesMinMax[0], max: numEntriesMinMax[1] }) : -1

    if (create) {
      if (numEntriesMinMax) {
        // const numEntries = faker.number.int({ min: numEntriesMinMax[0], max: numEntriesMinMax[1] })
        const newForeignKeys = Array.from({ length: numEntries }, () => createNewId())
        // @ts-ignore: next-line
        newOrg[dataKey] = newForeignKeys
      } else {
        // @ts-ignore: next-line
        newOrg[dataKey] = (!optional || rollOptional(NULL_PROBABILITY_MAX)) ? createNewId() : null
      }
    } else {
      const foreignIds = await getRandomForeignIds(foreignTableName, numEntries)
      // @ts-ignore: next-line
      newOrg[dataKey] = (!optional || rollOptional(NULL_PROBABILITY_MAX)) ? foreignIds : null
    }
  });

  return newOrg;
}
