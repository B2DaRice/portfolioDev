export default function AdminPropertiesPage() {
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-row gap-5 '>A admin can CRUD a property</div>
    </div>
  )
}

export const generateStaticParams = async () => {
  const properties: { id: string }[] = [{ id: 'testID-1' }]
 
  return properties.map(({ id }) => ({
    slug: id,
  }))
}
