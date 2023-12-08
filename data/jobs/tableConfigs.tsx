"use client"

import { TableColumns, FilterConfigType } from '@/components/table/DataTable'
import { PlusCircle } from 'lucide-react'
import { DataTableRowActions } from '@/components/table/DataTableRowActions'
import { formatCurrency } from '@/lib/utils'
import { jobStatuses, startDatePresets } from './dropdownValues'

export const filterConfig: FilterConfigType[] = [
  {
    accessorKey: 'organizationName',
    type: 'text',
    label: 'Search by Organization Name...'
  },
  {
    accessorKey: 'status',
    type: 'select',
    label: 'Status',
    options: jobStatuses,
    icon: <PlusCircle className='w-4 h-4'/>
  },
  {
    accessorKey: 'cleaningDate',
    type: 'date',
    label: 'Upcoming Jobs',
    dateConfig: {
      defaultRange: {
        from: new Date(),
        to: new Date(new Date().setDate(new Date().getDate() + 7))
      },
      presets: startDatePresets
    }
  }
]

export const jobTableColumns: TableColumns = [
  {
    accessorKey: 'id',
    header: 'Job ID',
    defaultHidden: true
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: ({ getValue }) => new Date(getValue()).toLocaleString().split(', ')[0],
    defaultHidden: true
  },
  {
    accessorKey: 'estimatedLength',
    header: 'Estimated Length',
    enableSorting: false,
    defaultHidden: true
  },
  {
    accessorKey: 'location',
    header: 'Location',
    defaultHidden: true
  },
  {
    accessorKey: 'jobType',
    header: 'Job Type',
    defaultHidden: true
  },
  {
    accessorKey: 'organizationName',
    header: 'Organization Name',
    defaultHidden: true
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    defaultHidden: true
  },
  {
    accessorKey: 'propertyName',
    header: 'Property Name',
  },
  {
    accessorKey: 'startDate',
    header: 'Start Time',
    cell: ({ getValue }) => new Date(getValue()).toLocaleString().split(', ')[1],
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      return jobStatuses.find(({ value }) => value === getValue())?.label || getValue()
    },
    filterFn: (row, id, value: string) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created Date',
    cell: ({ getValue }) => new Date(getValue()).toLocaleString().split(', ')[0],
    defaultHidden: true
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated Date',
    cell: ({ getValue }) => new Date(getValue()).toLocaleString().split(', ')[0],
    defaultHidden: true
  },
  {
    accessorKey: 'cleaningDate',
    header: 'Cleaning Date',
    cell: ({ getValue }) => new Date(getValue()).toLocaleString().split(', ')[0],
    filterFn: (row, id, value?: { range: { from: Date, to: Date }}) => {
      const currStartDate = new Date(row.getValue(id))
      return !value || (value.range.from <= currStartDate && value.range.to >= currStartDate)
    },
  },
  {
    accessorKey: 'cleanerAssigned',
    header: 'Cleaner Assigned',
  },
  {
    accessorKey: 'totalBilled',
    header: 'Total Billed',
    cell: ({ getValue }) => formatCurrency.format(getValue()),
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableSorting: false,
  },
]