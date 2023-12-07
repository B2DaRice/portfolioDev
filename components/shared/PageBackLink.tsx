import Link from 'next/link'

export default function PageBackLink() {
  return (
    <Link
      href='/'
      className='bg-btn-background hover:bg-btn-background-hover group absolute left-4 top-4 flex items-center rounded-md px-0 py-2 text-sm text-foreground no-underline sm:left-8 sm:top-8 sm:px-4'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='mr-2 h-6 w-6 transition-transform group-hover:-translate-x-1'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
        />
      </svg>{' '}
      Back
    </Link>
  )
}
