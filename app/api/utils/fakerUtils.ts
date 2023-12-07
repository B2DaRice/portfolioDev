import fs from "fs"
import path from "path"
import util from "util"
import { faker } from "@faker-js/faker"
import { addDataToJSON, getJSONContents } from './serverUtils'
import testDataConfigs, { TableName } from '@/data/testData/defaultTableConfigs'

const websitePostfixes = [ '.js', '.com', '.io' ]

export type FakeDataRootKeys = 'address' | 'person' | 'org' | 'otherNumber' | 'otherString' | 'dates'

export type FakeAddressKeys = 'street' | 'city' | 'state' | 'zipCode'
export type FakePersonKeys = 'firstName' | 'lastName' | 'fullName' | 'email' | 'phone'
export type FakeOrgKeys = 'orgName' | 'orgContact' | 'orgWebsite'
export type FakeNumberKeys = 'randomNumber' | 'randomFloat'
export type FakeStringKeys = 'foreignKey' | 'website' | 'customString'
export type FakeDateKeys = 'createdAt' | 'updatedAt' | 'dueDate' | 'randomDate'
export type FakeDataSubTypeKeys = 
  | FakeAddressKeys 
  | FakePersonKeys 
  | FakeOrgKeys 
  | FakeNumberKeys 
  | FakeStringKeys 
  | FakeDateKeys

type ForeignKeyMeta = {
  table: string,
  dataKey?: string,
  create?: boolean,
  optional?: boolean
}

type FakeDataMeta = {
  value?: any,
  foreignTable?: ForeignKeyMeta,
  minMax?: [number, number],
  dateType?: 'past' | 'future',
  numEntriesMinMax?: [number, number]
}

export type FakeDataConfig = {
  dataKey?: string,
  metaDataType: FakeDataRootKeys,
  metaDataSubType: FakeAddressKeys | FakePersonKeys | FakeOrgKeys | FakeNumberKeys | FakeStringKeys,
  metaDataConfig?: FakeDataMeta
}

type FakeDataGeneratorType = {
  [dataType in FakeDataRootKeys]: {
    [dataSubType in FakeDataSubTypeKeys]?: (dataConfig?: FakeDataMeta) => void
  }
}

const getRandomDataFromTable = async ({ foreignTable, numEntriesMinMax }: FakeDataMeta) => {
  const { 
    table, 
    dataKey = 'id', 
    create = false, 
    optional = false 
  } = foreignTable!

  const foreignDataUrl = path.join(process.cwd(), `data/testData/${table}.json`)
  let foreignData = await getJSONContents(foreignDataUrl)
  if (!foreignData.length && !create && !optional) {
    console.log('ERROR: No data found in foreign table: "' + foreignTable + '"')
    return
  }

  let randomIndex = (max = 0) => faker.number.int({ min: 0, max })
  const nullRandom = faker.number.int({ min: 1, max: 3 })
  const nullProbability = 3

  let result: any = null
  if (!optional || nullRandom/nullProbability !== 0) {

    if (numEntriesMinMax) {
      const numEntries = faker.number.int({ min: numEntriesMinMax[0], max: numEntriesMinMax[1] })

      result = Array.from({ length: numEntries }, async () => {
        let assosiciatedItem: any = ''
        if (create) {
          const newItem = await generateTestData(table as TableName, 1) || []
          const returnedItem = await addDataToJSON(foreignDataUrl, [newItem]) || []
          // console.log('*** returnedItem:\n', returnedItem)
          assosiciatedItem = returnedItem[0]?.[dataKey] || null
        } else {
          assosiciatedItem = foreignData[randomIndex(foreignData.length - 1)]
        }

        return assosiciatedItem[dataKey]
      }).filter((item) => !!item)

    } else if (create) {
      const newItem = await generateTestData(table as TableName, 1) || []
      const returnedItem = await addDataToJSON(foreignDataUrl, [newItem]) || []

      console.log('*** newItem:\n', returnedItem)
      result = newItem[0]?.[dataKey] || null

    } else {
      result = foreignData[randomIndex()]?.[dataKey] || null
    }
  }
  console.log('*** result from foreign table:\n', result)
  return result
}

const newId = () => {
  const alpha = faker.string.alpha({ length: 3 }).toUpperCase()
  const numeric = faker.number.int({ min: 10000, max: 99999 })
  
  return `${alpha}${numeric}`
}

