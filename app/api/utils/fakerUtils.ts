import path from "path"
import { faker } from "@faker-js/faker"
import { addDataToJSON, getJSONContents } from './serverUtils'
import { TableName } from '../types/database'

export type FakeDataKeys = 'address' | 'person' | 'dates' | 'foreignKey' | 'num' | 'str' 
export type FakeDateDataKeys = 'createdAt' | 'updatedAt' | 'startDate' | 'dueDate'
 

type ForeignKeyMeta = {
  table: string,
  dataKey?: string,
  create?: boolean,
}

export type FakeDataMeta = {
  value?: any,
  numEntriesMinMax?: [number, number],
  foreignTable?: ForeignKeyMeta,
  dateType?: 'past' | 'future',
  minMax?: [number, number],
  optional?: boolean
}

export type FakeDataConfig<T> = {
  dataKey: keyof T,
  metaDataType: FakeDataKeys,
  metaDataConfig?: FakeDataMeta
}

export type FakeTableConfig<T> = FakeDataConfig<T>[]

export const rollOptional = (probabilityMax = 3) => {
  const nullRandom = faker.number.int({ min: 1, max: probabilityMax })
  return nullRandom/probabilityMax !== 0 
}

export const createNewId = (): string => {
  const alpha = faker.string.alpha({ length: 3 }).toUpperCase()
  const numeric = faker.number.int({ min: 10000, max: 99999 })
  
  return `${alpha}${numeric}`
}

export const generateNumber = (numMinMax: [number, number], useFloat = false) => {
  const newNum = faker.number.int({ min: numMinMax[0], max: numMinMax[1] })
  // console.log('*** newNum\n', newNum)
  return useFloat ? newNum/100 : newNum
}

export const generateWebsite = (domain = '') => {
  const websitePostfixes = [ '.js', '.com', '.io' ]
  const url = domain.toLowerCase() || faker.hacker.adjective()
  return `${url.split(' ').join('_')}${faker.helpers.arrayElement(websitePostfixes)}`
}

type CurrentDates = {
  createdAt?: number,
  updatedAt?: number,
  startDate?: number,
  dueDate?: number,
}

export const generateDate = (
  dataKey: FakeDateDataKeys, 
  currDBColConfig: FakeDataMeta,
  currDates: CurrentDates = {}
) => {
  const { minMax, dateType } = currDBColConfig
  const { createdAt, dueDate } = currDates
  const firstDate = new Date('2023-01-01')
  const today = new Date()
  const lastDate = new Date(new Date().getFullYear() + 1)
  const createdAtDate = createdAt ? new Date(createdAt) : faker.date.between({ from: firstDate, to: today })

  const generate = (): number => {
    switch (dataKey) {
      case 'createdAt': 
        return createdAtDate.getTime()

      case 'updatedAt':
        return faker.date.between({ from: createdAtDate, to: today }).getTime()

      case 'startDate':
        let maxDate = dueDate 
          ? new Date(dueDate) 
          : faker.date.between({ from: createdAtDate, to: new Date().setMonth(today.getMonth() + 2)})

        return faker.date.between({ from: createdAtDate, to: new Date().setMonth(maxDate.getDate() + 7)}).getTime()

      case 'dueDate':
        return faker.date.between({ from: createdAtDate, to: new Date().setMonth(today.getMonth() + 2)}).getTime()

      default:
    }

    return !dateType
      ? faker.date.between({ from: minMax?.[0] ?? firstDate, to: minMax?.[0] ?? lastDate}).getTime()
      : dateType === 'past'
        ? faker.date.between({ from: firstDate, to: today }).getTime()
        : faker.date.between({ from: today.toISOString(), to: lastDate}).getTime()
  }

  return generate()
}

export async function createForeignData<T> (dbConfig: FakeTableConfig<T>, newData: T[] = []) {
  dbConfig
    .filter(({ metaDataType, metaDataConfig }) => ( 
      metaDataConfig?.foreignTable?.create && metaDataType === 'foreignKey'
    ))
    .forEach(({ dataKey, metaDataConfig }) => {
      const { table } = metaDataConfig!.foreignTable!
      const foreignTableUrl = path.join(process.cwd(), `data/testData/${table}.json`)
      const { createNew } = require(`@/app/api/${table}/schemas.ts`)
      const onlyIds = newData
        .map((item: T) => (item[dataKey]))
        .flat()

      const newDataFromIds = Array.from(onlyIds, (newId) => createNew(newId))

      addDataToJSON(foreignTableUrl, newDataFromIds)
      console.log(`✅ ${table} Table foreign data generated.`)
    })
}

