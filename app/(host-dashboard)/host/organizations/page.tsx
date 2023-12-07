"use client"

import { ListPage, PageActionType } from '@/components/dashboard/ListPage'
import { organizationsTableColumns, filterConfig } from '@/data/organizations/tableConfigs'
import { OrganizationDataType } from '@/types/Organizations'
import { useState } from 'react'

const HostOrganizationsPage = () => {
  const [orgs, setOrgs] = useState<OrganizationDataType[]>([])
  const currUserId = 'user-1'

  const pageActionsConfig: PageActionType[] = []

  return (
    <ListPage
      title='All Organizations'
      subtitle='Click an organization to view more information'
      pageActions={pageActionsConfig}
      filterConfig={filterConfig}
      columns={organizationsTableColumns}
      dataApiPath={`/api/organizations/byUser/${currUserId}`}
      singlePagePath='host/organizations/'
      data={orgs}
      setData={setOrgs}
      csvExportUrl='/api/csv?tableId=orgs'
    />
  )
}

export default HostOrganizationsPage