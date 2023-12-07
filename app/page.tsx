// import { createServerSupabaseClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Developer Portfolio',
}

export default async function RedirectPage() {
  // const supabase = createServerSupabaseClient()
  // const { data } = await supabase.auth.getSession()

  {
    /* TODO: Check role and put them on /admin or /host */
  }
  // if (data?.session) {
    redirect('/admin')
  // } else {
  //   redirect('/login')
  // }
}
