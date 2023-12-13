// import { createServerSupabaseClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // const requestUrl = new URL(request.url)
  const requestUrl = new URL('http://localhost')
  const code = requestUrl.searchParams.get('code')

  if (code) {
    // const supabase = createServerSupabaseClient()
    // await supabase.auth.exchangeCodeForSession(code)

    return NextResponse.redirect(`${requestUrl.origin}/update-password`)
  }

  // eslint-disable-next-line no-console
  console.error('ERROR: Invalid auth code or no auth code found')

  return NextResponse.redirect(`${requestUrl.origin}/sign-in`)
}
