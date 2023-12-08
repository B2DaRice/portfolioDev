"use client"

import { ListPage, PageActionType } from '@/components/ListPage'
import { organizationsTableColumns, filterConfig } from '@/app/api/orgs/orgs-old-tableConfigs'
import { OrganizationDataType } from '@/types/Organizations'
import { useState } from 'react'

const AdminOrganizationsPage = () => {
  const [orgs, setOrgs] = useState<OrganizationDataType[]>([])

  const pageActionsConfig: PageActionType[] = []

  return (
    <ListPage
      title='All Organizations'
      subtitle='Click an organization to view more information'
      pageActions={pageActionsConfig}
      filterConfig={filterConfig}
      columns={organizationsTableColumns}
      dataApiPath='/api/organizations'
      singlePagePath='admin/organization/'
      data={orgs}
      setData={setOrgs}
      csvExportUrl='/api/csv?tableId=orgs'
    />
  )
}

export default AdminOrganizationsPage