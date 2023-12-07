import fs from "fs"
import path from "path"
import { faker } from "@faker-js/faker"
import { userStatuses } from "@/data/users/dropdownValues"

export const createTestUsersData = async (numOfRecords = 10) => {
  const users = Array.from({ length: numOfRecords }, () => {
    return ({
      id: `${faker.string.alpha({ length: 3 }).toUpperCase()}-${faker.number.int({ min: 1000, max: 9999 })}`,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number('###-###-####'),
      city: faker.location.city(),
      state: faker.location.state(),
      status: faker.helpers.arrayElement(userStatuses).value
    })
  })

  await fs.writeFileSync(
    path.join(process.cwd(), "data/testData/users.json"),
    JSON.stringify(users, null, 2)
  )

  console.log("✅ Users data generated.")
}