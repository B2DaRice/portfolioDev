// import { createServerSupabaseClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { schema, TypeFromSchema } from './schemas'
import { getInitTableData } from '../utils/serverUtils'
import { TABLE_NAMES } from '@/app/api/types/database'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    console.log('*** requestUrl params:\n', searchParams)
    
    const addresses: TypeFromSchema[] = await getInitTableData(TABLE_NAMES.ADDRESSES)
    console.log('*** addresses from getInitTableData\n', addresses?.length)
    // console.log('*** parsing orgs => ', z.array(CurrSchema).parse(orgs))

    return !addresses
      ? NextResponse.json({ error: 'There was an error retrieving data.' }, { status: 500 })
      : NextResponse.json({ data: addresses })

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
