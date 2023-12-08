import { schema as addresses } from '@/app/api/addresses/schemas';
import { schema as contacts } from '@/app/api/contacts/schemas';
import { schema as orgs } from '@/app/api/orgs/schemas';

const allConfigs = {
  addresses,
  contacts,
  orgs
}

export type TableName = keyof typeof allConfigs
let TABLE_NAMES: { [upperCaseName: string]: TableName } = {}

Object.keys(allConfigs).forEach((tableName) => {
  TABLE_NAMES[tableName] = tableName as TableName
})

export { TABLE_NAMES }
export default allConfigs
