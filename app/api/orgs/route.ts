// import { createServerSupabaseClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from "path"
import { z } from 'zod'
import { schema as CurrSchema, TypeFromSchema } from './schemas'
import { getInitTableData, getJSONContents } from '../utils/serverUtils'
import { createTestDataTable } from '../utils/fakerUtils'
import { TABLE_NAMES } from '@/data/testData'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    console.log('*** requestUrl params:\n', searchParams)
    
    // let orgs = await getJSONContents(path.join(process.cwd(), "data/testData/orgs.json"))
    // if (!orgs.length) {
    //   await createTestDataTable(TABLE_NAMES.orgs, 10, true)
    //   orgs = await getJSONContents(path.join(process.cwd(), "data/testData/organizations.json"))
    // }
    const orgs: TypeFromSchema[] = await getInitTableData(TABLE_NAMES.orgs) || []

    return !z.array(CurrSchema).parse(orgs)
      ? NextResponse.json({ error: 'There was an error retrieving data.' }, { status: 500 })
      : NextResponse.json({ data: orgs })

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
