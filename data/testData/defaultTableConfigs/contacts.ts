import { FakeDataConfig } from '@/app/api/utils/fakerUtils'

/**
 * Table Dependencies: 
 *  [ ]
 */
const config: FakeDataConfig[] = [
  {
    dataKey: 'name',
    metaDataType: 'person',
    metaDataSubType: 'fullName'
  },
  {
    dataKey: 'email',
    metaDataType: 'person',
    metaDataSubType: 'email'
  },
  {
    dataKey: 'phone',
    metaDataType: 'person',
    metaDataSubType: 'phone'
  }
]

export default config
