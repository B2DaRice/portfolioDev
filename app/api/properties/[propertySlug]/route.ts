// import { createServerSupabaseClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

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
