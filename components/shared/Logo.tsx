import React from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface LogoProps {
  containerClasses?: string
  imgClasses?: string
  height?: number
  src?: string
}

export default function Logo({
  containerClasses = '',
  imgClasses = '',
  height = 40,
  src = ''
}: LogoProps) {
  return (
    <Link href='/'>
      <div className={containerClasses} style={{ height: `${height}px` }}>

        {!src ? (
          <div className='flex flex-row h-full items-end' style={{ fontFamily: 'NoName' }}>
            <img src={'/images/b-key.png'} alt='B Key' className='w-auto h-full' />
            <img src={'/images/g-key.png'} alt='G Key' className='w-auto h-full' />
            <span className="pl-1 pb-1 text-accent"> DeveLopment </span>
          </div>
        ) : (
          <img src={src} alt='Logo' className={[imgClasses, 'w-auto h-full'].join(' ')} />
        )}

      </div>
    </Link>
  )
}
