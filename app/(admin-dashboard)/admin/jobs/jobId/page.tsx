export default function AdminJobPage() {
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-row gap-5 '>A admin can crud a job by ID</div>
    </div>
  )
}

export const generateStaticParams = async () => {
  const jobs: { id: string }[] = [{ id: 'testID-1' }]
 
  return jobs.map(({ id }) => ({
    slug: id,
  }))
}
