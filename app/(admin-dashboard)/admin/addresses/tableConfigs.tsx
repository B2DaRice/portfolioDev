"use client"

import { TableColumns, FilterConfigType } from '@/components/table/DataTable'
import { DataTableRowActions } from '@/components/table/DataTableRowActions'
import states from '@/data/states'

export const filterConfig: FilterConfigType[] = [
  {
    accessorKey: 'street',
    type: 'text',
    label: 'Address Search'
  },
  {
    accessorKey: 'state',
    type: 'select',
    label: 'Filter By State',
    options: Object.entries(states).map(([abbr, name]) => ({
      label: abbr,
      value: abbr,
    })),
  }
]


export const tableColumns: TableColumns = [
  {
    accessorKey: 'id',
    header: 'ID',
    defaultHidden: true
  },
  {
    accessorKey: 'street',
    header: 'Street Address',
  },
  {
    accessorKey: 'city',
    header: 'City',
  },
  {
    accessorKey: 'state',
    header: 'State',
    filterFn: (row, id, value: string) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'zipCode',
    header: 'Zip Code',
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableSorting: false,
  },

]