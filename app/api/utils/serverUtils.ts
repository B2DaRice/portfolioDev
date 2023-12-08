import { TABLE_NAMES } from '@/data/testData/defaultTableConfigs';
import fs from "fs"
import path from "path"
import util from "util"
import { createTestDataTable } from './fakerUtils';

const updateDb = (filePath: string, value: any[] = []) => {
  let createStream = fs.createWriteStream(filePath);
  createStream.write(JSON.stringify(value, null, 2));
  createStream.end();
}

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

  // return await writeFileContent(filePath, JSON.stringify([...currData, ...newData], null, 2))
  //   .then((data) => {
  //     console.log('*** data written to file', data)
  //     console.log('*** currData to file', currData)
  //     console.log('*** newData to file', newData)
  //     const results = [...currData, ...newData]

  //     if (!newData.length || !results.length) {
  //       console.error('Error: Nothing written to file.')
  //       return;
  //     }
  
  //     return newData;
  //   })
  //   .catch((err) => {
  //     console.error('Error: error writing to file', err)
  //   })
  const results = [...currData, ...newData]

  console.log('*** currTable new data\n', results)

  if (!newData.length || !results.length) {
    console.error('Error: Nothing written to file.')
    return;
  }

  try {
    fs.writeFileSync(filePath, JSON.stringify(newData, null, 2))
    return newData;
  } catch (err) {
    console.error('Error: error writing to file', err)
  }
}

export const getInitTableData = async (tableName: string) => {
  const url = `data/testData/${tableName}.json`
  const filePath = path.join(process.cwd(), url)
  let currData = await getJSONContents(filePath)
  if (!currData.length) {
    await createTestDataTable(TABLE_NAMES.orgs, 10, true)
    currData = await getJSONContents(filePath)
  }

  return currData;
}
