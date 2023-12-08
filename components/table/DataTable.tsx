"use client"

import { useState, Dispatch, SetStateAction, useEffect } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Row,
  OnChangeFn,
  PaginationState
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { DataTableColumnHeader } from './DataTableColumnHeader'
import { DataTablePagination } from "./DataTablePagination"
import { DataTableToolbar } from "./DataTableToolbar"
import { DatePresetConfig } from '@/components/ui/date-range-picker'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export type FilterConfigType = {
  accessorKey: string,
  type: 'text' | 'select' | 'date',
  label: string,
  options?: {
    label: string,
    value: string,
    icon?: any
  }[]
  dateConfig?: {
    defaultRange?: {
      from: Date,
      to: Date
    },
    presets?: DatePresetConfig[]
  }
  icon?: JSX.Element
}

export type TableColumns = {
  accessorKey: string
  header: string
  cell?: (props: { getValue: () => any, row: Row<any> }) => any
  filterFn?: (row: Row<any>, id: string, value: any) => boolean
  enableSorting?: boolean
  defaultHidden?: boolean
}[]

export interface DataTableProps {
  data: any[],
  columns: TableColumns,
  filterConfig?: FilterConfigType[],
  filters: ColumnFiltersState,
  setFilters: OnChangeFn<ColumnFiltersState>,
  pagination: PaginationState,
  setPagination: OnChangeFn<PaginationState>,
  sorting: SortingState,
  setSorting: OnChangeFn<SortingState>,
  isLoading?: boolean,
  rowClick?: (rowData: any) => void
}

export function DataTable({
  data,
  columns,
  filterConfig = [],
  filters,
  setFilters,
  pagination,
  setPagination,
  sorting,
  setSorting,
  isLoading,
  rowClick
}: DataTableProps) {
  const defaultVisibile: { [key: string]: boolean } = {}
  columns.forEach(({ defaultHidden, accessorKey }) => {
    defaultVisibile[accessorKey] = !defaultHidden;
  })

  const [rowSelection, setRowSelection] = useState({})
  const [tableCols, setTableCols] = useState<ColumnDef<any, any>[]>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(defaultVisibile)

  const table = useReactTable({
    data,
    columns: tableCols,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters: filters,
      pagination
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  useEffect(() => {
    setTableCols(columns.map(({ defaultHidden, ...col }) => (col as ColumnDef<any, any>)))
  }, [ columns ])

  return (
    <div className="space-y-4">
      <DataTableToolbar 
        table={table}
        filterConfig={filterConfig}
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const title = header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan} className='text-accent'>
                      <DataTableColumnHeader title={title} column={header.column} />
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell className="h-24">
                  <div className='flex flex-row gap-5 w-full items-center justify-center'>
                    Loading...
                    <LoadingSpinner />
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={(e) => rowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className='items-center text-primary' key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}