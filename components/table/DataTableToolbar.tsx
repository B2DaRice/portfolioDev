"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./DataTableViewOptions"

import { DataTableFacetedFilter } from "./DataTableFacetedFilter"
import { FilterConfigType } from './DataTable'
import { DateRangePicker } from '@/components/ui/date-range-picker'

interface DataTableToolbarProps<TData> {
  table: Table<TData>,
  filterConfig?: FilterConfigType[]
}

export function DataTableToolbar<TData>({
  table,
  filterConfig = [],
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {table.getAllColumns().length > 0 && filterConfig.map(({type, accessorKey, label, options = [], dateConfig = {}, icon}, index) => {
          if (type === 'text') {
            return (
              <Input
                key={`filter-${accessorKey}`}
                placeholder={label}
                value={(table.getColumn(accessorKey)?.getFilterValue() as string) ?? ""}
                onChange={(event) => 
                  table.getColumn(accessorKey)?.setFilterValue(event.target.value)
                }
                className="h-8 w-[150px] lg:w-[250px]"
              />
            )
          } else if (type === 'select') {
            return (
              <DataTableFacetedFilter
                key={`filter-${accessorKey}`}
                column={table.getColumn(accessorKey)}
                title={label}
                options={options}
                filterIcon={icon}
              />
            )
          } else if (type === 'date') {
            return (
              <DateRangePicker
                key={`filter-${accessorKey}`}
                onUpdate={(values, preset = '') => {
                  table.getColumn(accessorKey)?.setFilterValue(preset?.toLowerCase() === 'all' ? null : values)
                }}
                initialDateFrom={dateConfig.defaultRange ? new Date(dateConfig.defaultRange.from) : undefined}
                initialDateTo={dateConfig.defaultRange ? new Date(dateConfig.defaultRange.to) : undefined}
                filterActive={!!table.getColumn(accessorKey)?.getFilterValue()}
                align="start"
                // locale="en-GB"
                showCompare={false}
                customPresets={dateConfig.presets}
              />
            )
          }
        })}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 text-destructive lg:px-3 hover:text-destructive-foreground"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}