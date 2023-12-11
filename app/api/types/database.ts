// import { schema as addresses } from '@/app/api/addresses/schemas';
// import { schema as contacts } from '@/app/api/contacts/schemas';
// import { schema as orgs } from '@/app/api/orgs/schemas';

// const allConfigs = {
//   addresses,
//   contacts,
//   orgs
// }

let TABLE_NAMES: { [upperCaseName: string]: string } = {
  ADDRESSES: 'addresses',
  CONTACTS: 'contacts',
  ORGS: 'orgs',
  PROPERTIES: 'properties',
  JOBS: 'jobs',
  USERS: 'users'
}

export type TableName = 
  | typeof TABLE_NAMES.ADDRESSES
  | typeof TABLE_NAMES.CONTACTS
  | typeof TABLE_NAMES.ORGS
  | typeof TABLE_NAMES.PROPERTIES
  | typeof TABLE_NAMES.JOBS
  | typeof TABLE_NAMES.USERS

export { TABLE_NAMES }
// export { allConfigs }
