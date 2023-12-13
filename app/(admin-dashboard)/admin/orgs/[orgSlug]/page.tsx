export default function AdminOrganizationPage() {
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-row gap-5 '>A admin can CRUD an organization</div>
    </div>
  )
}

export const generateStaticParams = async () => {
  const orgs: { id: string }[] = [{ id: 'testID-1' }]
 
  return orgs.map(({ id }) => ({
    slug: id,
  }))
}
