"use client"

import { TableColumns, FilterConfigType } from '@/components/table/DataTable'
import { DataTableRowActions } from '@/components/table/DataTableRowActions'
import { propertyStatuses } from '@/data/properties/dropdownValues'
import { formatCurrency } from '@/lib/utils'

export const filterConfig: FilterConfigType[] = [
  {
    accessorKey: 'addressId',
    type: 'text',
    label: 'Address Search'
  },
  // {
  //   accessorKey: 'status',
  //   type: 'select',
  //   label: 'Status',
  //   options: propertyStatuses
  // },
]


export const propertiesTableColumns: TableColumns = [
  {
    accessorKey: 'id',
    header: 'ID',
    defaultHidden: true
  },
  {
    accessorKey: 'numJobs',
    header: '# of Jobs',
  },
  {
    accessorKey: 'cleaningCost',
    header: 'Cleaning Cost',
    cell: ({ getValue }) => formatCurrency.format(getValue()),
  },
  {
    accessorKey: 'addressId',
    header: 'Address',
  },
  {
    accessorKey: 'orgId',
    header: 'Org Name',
  },
  {
    accessorKey: 'contactIds',
    header: 'Contacts',
    cell: ({ getValue }) => {
      const currValue = getValue()

      const Pill = ({ value, id }: { value: any, id: string }) => (
        <span
          key={`property-${id}`}
          className='mr-2 whitespace-nowrap p-1 opacity-60 border rounded-sm text-xs cursor-pointer hover:opacity-100'
          onClick={(event) => {
            event.stopPropagation()
            console.log(`Id clicked: ${id}`)
          }}
        >
          {id}
        </span>
      )
      
      return (
        <div className='flex flex-col gap-1 overflow-auto' style={{ maxHeight: '75px' }}>
          { Array.isArray(currValue) ? (
            currValue.map((id: string) => (
              <Pill value={id} id={id} />
            ))
          ) : (
            <Pill value={currValue} id={currValue} />
          )}
        </div>
      )
    }
  },
  // {
  //   accessorKey: 'status',
  //   header: 'Status',
  //   cell: ({ getValue }) => {
  //     return propertyStatuses.find(({ value }) => value === getValue())?.label || getValue()
  //   },
  //   filterFn: (row, id, value: string) => {
  //     return value.includes(row.getValue(id))
  //   },
  // },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableSorting: false,
  },

]