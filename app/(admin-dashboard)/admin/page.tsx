"use client"

import { useEffect } from 'react'

export default function AdminDashboardPage() {
  useEffect(() => {
    fetch('/api/utils', {
      method: 'GET'
    })
  }, [])
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-row gap-5 '>Admin Dashboard</div>
    </div>
  )
}
