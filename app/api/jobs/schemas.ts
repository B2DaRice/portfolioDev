import { z } from 'zod';
import { FakeDataConfig, FakeDataMeta, FakeTableConfig, addForeignIds, createNewId, generateDate, generateNumber, rollOptional } from '../utils/fakerUtils';
import { faker } from '@faker-js/faker';
import { getDbConfigMap } from '../utils/serverUtils';

export const schema = z.object({
  id: z.string(),
  // jobType: z.string().optional(),
  orgId: z.string().optional(),
  propertyId: z.string().optional(),
  startDate: z.number().optional(),
  // status: z.string().optional(),
  createdAt: z.number().optional(),
  updatedAt: z.number().optional(),
  dueDate: z.number().optional(),
  // cleaningDate: z.string().optional(),
  estimatedTimeHr: z.number().optional(),
  cleanerUserId: z.string().optional(),
  totalBilled: z.number().optional(),
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
    dataKey: 'orgId',
    metaDataType: 'foreignKey',
    metaDataConfig: {
      optional: true,
      foreignTable: {
        table: 'orgs',
      }
    }
  },
  {
    dataKey: 'propertyId',
    metaDataType: 'foreignKey',
    metaDataConfig: {
      optional: true,
      foreignTable: {
        table: 'properties',
      }
    }
  },
  {
    dataKey: 'startDate',
    metaDataType: 'dates',
  },
  {
    dataKey: 'createdAt',
    metaDataType: 'dates',
  },
  {
    dataKey: 'updatedAt',
    metaDataType: 'dates',
  },
  {
    dataKey: 'dueDate',
    metaDataType: 'dates',
  },
  {
    dataKey: 'estimatedTimeHr',
    metaDataType: 'num',
    metaDataConfig: {
      minMax: [1, 8]
    }
  },
  {
    dataKey: 'cleanerUserId',
    metaDataType: 'foreignKey',
    metaDataConfig: {
      optional: true,
      foreignTable: {
        table: 'users',
        create: true,
      }
    }
  },
  {
    dataKey: 'totalBilled',
    metaDataType: 'num',
    metaDataConfig: {
      minMax: [10000, 80000]
    }
  },
]

const dbConfigMap = getDbConfigMap<TypeFromSchema>(dbConfig)

export const createNew = (newId?: string) => {
  const NULL_PROBABILITY_MAX = 3;

  const createdAt = generateDate('createdAt', {})
  const dueDate = generateDate('dueDate', {}, { createdAt })
  
  let newJob: TypeFromSchema = { 
    id: newId ?? createNewId(),
    createdAt: createdAt,
    updatedAt: generateDate('updatedAt', {}, { createdAt, dueDate }),
    startDate: generateDate('startDate', {}, { createdAt, dueDate }),
    dueDate: dueDate,
    estimatedTimeHr: generateNumber(dbConfigMap['estimatedTimeHr'].metaDataConfig?.minMax!),
    totalBilled: generateNumber(dbConfigMap['totalBilled'].metaDataConfig?.minMax!)
  };

  return addForeignIds<TypeFromSchema>(newJob, dbConfig, NULL_PROBABILITY_MAX)
}
