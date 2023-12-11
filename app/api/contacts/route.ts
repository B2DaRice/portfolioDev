// import { createServerSupabaseClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { schema, TypeFromSchema } from './schemas'
import { getInitTableData } from '../utils/serverUtils'
import { TABLE_NAMES } from '@/app/api/types/database'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    console.log('*** requestUrl params:\n', searchParams)
    
    const contacts: TypeFromSchema[] = await getInitTableData(TABLE_NAMES.CONTACTS)
    console.log('*** contacts from getInitTableData\n', contacts?.length)
    // console.log('*** parsing orgs => ', z.array(CurrSchema).parse(orgs))

    return !contacts
      ? NextResponse.json({ error: 'There was an error retrieving data.' }, { status: 500 })
      : NextResponse.json({ data: contacts })

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
