import fs from "fs"
import path from "path"
import util from "util"
import { FakeDataMeta, FakeTableConfig, createTestTableData } from './fakerUtils';

export const getJSONContents = async (filePath: string) => {
  const readFileContent = util.promisify(fs.readFile)
  const results = await readFileContent(filePath)
    .then(async (data) => {
      if (!data) {
        throw new Error('No data found.')
      }

      return await JSON.parse(data?.toString())
    })
    .catch((err) => console.error('*** catch from reading json', err))

  return results || [];
}

export const addDataToJSON = async (filePath: string, newData: any[] = []) => {
  const currData = await getJSONContents(filePath) || []
  const results = [...currData, ...newData]

  if (!newData.length || !results.length) {
    console.error('Error: Nothing written to file.')
    return;
  }

  try {
    fs.writeFileSync(filePath, JSON.stringify(newData, null, 2))
    console.log('*** data written to file')
    return newData;
  } catch (err) {
    console.error('Error: error writing to file', err)
  }
}

export async function getInitTableData<T> (tableName: string) {
  const url = `data/testData/${tableName}.json`
  const filePath = path.join(process.cwd(), url)

  let currData: T[] = await getJSONContents(filePath)
  if (!currData.length) {
    currData = await createTestTableData<T>(tableName, 10, true)
  }

  return currData;
}

type ConfigMap = {
  [dataKey: string]: {
    metaDataType: string,
    metaDataConfig?: FakeDataMeta
  }
}
export function getDbConfigMap<T> (dbConfig: FakeTableConfig<T>) {
  let configMap: ConfigMap = {}

  dbConfig.forEach(({ dataKey, ...config }) => {
    const dataKeyStr = dataKey as string
    configMap[dataKeyStr] = { ...config }
  })
  
  return configMap
}
