// import { createServerSupabaseClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

import Login from '@/components/auth/Login'

export const metadata: Metadata = {
  title: "Log In | Awesome Web App",
}

export default async function LoginPage() {
  // const supabase = createServerSupabaseClient()
  // const { data: { session }} = await supabase.auth.getSession()

  // if (session) {
    // redirect('/')
  // }

  return <Login />
}
