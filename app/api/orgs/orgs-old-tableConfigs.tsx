"use client"

import { TableColumns, FilterConfigType } from '@/components/table/DataTable'
import { DataTableRowActions } from '@/components/table/DataTableRowActions'
import { Button } from '@/components/ui/button'

export const filterConfig: FilterConfigType[] = [
  {
    accessorKey: 'name',
    type: 'text',
    label: 'Property Search'
  },
]


export const organizationsTableColumns: TableColumns = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Organization Name',
  },
  {
    accessorKey: 'contactEmail',
    header: 'Contact Email',
  },
  {
    accessorKey: 'referredBy',
    header: 'Referred By',
  },
  {
    accessorKey: 'properties',
    header: 'Properties',
    cell: ({ getValue }) => (
      <div className='flex flex-col gap-1 overflow-auto' style={{ maxHeight: '75px' }}>
        {
          getValue().map((property: string, index: number) => (
            <span
              key={`property-${index}`}
              className='mr-2 whitespace-nowrap p-1 opacity-60 border rounded-sm text-xs cursor-pointer hover:opacity-100'
              onClick={(event) => {
                event.stopPropagation()
                console.log(`Property clicked: ${property}`)
              }}
            >
              {property}
            </span>
          ))
        }
      </div>
    )
  },
  {
    accessorKey: 'integrations',
    header: 'Integrations',
    cell: ({ getValue }) => (
      <div className='flex flex-col gap-1 overflow-auto' style={{ maxHeight: '75px' }}>
        {
          getValue().map((integration: string, index: number) => (
            <span
              key={`property-${index}`}
              className='mr-2 whitespace-nowrap p-1 opacity-60 border rounded-sm text-xs cursor-pointer hover:opacity-100'
              onClick={(event) => {
                event.stopPropagation()
                console.log(`Integration clicked: ${integration}`)
              }}
            >
              {integration}
            </span>
          ))
        }
      </div>
    )
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableSorting: false,
  },

]