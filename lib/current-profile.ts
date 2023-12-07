// import { createServerSupabaseClient } from '@/utils/supabase/server'

export const currentProfile = async () => {
  // const supabase = createServerSupabaseClient()


  // const {
  //   data: { user },
  // } = await supabase.auth.getUser()

  // if (!user) {
  //   return null
  // }

  const res = await fetch(
    `${process.env.API_BASE_URL}/users/${{ user_metadata: { username: '1-test' } }?.user_metadata?.username}`,
    {
      headers: {
        'x-api-key': `${process.env.API_KEY}`,
      },
    }
  )

  const profile = res.json()

  return profile
}
