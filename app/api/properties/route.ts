// import { createServerSupabaseClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { schema, TypeFromSchema } from './schemas'
import { getInitTableData } from '../utils/serverUtils'
import { TABLE_NAMES } from '@/app/api/types/database'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    console.log('*** requestUrl params:\n', searchParams)
    
    const properties: TypeFromSchema[] = await getInitTableData(TABLE_NAMES.PROPERTIES)

    return !properties
      ? NextResponse.json({ error: 'There was an error retrieving data.' }, { status: 500 })
      : NextResponse.json({ data: properties })

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
