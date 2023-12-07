// import { createServerSupabaseClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import path from "path"
import { createTestJobData } from './seed'
import { z } from 'zod'
import { jobSchema } from './schema'
import { getJSONContents } from '../utils/serverUtils'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    console.log('*** requestUrl params:\n', searchParams)

    let jobs = await getJSONContents(path.join(process.cwd(), "data/testData/jobs.json"))
    if (!jobs.length) {
      await createTestJobData(100)
      jobs = await getJSONContents(path.join(process.cwd(), "data/testData/jobs.json"))
    }

    return !z.array(jobSchema).parse(jobs)
      ? NextResponse.json({ error: 'There was an error retrieving data.' }, { status: 500 })
      : NextResponse.json({ data: jobs })

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
