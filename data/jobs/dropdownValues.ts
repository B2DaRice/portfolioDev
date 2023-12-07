"use static"

import { DatePresetConfig } from '@/components/ui/date-range-picker'

export const jobTypes = [
  {
    label: 'One Time',
    value: 'once'
  },
  {
    label: 'Recurring',
    value: 'recurring'
  },
]

export const jobStatuses = [
  { label: 'Scheduled', value: 'scheduled' },
  { label: 'Completed', value: 'completed' },
]

export const startDatePresets: DatePresetConfig[] = [
  {
    label: 'Tomorrow',
    name: '1day',
    direction: 'future',
    unit: 'day',
    value: 1
  },
  {
    label: 'Next 3 Days',
    name: '3days',
    direction: 'future',
    unit: 'day',
    value: 3
  },
  {
    label: 'Next Week',
    name: '7days',
    direction: 'future',
    unit: 'day',
    value: 7
  },
  {
    label: 'All',
    name: 'all',
    direction: 'all'
  }
]