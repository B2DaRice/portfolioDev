import fs from "fs"
import path from "path"
import { faker } from "@faker-js/faker"
import { propertyStatuses } from "@/data/properties/dropdownValues"

const propertyWords = [ 'Home', 'Apartment', 'Office' ]

export const createTestPropertiesData = async (numOfRecords = 10) => {
  const properties = Array.from({ length: numOfRecords }, () => {
    return ({
      id: `${faker.string.alpha({ length: 3 }).toUpperCase()}-${faker.number.int({ min: 1000, max: 9999 })}`,
      organizationName: `${faker.hacker.adjective().replace(/^./, (letter: any) => letter.toUpperCase())} ${faker.hacker.noun().replace(/^./, (letter: any) => letter.toUpperCase())}`,
      propertyName: `${faker.hacker.adjective().replace(/^./, (letter: any) => letter.toUpperCase())} ${faker.helpers.arrayElement(propertyWords)}`,
      jobCount: faker.number.int({ min: 1, max: 10 }),
      status: faker.helpers.arrayElement(propertyStatuses).value,
      cleaningCost: faker.number.float({ min: 100, max: 5000 }),
    })
  })

  await fs.writeFileSync(
    path.join(process.cwd(), "data/testData/properties.json"),
    JSON.stringify(properties, null, 2)
  )

  console.log("✅ Properties data generated.")
}