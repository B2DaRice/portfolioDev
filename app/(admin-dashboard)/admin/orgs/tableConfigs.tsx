"use client"

import { TableColumns, FilterConfigType } from '@/components/table/DataTable'
import { DataTableRowActions } from '@/components/table/DataTableRowActions'
import { Button } from '@/components/ui/button'

export const filterConfig: FilterConfigType[] = [
  {
    accessorKey: 'name',
    type: 'text',
    label: 'Org Search'
  },
]


export const tableColumns: TableColumns = [
  {
    accessorKey: 'id',
    header: 'ID',
    defaultHidden: true
  },
  {
    accessorKey: 'name',
    header: 'Organization Name',
  },
  {
    accessorKey: 'website',
    header: 'Website',
  },
  {
    accessorKey: 'billingAddressId',
    header: 'Billing Address',
  },

  {
    accessorKey: 'contactIds',
    header: 'Contacts',
    cell: ({ getValue }) => (
      <div className='flex flex-col gap-1 overflow-auto' style={{ maxHeight: '75px' }}>
        {
          getValue().map((id: string, index: number) => (
            <span
              key={`property-${index}`}
              className='mr-2 whitespace-nowrap p-1 opacity-60 border rounded-sm text-xs cursor-pointer hover:opacity-100'
              onClick={(event) => {
                event.stopPropagation()
                console.log(`Id clicked: ${id}`)
              }}
            >
              {id}
            </span>
          ))
        }
      </div>
    )
  },
  {
    accessorKey: 'propertyIds',
    header: 'Properties',
    // cell: ({ getValue }) => (
    //   <div className='flex flex-col gap-1 overflow-auto' style={{ maxHeight: '75px' }}>
    //     {
    //       getValue().map((id: string, index: number) => (
    //         <span
    //           key={`property-${index}`}
    //           className='mr-2 whitespace-nowrap p-1 opacity-60 border rounded-sm text-xs cursor-pointer hover:opacity-100'
    //           onClick={(event) => {
    //             event.stopPropagation()
    //             console.log(`Id clicked: ${id}`)
    //           }}
    //         >
    //           {id}
    //         </span>
    //       ))
    //     }
    //   </div>
    // )
  },
  {
    accessorKey: 'integrationIds',
    header: 'Integrations',
    // cell: ({ getValue }) => (
    //   <div className='flex flex-col gap-1 overflow-auto' style={{ maxHeight: '75px' }}>
    //     {
    //       getValue().map((id: string, index: number) => (
    //         <span
    //           key={`property-${index}`}
    //           className='mr-2 whitespace-nowrap p-1 opacity-60 border rounded-sm text-xs cursor-pointer hover:opacity-100'
    //           onClick={(event) => {
    //             event.stopPropagation()
    //             console.log(`Id clicked: ${id}`)
    //           }}
    //         >
    //           {id}
    //         </span>
    //       ))
    //     }
    //   </div>
    // )
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableSorting: false,
  },

]