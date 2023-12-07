"use client"

import { ListPage, PageActionType } from '@/components/dashboard/ListPage'
import { jobTableColumns, filterConfig } from '@/data/jobs/tableConfigs'
import { JobDataType } from '@/types/Job'
import { useState } from 'react'
import { PlusCircle } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const JobsPage = () => {
  const [jobs, setJobs] = useState<JobDataType[]>([])

  const pageActionsConfig: PageActionType[] = [
    {
      name: 'addJob',
      trigger: {
        label: 'Add Job',
        icon: <PlusCircle className='h-4 w-4' />
      },
      content: {
        title: 'Add Job',
        subtitle: 'Enter the details of the job you want to add',
        body: (
          <div className="grid gap-8 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-left">
                Job Name
              </Label>

              <Input id="jobName" className="col-span-3" onChange={({ target }) => console.log('*** dialog input -\n', target.value)}/>
            </div>
          </div>
        ),
        submitLabel: 'Save Job',
        submitFn: () => console.log('*** dialog submit -\n', '--- Add server func for saving job ---')
      }
    }
  ]

  return (
    <ListPage
      title='All Jobs'
      subtitle='Click a job to view more information'
      pageActions={pageActionsConfig}
      filterConfig={filterConfig}
      columns={jobTableColumns}
      dataApiPath='/api/jobs'
      singlePagePath='admin/job/'
      data={jobs}
      setData={setJobs}
      csvExportUrl='/api/csv?tableId=jobs'
    />
  )
}

export default JobsPage