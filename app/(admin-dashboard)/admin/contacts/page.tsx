"use client"

import { ListPage, PageActionType } from '@/components/ListPage'
import { useState } from 'react'
import { tableColumns, filterConfig } from './tableConfigs'
import { TypeFromSchema } from '@/app/api/contacts/schemas'

const AdminContactsPage = () => {
  const [contacts, setContacts] = useState<TypeFromSchema[]>([])

  const pageActionsConfig: PageActionType[] = []

  return (
    <ListPage
      title='All Contacts'
      subtitle='Click an Contact to view more information'
      pageActions={pageActionsConfig}
      filterConfig={filterConfig}
      columns={tableColumns}
      dataApiPath='/api/contacts'
      singlePagePath='admin/contacts/'
      data={contacts}
      setData={setContacts}
      csvExportUrl='/api/csv?tableId=orgs'
    />
  )
}

export default AdminContactsPage