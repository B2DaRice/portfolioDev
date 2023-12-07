// import { createServerSupabaseClient } from '@/utils/supabase/server'


export const initialProfile = async () => {
  // const supabase = createServerSupabaseClient()

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser()

  // if (!user) {
    //
  // }

  const res = await fetch(
    `${process.env.API_BASE_URL}/users/${{ user_metadata: { username: '1-test' } }?.user_metadata?.username}`,
    {
      headers: {
        'x-api-key': `${process.env.API_KEY}`,
      },
    }
  )

  if (res) {
    return res
  }
}
