// import { createServerSupabaseClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

import RequestPasswordResetForm from '@/components/auth/RequestPasswordReset'

export const metadata: Metadata = {
  title: 'Request Password Reset | Awesome Web App',
}

export default async function RequestPasswordResetPage() {
  // const supabase = createServerSupabaseClient()
  // const { data: { session }} = await supabase.auth.getSession()

  // if (session) {
  //   redirect('/')
  // }

  return <RequestPasswordResetForm />
}
