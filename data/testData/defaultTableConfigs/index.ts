import addresses from './addresses';
import contacts from './contacts';
import orgs from './orgs';

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
