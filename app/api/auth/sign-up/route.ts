// import { createServerSupabaseClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))
  const username = String(formData.get('username'))
  // const supabase = createServerSupabaseClient()

  // const { data, error } = await supabase.auth.signUp({
  //   email,
  //   password,
  //   options: {
  //     emailRedirectTo: `${requestUrl.origin}/api/auth/callback`,
  //     data: {
  //       username: username,
  //     },
  //   },
  // })

  // if (data) {
  //   fetch(`${process.env.API_BASE_URL}/v1/users`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'x-api-key': process.env.API_KEY as string,
  //     },
  //     body: JSON.stringify({
  //       id: data?.user?.id,
  //       username: username,
  //     }),
  //   })
  // }

  // if (error) {
  //   return NextResponse.redirect(
  //     `${requestUrl.origin}/signup?error=Could not create user`,
  //     {
  //       status: 301,
  //     }
  //   )
  // }

  return NextResponse.redirect(
    `${requestUrl.origin}/signup?message=Check email to continue sign in process`,
    {
      status: 301,
    }
  )
}
