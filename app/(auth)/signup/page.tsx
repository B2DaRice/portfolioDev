// import { createServerSupabaseClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

import Signup from '@/components/auth/Signup'

export const metadata: Metadata = {
  title: 'Sign Up | Awesome Web App',
}

export default async function SignUpPage() {
  // const supabase = createServerSupabaseClient()
  // const { data: { session }} = await supabase.auth.getSession()

  // if (session) {
  //   redirect('/')
  // }

  return <Signup />
}
