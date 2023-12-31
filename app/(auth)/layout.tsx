import '../globals.css'

export const metadata = {
  title: 'Developer Portfolio',
  description: 'Example web application in Next.js',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className='flex h-screen w-screen justify-center pt-20 sm:items-center sm:pt-0 overflow-hidden'>
      {children}
    </main>
  )
}
