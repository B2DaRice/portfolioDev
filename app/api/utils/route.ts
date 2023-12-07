// import { createServerSupabaseClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import path from "path"
import { z } from 'zod'
import { getJSONContents } from '../utils/serverUtils'
import { TABLE_NAMES } from '@/data/testData/defaultTableConfigs'
import { createTestDataTable } from './fakerUtils'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  console.log('*** requestUrl params:\n', searchParams)
  console.log('*** TABLE_NAMES:\n', TABLE_NAMES)
  
  await createTestDataTable(TABLE_NAMES.orgs, 10, true)
  
  return NextResponse.json({ message: '*** tables generated' })
}
