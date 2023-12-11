import { z } from 'zod';
import { FakeTableConfig } from '../utils/fakerUtils';

export const schema = z.object({
  id: z.string(),
  addressId: z.string().optional(),
  // jobType: z.string().optional(),
  orgId: z.string().optional(),
  propertyId: z.string().optional(),
  startDate: z.string().optional(),
  // status: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  dueDate: z.string().optional(),
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
      optional: true,
      foreignTable: {
        table: 'orgs',
        create: true,
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
        create: true,
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
