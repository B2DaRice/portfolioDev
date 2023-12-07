// import { createServerSupabaseClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import path from "path"
import { createTestUsersData } from './seed'
import { z } from 'zod'
import { usersTableSchema } from './schema'
import { getJSONContents } from '../utils/serverUtils'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    console.log('*** requestUrl params:\n', searchParams)
    
    let users = await getJSONContents(path.join(process.cwd(), "data/testData/users.json"))
    if (!users.length) {
      await createTestUsersData(100)
      users = await getJSONContents(path.join(process.cwd(), "data/testData/users.json"))
    }

    return !z.array(usersTableSchema).parse(users)
      ? NextResponse.json({ error: 'There was an error retrieving data.' }, { status: 500 })
      : NextResponse.json({ data: users })

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
