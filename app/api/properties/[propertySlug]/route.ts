// import { createServerSupabaseClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { getInitTableData } from '../../utils/serverUtils'
import { TABLE_NAMES } from '../../types/database'

export async function generateStaticParams() {
  const properties: { id: string }[] = await getInitTableData(TABLE_NAMES.PROPERTIES)
 
  return properties.map(({ id }) => ({
    slug: id,
  }))
}

export async function GET(request: NextRequest, { params }: { params: { propertySlug?: string } }) {
  try {
    const { searchParams } = new URL(request.url)
    console.log('*** requestUrl [propertySlug]:\n', params.propertySlug)
    console.log('*** requestUrl params:\n', searchParams)
    
    // get property data using params.propertySlug

    return NextResponse.json({ message: '-- Return property data --' })

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
