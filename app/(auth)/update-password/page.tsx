// import { createServerSupabaseClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

import UpdatePassword from '@/components/auth/UpdatePassword'

export const metadata: Metadata = {
  title: 'Update password | Awesome Web App',
}

export default async function UpdatePasswordPage() {
  // const supabase = createServerSupabaseClient()
  // const { data: { session }} = await supabase.auth.getSession()

  // if (!session) {
  //   redirect('/login')
  // }

  return <UpdatePassword />
}
