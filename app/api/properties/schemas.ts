import { z } from 'zod';
import { FakeTableConfig } from '../utils/fakerUtils';

export const schema = z.object({
  id: z.string(),
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