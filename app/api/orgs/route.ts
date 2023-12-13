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
    
    const orgs: TypeFromSchema[] = await getInitTableData(TABLE_NAMES.ORGS)

    return !orgs
      ? NextResponse.json({ error: 'There was an error retrieving data.' }, { status: 500 })
      : NextResponse.json({ data: orgs })

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
