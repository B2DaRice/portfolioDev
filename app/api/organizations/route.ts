// import { createServerSupabaseClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import path from "path"
import { createTestOrgsData } from './seed'
import { z } from 'zod'
import { organizationsTableSchema } from './schema'
import { getJSONContents } from '../utils/serverUtils'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    console.log('*** requestUrl params:\n', searchParams)
    
    let orgs = await getJSONContents(path.join(process.cwd(), "data/testData/organizations.json"))
    if (!orgs.length) {
      await createTestOrgsData(100)
      orgs = await getJSONContents(path.join(process.cwd(), "data/testData/organizations.json"))
    }

    return !z.array(organizationsTableSchema).parse(orgs)
      ? NextResponse.json({ error: 'There was an error retrieving data.' }, { status: 500 })
      : NextResponse.json({ data: orgs })

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
