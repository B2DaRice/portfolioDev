// import { createServerSupabaseClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = String(formData.get('email'))
  // const supabase = createServerSupabaseClient()

  // const { error } = await await supabase.auth.resetPasswordForEmail(email, {
  //   redirectTo: 'http://localhost:3000/api/auth/auth-update-password',
  // })

  // if (error) {
  //   return NextResponse.redirect(
  //     `${requestUrl.origin}/request-password-reset?error=Could not reset password`,
  //     {
  //       status: 301,
  //     }
  //   )
  // }

  return NextResponse.redirect(requestUrl.origin, {
    status: 301,
  })
}
