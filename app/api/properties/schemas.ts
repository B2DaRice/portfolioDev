import { z } from 'zod';
import { FakeTableConfig, addForeignIds, createNewId, generateNumber } from '../utils/fakerUtils';
import { getDbConfigMap } from '../utils/serverUtils';
import { faker } from '@faker-js/faker';

export const schema = z.object({
  id: z.string(),
  numJobs: z.number().optional(),
  cleaningCost: z.number().optional(),
  addressId: z.string().optional(),
  orgId: z.string().optional(),
  contactIds: z.array(z.string()).optional(),
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
    dataKey: 'numJobs',
    metaDataType: 'num',
    metaDataConfig: {
      minMax: [1, 7]
    }
  },
  {
    dataKey: 'cleaningCost',
    metaDataType: 'num',
    metaDataConfig: {
      minMax: [10000, 80000]
    }
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
    dataKey: 'orgId',
    metaDataType: 'foreignKey',
    metaDataConfig: {
      foreignTable: {
        table: 'orgs',
      },
    }
  },
  {
    dataKey: 'contactIds',
    metaDataType: 'foreignKey',
    metaDataConfig: {
      optional: true,
      numEntriesMinMax: [1, 3],
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
  
  let newProperty: TypeFromSchema = { 
    id: newId ?? createNewId(),
    numJobs: generateNumber(dbConfigMap['numJobs'].metaDataConfig?.minMax!),
    cleaningCost: generateNumber(dbConfigMap['cleaningCost'].metaDataConfig?.minMax!, true)
  };

  return addForeignIds<TypeFromSchema>(newProperty, dbConfig, NULL_PROBABILITY_MAX)
}
