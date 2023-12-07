import { FakeDataConfig } from '@/app/api/utils/fakerUtils'

/**
 * Table Dependencies: 
 *  [ ]
 */
const config: FakeDataConfig[] = [
  {
    dataKey: 'street',
    metaDataType: 'address',
    metaDataSubType: 'street'
  },
  {
    dataKey: 'city',
    metaDataType: 'address',
    metaDataSubType: 'city'
  },
  {
    dataKey: 'state',
    metaDataType: 'address',
    metaDataSubType: 'state'
  },
  {
    dataKey: 'zipCode',
    metaDataType: 'address',
    metaDataSubType: 'zipCode'
  }
]

export default config