const generateTestData = async (currTable: TableName, numEntries = 100) => {
  const currConfig = testDataConfigs[currTable]
  const firstDate = '2023-01-01'
  const today = new Date()
  const lastDate = new Date(new Date().getFullYear() + 1).toISOString()
  const createdAtDate = faker.date.between({ from: firstDate, to: today.toISOString()})
  const updatedAtDate = faker.date.between({ from: createdAtDate, to: today.toISOString()})

  // console.log('*** currConfig:\n', currTable)

  const generate = async () => {
    const generator: FakeDataGeneratorType = {
      address: {
        street: () => {
          return faker.location.streetAddress()
        },
        city: () => {
          return faker.location.city()
        },
        state: () => {
          return faker.location.state()
        },
        zipCode: () => {
          return faker.location.zipCode(
        },
      },
      person: {
        firstName: () => {
          return faker.person.firstName()
        },
        lastName: () => {
          return faker.person.lastName()
        },
        fullName: () => {
          return faker.person.fullName()
        },
        email: () => {
          return faker.internet.email()
        },
        phone: () => {
          return faker.phone.number('###-###-####')
        },
      },
      org: {
        orgName: () => {
          return `${faker.hacker.adjective().replace(/^./, (letter: any) => letter.toUpperCase())} ${faker.hacker.noun().replace(/^./, (letter: any) => letter.toUpperCase())}`
        },
        // orgContact: (config) => {
        //   return getRandomDataFromTable(config!)
        // },
        orgWebsite: () => {
          return `${faker.hacker.adjective().split(' ').join('_')}${faker.helpers.arrayElement(websitePostfixes)}`
        }
      },
      otherNumber: {
        randomNumber: (config) => {
          const { minMax } = config || { dateMinMax: [1, 100] }
          return faker.number.int({ min: minMax![0], max: minMax![1] })
        },
        randomFloat: (config) => {
          const { minMax } = config || { dateMinMax: [1, 100] }
          return faker.number.float({ min: minMax![0], max: minMax![1] })
        },
      },
      otherString: {
        foreignKey: async (config) => {
          if (!config?.foreignTable) {
            console.log(`ERROR: foreignTable config not provided for foreignKey data type`)
            return
          }
          const newDataGen = await getRandomDataFromTable(config)
          console.log('*** newDataGen:\n', newDataGen)
          return newDataGen
        },
        website: () => {
          return `${faker.hacker.adjective().split(' ').join('_')}${faker.helpers.arrayElement(websitePostfixes)}`
        },
        customString: (config) => {
          return `${config?.value || ''}`
        },
      },
      dates: {
        createdAt: () => {
          return createdAtDate.toUTCString()
        },
        updatedAt: () => {
          return updatedAtDate.toUTCString()
        },
        dueDate: () => {
          return faker.date.between({ from: createdAtDate, to: new Date().setMonth(today.getMonth() + 3)}).toUTCString()
        },
        randomDate: (config) => {
          const { dateType = '' } = config!
          return !dateType
            ? faker.date.between({ from: firstDate, to: lastDate}).toUTCString()
            : dateType === 'past'
              ? faker.date.between({ from: firstDate, to: today.toISOString()}).toUTCString()
              : faker.date.between({ from: today.toISOString(), to: lastDate}).toUTCString()
        }
      }
    }

    const newData = Array.from({ length: numEntries }, async () => {
      let newData: { [dataKey: string]: any } = {
        id: newId()
      }
      currConfig.forEach(({ dataKey = '', metaDataType, metaDataSubType, metaDataConfig }) => {
        newData[dataKey] = metaDataSubType === 'foreignKey' 
          ? generator[metaDataType]?.[metaDataSubType]?.(metaDataConfig)
          : generator[metaDataType]?.[metaDataSubType]?.(metaDataConfig)
      })
    })  
  
    return newData
  }

  // const generatorPromise = util.promisify(generate)

  // return await generatorPromise()
  //   .then((data: any[]) => data)
  return generate()
  
}

export const createTestDataTable = async (
  tableName: TableName, 
  numEntries = 100, 
  reset = false
) => {
  const tableUrl = path.join(process.cwd(), `data/testData/${tableName}.json`)
  const currData = reset ? [] : await getJSONContents(tableUrl)
  // console.log('*** tableName at root\n', tableName)

  const newData = await generateTestData(tableName, numEntries)

  const tableData = [...currData, ...newData]

  await fs.writeFileSync(tableUrl, JSON.stringify(tableData, null, 2))

  console.log(`✅ ${tableName} Table data generated.`)
}
