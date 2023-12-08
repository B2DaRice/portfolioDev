"use client"

import { ListPage, PageActionType } from '@/components/ListPage'
// import { organizationsTableColumns, filterConfig } from '@/data/organizations/tableConfigs'
// import { OrganizationDataType } from '@/types/Organizations'
import { useState } from 'react'
import { orgsTableColumns, filterConfig } from './tableConfigs'
import { TypeFromSchema } from '@/app/api/orgs/schemas'

const AdminOrgsPage = () => {
  const [orgs, setOrgs] = useState<TypeFromSchema[]>([])

  const pageActionsConfig: PageActionType[] = []

  return (
    <ListPage
      title='All Organizations'
      subtitle='Click an organization to view more information'
      pageActions={pageActionsConfig}
      filterConfig={filterConfig}
      columns={orgsTableColumns}
      dataApiPath='/api/orgs'
      singlePagePath='admin/orgs/'
      data={orgs}
      setData={setOrgs}
      csvExportUrl='/api/csv?tableId=orgs'
    />
  )
}

export default AdminOrgsPage