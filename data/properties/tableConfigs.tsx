"use client"

import { TableColumns, FilterConfigType } from '@/components/shared/table/DataTable'
import { DataTableRowActions } from '@/components/shared/table/DataTableRowActions'
import { propertyStatuses } from './dropdownValues'
import { formatCurrency } from '@/lib/utils'

export const filterConfig: FilterConfigType[] = [
  {
    accessorKey: 'propertyName',
    type: 'text',
    label: 'Property Search'
  },
  {
    accessorKey: 'status',
    type: 'select',
    label: 'Status',
    options: propertyStatuses
  },
]


export const propertiesTableColumns: TableColumns = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'jobCount',
    header: '# of Jobs',
  },
  {
    accessorKey: 'organizationName',
    header: 'Organization',
  },
  {
    accessorKey: 'propertyName',
    header: 'Property Name',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      return propertyStatuses.find(({ value }) => value === getValue())?.label || getValue()
    },
    filterFn: (row, id, value: string) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'cleaningCost',
    header: 'Cleaning Cost',
    cell: ({ getValue }) => formatCurrency.format(getValue()),
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableSorting: false,
  },

]