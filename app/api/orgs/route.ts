// import { createServerSupabaseClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from "path"
import { z } from 'zod'
import { schema, TypeFromSchema } from './schemas'
import { getInitTableData, getJSONContents } from '../utils/serverUtils'
import { createTestTableData } from '../utils/fakerUtils'
import { TABLE_NAMES } from '@/app/api/types/database'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    console.log('*** requestUrl params:\n', searchParams)
    
    // let orgs = await getJSONContents(path.join(process.cwd(), "data/testData/orgs.json"))
    // if (!orgs.length) {
    //   await createTestDataTable(TABLE_NAMES.orgs, 10, true)
    //   orgs = await getJSONContents(path.join(process.cwd(), "data/testData/organizations.json"))
    // }
    const orgs: TypeFromSchema[] = await getInitTableData(TABLE_NAMES.ORGS)
    console.log('*** orgs from getInitTableData\n', orgs?.length)
    // console.log('*** parsing orgs => ', z.array(CurrSchema).parse(orgs))

    return !orgs
      ? NextResponse.json({ error: 'There was an error retrieving data.' }, { status: 500 })
      : NextResponse.json({ data: orgs })

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
