"use client"

import { TableColumns, FilterConfigType } from '@/components/table/DataTable'
import { DataTableRowActions } from '@/components/table/DataTableRowActions'

export const filterConfig: FilterConfigType[] = [
  {
    accessorKey: 'name',
    type: 'text',
    label: 'Search by  name...'
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
    header: 'Contact Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableSorting: false,
  },

]