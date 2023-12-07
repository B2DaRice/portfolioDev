type Params = {
  params: {
    propertySlug: string
  }
}

export default async function HostPropertyPage({ params: { propertySlug } } : Params) {
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-row gap-5 '>Property ID: {propertySlug} </div>
    </div>
  )
}
