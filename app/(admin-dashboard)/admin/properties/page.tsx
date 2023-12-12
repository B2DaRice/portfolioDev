"use client"

import { propertiesTableColumns, filterConfig } from '@/app/(admin-dashboard)/admin/properties/tableConfigs'
import { PropertiesDataType } from '@/types/Properties'
import { useState } from 'react'
import { ListPage, PageActionType } from '@/components/ListPage'
import { PlusCircle } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const AdminPropertiesPage = () => {
  const [properties, setProperties] = useState<PropertiesDataType[]>([])

  const pageActionsConfig: PageActionType[] = [
    // {
    //   name: 'addProperty',
    //   trigger: {
    //     label: 'Add Property',
    //     icon: <PlusCircle />
    //   },
    //   content: {
    //     title: 'Add Property',
    //     subtitle: 'Enter the details of the job you want to add',
    //     body: (
    //       <div className="grid gap-8 py-4">
    //         <div className="grid grid-cols-4 items-center gap-4">
    //           <Label htmlFor="name" className="text-left">
    //             Property Name
    //           </Label>

    //           <Input id="propertyName" className="col-span-3" onChange={({ target }) => console.log('*** dialog input -\n', target.value)}/>
    //         </div>
    //       </div>
    //     ),
    //     submitLabel: 'Save Property',
    //     submitFn: () => console.log('*** dialog submit -\n', '--- Add server func for saving property ---')
    //   }
    // }
  ]

  return (
    <ListPage
      title='All Properties'
      subtitle='Click a property to view more information'
      pageActions={pageActionsConfig}
      filterConfig={filterConfig}
      columns={propertiesTableColumns}
      dataApiPath='/api/properties'
      singlePagePath='host/properties/'
      data={properties}
      setData={setProperties}
      csvExportUrl='/api/csv?tableId=properties'
    />
  )
}

export default AdminPropertiesPage
