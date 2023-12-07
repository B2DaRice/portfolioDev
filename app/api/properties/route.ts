// import { createServerSupabaseClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import path from "path"
import { createTestPropertiesData } from './seed'
import { z } from 'zod'
import { propertiesTableSchema } from './schema'
import { getJSONContents } from '../utils/serverUtils'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    console.log('*** requestUrl params:\n', searchParams)
    
    let properties = await getJSONContents(path.join(process.cwd(), "data/testData/properties.json"))
    if (!properties.length) {
      await createTestPropertiesData(100)
      properties = await getJSONContents(path.join(process.cwd(), "data/testData/properties.json"))
    }

    return !z.array(propertiesTableSchema).parse(properties)
      ? NextResponse.json({ error: 'There was an error retrieving data.' }, { status: 500 })
      : NextResponse.json({ data: properties })

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
