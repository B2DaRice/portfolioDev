import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    console.log('*** requestUrl params:\n', searchParams)

    // Send api call to start downloading the csv file

    return NextResponse.json({ message: 'CSV file is being downloaded.' })

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}