export const getRandomForeignIds = async (tableName: string, numEntries: number) => {
  const foreignDataUrl = path.join(process.cwd(), `data/testData/${tableName}.json`)
  const randomIndex = (max: number) => faker.number.int({ min: 0, max })

  const foreignData = await getJSONContents(foreignDataUrl)
    .then((data) => (
      numEntries > -1
        ? new Set(Array
          .from({ length: numEntries }, () => data[randomIndex(data.length - 1)])
          .map((item: any) => item.id))
        : [data[randomIndex(data.length - 1)].id]
    ))
  
  return foreignData || []
}

export function addForeignIds<T> (
  newData: T,
  dbConfig: FakeTableConfig<T>, 
  NULL_PROBABILITY_MAX = 3
): T {
  const foreignKeys = dbConfig.filter(({ metaDataType, metaDataConfig }) => {
    const doAdd = !metaDataConfig?.optional || rollOptional(NULL_PROBABILITY_MAX)
    return doAdd && metaDataType === 'foreignKey'
  });

  foreignKeys.forEach(async ({ dataKey, metaDataConfig }) => {
    const { foreignTable, numEntriesMinMax } = metaDataConfig!;
    const { table: foreignTableName, create } = foreignTable!;
    console.log('*** numEntriesMinMax - ', numEntriesMinMax)

    if (create) {
      if (numEntriesMinMax) {
        const numEntries = faker.number.int({ min: numEntriesMinMax[0], max: numEntriesMinMax[1] })
        const newForeignKeys = Array.from({ length: numEntries }, () => createNewId())
        // @ts-ignore: next-line
        newData[dataKey] = newForeignKeys
      } else {
        // @ts-ignore: next-line
        newData[dataKey] = createNewId()
      }
    } else {
      const numEntries = numEntriesMinMax ? faker.number.int({ min: numEntriesMinMax[0], max: numEntriesMinMax[1] }) : 1
      const foreignIds = await getRandomForeignIds(foreignTableName, numEntries)
      // @ts-ignore: next-line
      newData[dataKey] = !numEntriesMinMax && foreignIds ? foreignIds[0] : foreignIds || []
    }
  });

  return newData;
}

export async function createTestTableData<T> (
  tableName: TableName, 
  numEntries = 100, 
  reset = false
) {
  const currSchema = require(`@/app/api/${tableName}/schemas.ts`)
  // type T = z.infer<typeof currSchema.schema>;
  console.log('*** CurrConfig\n', currSchema.dbConfig)

  const { 
    createNew, 
    dbConfig 
  }: { 
    createNew: () => T, 
    dbConfig: FakeTableConfig<T> 
  } = currSchema
  const tableUrl = path.join(process.cwd(), `data/testData/${tableName}.json`)
  const currData: T[] = reset ? [] : await getJSONContents(tableUrl)
  // console.log('*** tableName at root\n', tableName)
  // console.log('*** currData.length - ', currData?.length)

  const newData = Array.from({ length: numEntries }, createNew)
  const tableData = [...currData, ...newData]

  // console.log('*** tableData.length - ', tableData?.length)
  
  await addDataToJSON(tableUrl, tableData)
  createForeignData<T>(dbConfig, newData)

  // dbConfig
  //   .filter(({ metaDataType, metaDataConfig }) => ( 
  //     metaDataConfig?.foreignTable?.create && metaDataType === 'foreignKey'
  //   ))
  //   .forEach(({ dataKey, metaDataConfig }) => {
  //     const { table: foreignTableName } = metaDataConfig!.foreignTable!
  //     const foreignTableUrl = path.join(process.cwd(), `data/testData/${foreignTableName}.json`)
  //     const { createNew } = require(`@/app/api/${foreignTableName}/schemas.ts`)

  //     newData.forEach((item) => {
  //       const newDataFromIds = Array.from(item[dataKey], (newId) => createNew(newId))
  //       addDataToJSON(foreignTableUrl, newDataFromIds)
  //       console.log(`✅ ${foreignTableName} Table foreign data generated.`)
  //     })
  //   })

  // fs.writeFileSync(tableUrl, JSON.stringify(tableData, null, 2))

  console.log(`✅ ${tableName} Table data generated.`)
  return tableData
}
