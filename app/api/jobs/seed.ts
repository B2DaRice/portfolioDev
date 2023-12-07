import fs from "fs"
import path from "path"
import { faker } from "@faker-js/faker"
import { jobStatuses, jobTypes } from "@/data/jobs/dropdownValues"

const propertyWords = [ 'Home', 'Apartment', 'Office' ]

export const createTestJobData = async (numOfRecords = 10) => {
  const jobs = Array.from({ length: numOfRecords }, () => {
    const createdAt = faker.date.between({ from: '2022-12-31', to: new Date().toLocaleString()})
    const updatedAt = faker.date.between({ from: createdAt, to: new Date().toLocaleString()})
    const cleaningDate = faker.date.between({ from: createdAt, to: '2024-03-01'})

    const fakeDataConfig = [
      
    ]

    return ({
      id: `${faker.string.alpha({ length: 3 }).toUpperCase()}-${faker.number.int({ min: 1000, max: 9999 })}`,
      title: `${faker.hacker.adjective().replace(/^./, (letter: any) => letter.toUpperCase())} ${faker.hacker.noun().replace(/^./, (letter: any) => letter.toUpperCase())}`,
      estimatedLength: faker.number.int({ min: 1, max: 5 }),
      address: faker.location.streetAddress(),
      location: `${faker.location.city()}, ${faker.location.state({ abbreviated: true })} ${faker.location.zipCode()}`,
      jobType: faker.helpers.arrayElement(jobTypes).value,
      organizationName: `${faker.hacker.adjective().replace(/^./, (letter: any) => letter.toUpperCase())} ${faker.hacker.noun().replace(/^./, (letter: any) => letter.toUpperCase())}`,
      priority: faker.number.int({ min: 1, max: 10 }),
      propertyName: `${faker.hacker.adjective().replace(/^./, (letter: any) => letter.toUpperCase())} ${faker.helpers.arrayElement(propertyWords)}`,
      startDate: cleaningDate.toLocaleString(),
      status: faker.helpers.arrayElement(jobStatuses).value,
      createdAt: createdAt.toLocaleString(),
      updatedAt: updatedAt.toLocaleString(),
      cleaningDate: cleaningDate.toLocaleString(),
      cleanerAssigned: faker.person.fullName(),
      totalBilled: faker.number.float({ min: 100, max: 5000 }),
    })
  })

  await fs.writeFileSync(
    path.join(process.cwd(), "data/testData/jobs.json"),
    JSON.stringify(jobs, null, 2)
  )

  console.log("✅ Jobs data generated.")
}