"use client"

import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { DataTable, DataTableProps, FilterConfigType, TableColumns } from './table/DataTable'
import { DataTablePageHeader, PageActionButtonType } from './table/DataTablePageHeader'
import { DataTableDialogContent, DataTableDialogContentProps } from './table/DataTableDialogContent'
import Breadcrumb from './breadcrumb'
import { ChevronRight, Download } from 'lucide-react'
import { ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table'
import { GlobalContext } from '@/data/globalContext'

const USE_TEST_DATA = true;

export type PageActionType = {
  name: string;
  trigger: PageActionButtonType;
  content: DataTableDialogContentProps;
}

export type ListPageProps = {
  title: string;
  subtitle?: string;
  pageActions?: PageActionType[];
  filterConfig?: FilterConfigType[];
  columns: TableColumns,
  dataApiPath?: string;
  singlePagePath?: string;
  data: any[];
  setData: Dispatch<SetStateAction<any[]>>;
  tableRowClick?: (rowData: any) => void;
  initPageSize?: number;
  csvExportUrl?: string;
}

export const ListPage = ({
  title,
  subtitle,
  pageActions = [],
  filterConfig = [],
  columns,
  dataApiPath = '',
  singlePagePath = '',
  data,
  setData,
  tableRowClick,
  initPageSize = 10,
  csvExportUrl
}: ListPageProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [filters, setFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initPageSize,
  })
  const [sorting, setSorting] = useState<SortingState>([])
  const [pageActionBtns, setPageActionBtns] = useState<PageActionButtonType[]>([])
  const [pageActionContent, setPageActionContent] = useState<DataTableDialogContentProps>()
  const [dataParamsStr, setDataParamsStr] = useState<string>('')
  const containerRef = React.useRef<HTMLDivElement>(null)
  const router = useRouter()

  const { darkMode } = useContext(GlobalContext)

  useEffect(() => {
    console.log('*** DARK MODE - ', darkMode)
  }, [darkMode])

  const generateDataParams = () => {
    let filterUrlStr = `?page=${pagination.pageIndex}&size=${pagination.pageSize}`

    if (sorting.length > 0) {
      sorting.every(({ id, desc }) => {
        filterUrlStr += `&sort-${id}=${desc ? 'desc' : 'asc'}`
      })
    }

    if (filters.length > 0) {
      filters.forEach(({ value, id }) => {
        const currType = filterConfig.find((config) => config.accessorKey === id)?.type
        
        if (currType === 'date') {
          const currDates = value as { range?: { to: Date, from: Date } }

          if (currDates && currDates.range) {
            value = JSON.stringify({ 
              from: currDates.range.from.toLocaleString(), 
              to: currDates.range.to.toLocaleString()
            })
          }
        }

        filterUrlStr += `&filter-${id}=${value}`
      })
    }

    setDataParamsStr(filterUrlStr)
  }

  const dataCall = async (init = false) => {
    setIsLoading(true)
    let currDataUrl = dataApiPath + dataParamsStr

    await fetch(currDataUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    })
      .then((res) => res.json())
      .then(({ data }) => {
        console.log('Data fetched:', data)
        if (init && USE_TEST_DATA) {
          setData(data || [])
        }
      })
      .catch((err) => {
        console.error('There was an error fetching jobs data:\n', err)
      })

    setIsLoading(false)
  }

  useEffect(() => {
    generateDataParams()
    dataCall(true)
  }, [])

  useEffect(() => {
    generateDataParams()
  }, [filters, sorting, pagination.pageIndex, pagination.pageSize])

  useEffect(() => {
    dataCall()
  }, [dataParamsStr])

  useEffect(() => {
    const currPageActions = pageActions.map(({ trigger, content }) => ({
      ...trigger,
      onClick: () => {
        setPageActionContent({
          ...content,
          submitFn: () => {
            setPageActionContent(undefined)
            content.submitFn?.()
          }
        })
        trigger.onClick?.()
      }
    }))

    if (csvExportUrl) {
      currPageActions.push({
        label: 'Download CSV',
        icon: <Download className='h-4 w-4' />,
        onClick: () => {
          fetch(csvExportUrl)
          setPageActionContent({
            title: 'CSV Export',
            body: (
              <div className="flex flex-col gap-8 py-4">
                <p className="text-center">
                  Your CSV is being downloaded
                </p>
              </div>
            ),
            submitLabel: 'Close',
            submitFn: () => setPageActionContent(undefined)
          })
        }
      })
    }

    setPageActionBtns(currPageActions)
  }, [pageActions])

  const tableConfig: DataTableProps = {
    columns,
    data,
    filterConfig,
    filters,
    setFilters,
    pagination,
    setPagination,
    sorting,
    setSorting,
    isLoading,
    rowClick: (rowData: { id: string }) => {
      tableRowClick?.(rowData)
  
      if (singlePagePath) {
        router.push(`${singlePagePath}${rowData.id}`)
      }
    }
  }

  return (
    <div className='flex flex-col justify-center w-full'>
      <Breadcrumb
        separator={<ChevronRight className='h-4 w-4' />} 
        containerClasses='flex flex-row items-center gap-2 text-sm text-muted-foreground'
        capitalizeLinks={true}
      />
      <Dialog>
        <div ref={containerRef} className='flex flex-col'>
          <DataTablePageHeader 
            title={title}
            subtitle={subtitle}
            actions={pageActionBtns}
          />
          
          <DataTable {...tableConfig} />
          
          {pageActionContent &&
            <DialogContent>
              <DataTableDialogContent {...pageActionContent}/>
            </DialogContent>
          }
        </div>
      </Dialog>
    </div>
  )
}

