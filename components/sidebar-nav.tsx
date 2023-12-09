'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  BuildingIcon,
  CalendarIcon,
  ClipboardIcon,
  DollarSignCircleIcon,
  GraphIcon,
  HomeIcon,
  InboxIcon,
  MaintenanceIcon,
  UserGroup2Icon,
  UserIcon,
} from '@/public/icons'

interface SidebarProps {
  role: any
  className: any
  selectedRoute?: string
  setSelectedRoute: (route: string) => void
}

export function SidebarNav({
  role,
  className,
  selectedRoute,
  setSelectedRoute,
}: SidebarProps) {
  console.log('role', role)
  const [isHost, setIsHost] = useState(role === 'host')
  const [isCleaner, setIsCleaner] = useState(role === 'cleaner')
  const [isAdmin, setIsAdmin] = useState(role === 'admin')

  const routes = [
    {
      name: 'Dashboard',
      icon: <HomeIcon />,
      route: 'dashboard',
    },
    {
      name: 'Orgs',
      icon: <ClipboardIcon />,
      route: 'orgs',
    },
  ]

  return (
    <div className={['h-full pb-12', className].join(' ')}>
      <div className='flex h-full flex-col justify-between'>
        <div className='px-3 py-2'>
          <h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>
            {role}
          </h2>
          <div className='space-y-1'>
            {
              routes.map(({ name, icon, route }) => (
                <Button
                  key={name}
                  variant={selectedRoute === route ? 'secondary' : 'ghost'}
                  className='w-full justify-start'
                  onClick={() => setSelectedRoute(route)}
                >
                  {icon}
                  {name}
                </Button>
              ))
            }
            {/* <Button
              variant={selectedRoute === 'dashboard' ? 'secondary' : 'ghost'}
              className='w-full justify-start'
              onClick={() => setSelectedRoute('dashboard')}
            >
              <HomeIcon />
              Dashboard
            </Button>
            <Button
              variant={selectedRoute === 'jobs' ? 'secondary' : 'ghost'}
              className='w-full justify-start'
              onClick={() => setSelectedRoute('jobs')}
            >
              <ClipboardIcon />
              Jobs
            </Button>
            <Button
              variant='ghost'
              className={isCleaner ? 'hidden' : 'w-full justify-start'}
            >
              <BuildingIcon />
              Properties
            </Button>
            <Button
              variant='ghost'
              className={isCleaner ? 'hidden' : 'w-full justify-start'}
            >
              <CalendarIcon />
              Schedule
            </Button>
            <Button
              variant='ghost'
              className={!isHost ? 'hidden' : 'w-full justify-start'}
            >
              <InboxIcon />
              Inbox
            </Button>
            <Button
              variant='ghost'
              className={!isHost ? 'hidden' : 'w-full justify-start'}
            >
              <UserIcon />
              Account
            </Button>
            <Button
              variant='ghost'
              className={!isAdmin ? 'hidden' : 'w-full justify-start'}
            >
              <UserGroup2Icon />
              Host Management
            </Button>
            <Button
              variant='ghost'
              className={!isAdmin ? 'hidden' : 'w-full justify-start'}
            >
              <MaintenanceIcon />
              Housekeeper Management
            </Button>
            <Button
              variant='ghost'
              className={!isAdmin ? 'hidden' : 'w-full justify-start'}
            >
              <DollarSignCircleIcon />
              Payment Management
            </Button>
            <Button
              variant='ghost'
              className={!isAdmin ? 'hidden' : 'w-full justify-start'}
            >
              <GraphIcon />
              Reporting
            </Button> */}
          </div>
        </div>
        <div className='px-3 py-2'>
          <Button variant='ghost' className='w-full justify-start'>
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
