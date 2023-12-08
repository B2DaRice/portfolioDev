"use client"

import { TableColumns, FilterConfigType } from '@/components/table/DataTable'
import { DataTableRowActions } from '@/components/table/DataTableRowActions'
import { userStatuses } from './dropdownValues'

export const filterConfig: FilterConfigType[] = [
  {
    accessorKey: 'name',
    type: 'text',
    label: 'User Search'
  },
  {
    accessorKey: 'status',
    type: 'select',
    label: 'Status',
    options: userStatuses
  },
]


export const usersTableColumns: TableColumns = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Full Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone',
    header: 'Phone #',
  },
  {
    accessorKey: 'city',
    header: 'City',
  },
  {
    accessorKey: 'state',
    header: 'State',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      return userStatuses.find(({ value }) => value === getValue())?.label || getValue()
    },
    filterFn: (row, id, value: string) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableSorting: false,
  },

]