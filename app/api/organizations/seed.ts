import fs from "fs"
import path from "path"
import { faker } from "@faker-js/faker"

const propertyWords = [ 'Home', 'Apartment', 'Office' ]
const integrationPostfixes = [ '.js', '.com', '.io' ]

export const createTestOrgsData = async (numOfRecords = 10) => {
  const addProperties = (numOfProperties = 3) => {
    let result = []
    for (let i = 0; i < numOfProperties; i++) {
      result.push(`${faker.hacker.adjective().replace(/^./, (letter: any) => letter.toUpperCase())} ${faker.helpers.arrayElement(propertyWords)}`)
    }
    return result
  }

  const addIntegrations = (numOfIntegrations = 2) => {
    let result = []
    for (let i = 0; i < numOfIntegrations; i++) {
      result.push(`${faker.hacker.adjective().split(' ').join('_')}${faker.helpers.arrayElement(integrationPostfixes)}`)
    }
    return result
  }

  const users = Array.from({ length: numOfRecords }, () => {
    return ({
      id: `${faker.string.alpha({ length: 3 }).toUpperCase()}-${faker.number.int({ min: 1000, max: 9999 })}`,
      name: `${faker.hacker.adjective().replace(/^./, (letter: any) => letter.toUpperCase())} ${faker.hacker.noun().replace(/^./, (letter: any) => letter.toUpperCase())}`,
      contactEmail: faker.internet.email(),
      referredBy: faker.person.fullName(),
      properties: addProperties(faker.number.int({ min: 3, max: 7 })),
      integrations: addIntegrations(faker.number.int({ min: 1, max: 4 })),
    })
  })

  await fs.writeFileSync(
    path.join(process.cwd(), "data/testData/organizations.json"),
    JSON.stringify(users, null, 2)
  )

  console.log("✅ Organizations data generated.")
}