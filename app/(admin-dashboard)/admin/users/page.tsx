"use client"

import { ListPage, PageActionType } from '@/components/dashboard/ListPage'
import { usersTableColumns, filterConfig } from '@/data/users/tableConfigs'
import { UserDataType } from '@/types/User'
import { useState } from 'react'

const UsersPage = () => {
  const [users, setUsers] = useState<UserDataType[]>([])

  const pageActionsConfig: PageActionType[] = []

  return (
    <ListPage
      title='All Users'
      subtitle='Click a User to view more information'
      pageActions={pageActionsConfig}
      filterConfig={filterConfig}
      columns={usersTableColumns}
      dataApiPath='/api/users'
      singlePagePath='admin/user/'
      data={users}
      setData={setUsers}
      csvExportUrl='/api/csv?tableId=users'
    />
  )
}

export default UsersPage
