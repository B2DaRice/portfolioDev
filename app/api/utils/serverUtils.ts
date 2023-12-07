import fs from "fs"
import util from "util"

export const getJSONContents = async (filePath: string) => {
  const readFileContent = util.promisify(fs.readFile)
  const results = await readFileContent(filePath)
    .then(async (data) => {
      if (!data) {
        throw new Error('No data found.')
      }

      return await JSON.parse(await data?.toString())
    })
    .catch((err) => {
      if (err.code === 'ENOENT') {
        console.log('Table not found, creating table now.')

        let createStream = fs.createWriteStream(filePath);
        createStream.write(JSON.stringify([]));
        createStream.end();
        return;
      }
      console.error('*** catch from reading json', err)
    })

  return results || [];
}

export const addDataToJSON = async (filePath: string, newData: any[] = []) => {
  const writeFileContent = util.promisify(fs.writeFile)
  const currData = await getJSONContents(filePath) || []

  return await writeFileContent(filePath, JSON.stringify([...currData, ...newData], null, 2))
    .then((data) => {
      console.log('*** data written to file', data)
      console.log('*** currData to file', currData)
      console.log('*** newData to file', newData)
      const results = [...currData, ...newData]

      if (!newData.length || !results.length) {
        console.error('Error: Nothing written to file.')
        return;
      }
  
      return newData;
    })
    .catch((err) => {
      console.error('Error: error writing to file', err)
    })
  // const results = [...currData, ...(writeFileResults || [])]

  // console.log('*** currTable new data\n', results)

  // try {
  //   fs.writeFileSync(filePath, JSON.stringify(results, null, 2))

  //   if (!newData.length || !results.length) {
  //     console.error('Error: Nothing written to file.')
  //     return;
  //   }

  //   return results.splice(-newData.length);
  // } catch (err) {
  //   console.error('Error: error writing to file', err)
  // }
}
