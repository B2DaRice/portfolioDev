// import { createServerSupabaseClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const password = String(formData.get('password'))
  // const supabase = createServerSupabaseClient()

  // const { error } = await supabase.auth.updateUser({ password })

  // if (error) {
  //   return NextResponse.redirect(
  //     `${requestUrl.origin}/update-password?error=Could not update password`,
  //     {
  //       status: 301,
  //     }
  //   )
  // }

  return NextResponse.redirect(requestUrl.origin, {
    status: 301,
  })
}
