"use client"

import { ListPage, PageActionType } from '@/components/ListPage'
import { useState } from 'react'
import { tableColumns, filterConfig } from './tableConfigs'
import { TypeFromSchema } from '@/app/api/addresses/schemas'

const AdminAddressesPage = () => {
  const [addresses, setAddresses] = useState<TypeFromSchema[]>([])

  const pageActionsConfig: PageActionType[] = []

  return (
    <ListPage
      title='All Addresses'
      subtitle='Click an Address to view more information'
      pageActions={pageActionsConfig}
      filterConfig={filterConfig}
      columns={tableColumns}
      dataApiPath='/api/addresses'
      singlePagePath='admin/addresses/'
      data={addresses}
      setData={setAddresses}
      csvExportUrl='/api/csv?tableId=orgs'
    />
  )
}

export default AdminAddressesPage