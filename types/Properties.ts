import { propertiesTableSchema } from '@/app/api/properties/schema';
import { z } from 'zod';

export type DataTableColType = {
  label: string
  dataKey: string
}[]

export type PropertiesDataType = z.infer<typeof propertiesTableSchema>

export type RowClickHandler = (rowData: PropertiesDataType) => void;