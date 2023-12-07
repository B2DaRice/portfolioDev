import { FakeDataConfig } from '@/app/api/utils/fakerUtils'

/**
 * Table Dependencies: 
 *  [
 *    addresses?, 
 *    contacts?,
 *    properties?,
 *    integrations?
 *  ]
 */
const config: FakeDataConfig[] = [
  {
    dataKey: 'name',
    metaDataType: 'org',
    metaDataSubType: 'orgName'
  },
  {
    dataKey: 'website',
    metaDataType: 'org',
    metaDataSubType: 'orgWebsite'
  },
  {
    dataKey: 'address',
    metaDataType: 'otherString',
    metaDataSubType: 'foreignKey',
    metaDataConfig: {
      foreignTable: {
        table: 'addresses',
        create: true
      }
    }
  },
  {
    dataKey: 'contact',
    metaDataType: 'otherString',
    metaDataSubType: 'foreignKey',
    metaDataConfig: {
      foreignTable: {
        table: 'contacts',
        create: true
      }
    }
  },
  {
    dataKey: 'referral',
    metaDataType: 'otherString',
    metaDataSubType: 'foreignKey',
    metaDataConfig: {
      foreignTable: {
        table: 'contacts',
        create: true,
        optional: true
      }
    }
  },
  // {
  //   dataKey: 'properties',
  //   metaDataType: 'otherString',
  //   metaDataSubType: 'foreignKey',
  //   metaDataConfig: {
  //     foreignTable: {
  //       table: 'properties'
  //     },
  //     numEntriesMinMax: [3, 7]
  //   }
  // },
  // {
  //   dataKey: 'integrations',
  //   metaDataType: 'otherString',
  //   metaDataSubType: 'foreignKey',
  //   metaDataConfig: {
  //     foreignTable: {
  //       table: 'integrations',
  //       optional: true
  //     },
  //     numEntriesMinMax: [1, 4]
  //   }
  // }
]

export default config
