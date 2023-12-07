'use client'

import { useContext, useState } from 'react'
import Link from 'next/link'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { GlobalContext } from '@/data/globalContext'
import { Switch } from '@/components/ui/switch'

interface TopNavProps {
  role: any
}

export function TopNav({ role }: TopNavProps) {
  const { darkMode, updateState } = useContext(GlobalContext)

  return (
    <div className='flex flex-row justify-end'>
      <div className='flex-1 px-3'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='h-6 w-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5'
          />
        </svg>
      </div>
      <div className='flex-1'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
              />
            </svg>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent className='w-56'>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <span>Payouts</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Account & Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Personal Info</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Document Uploads</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Account Security</span>
              </DropdownMenuItem>

              <DropdownMenuItem className='flex flex-row gap-3 pt-5'>
                <span>Dark Mode</span>
                <Switch
                  checked={darkMode}
                  onCheckedChange={(value) => {
                    console.log('*** value\n', value)
                    updateState({ darkMode: !!value })
                  }}
                />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
          
        </DropdownMenu>
      </div>
    </div>
  )
}
