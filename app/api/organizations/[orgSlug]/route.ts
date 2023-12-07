// import { createServerSupabaseClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { orgSlug?: string } }) {
  try {
    const { searchParams } = new URL(request.url)
    console.log('*** requestUrl [orgSlug]:\n', params.orgSlug)
    console.log('*** requestUrl params:\n', searchParams)

    // get organization data using params.orgSlug

    return NextResponse.json({ message: '-- Return organization data --' })

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}