import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const profileFormSchema = z.object({
  propertyName: z.string(),
  propertyType: z.string(),
  propertyDescription: z.string().max(160).min(4),
  checkInTime: z.string().min(1),
  checkOutTime: z.string(),
  propertyLocationAddress: z.string(),
  propertyLocationAddressTwo: z.string(),
  propertyLocationCity: z.string(),
  propertyLocationState: z.string(),
  propertyLocationZip: z.string().regex(/^\d{5}(-\d{4})?$/),
  bedrooms: z.string(),
  bathrooms: z.string(),
  halfBathrooms: z.string(),
  maxGuests: z.string(),
  squareFeet: z.string(),
  numberOfFloors: z.string(),
  numberOfFurniture: z.string(),
  onSiteLaundry: z.string().optional(),
  ecoFriendly: z.string().optional(),
  stairs: z.string().optional(),
  keepSupplies: z.string().optional(),
  outdoorSpace: z.string().optional(),
  hotTub: z.string().optional(),
  housekeeperInstructions: z.string().max(160).min(4),
  propertyAccess: z.string().max(160).min(4),
  trashInstructions: z.string(),
  terms: z.boolean().refine(value => value === true, {
    message: 'Terms acceptance is required',
    path: ['terms'],
  }),
  agreePhotos: z.boolean().refine(value => value === true, {
    message: 'Terms acceptance is required',
    path: ['agreePhotos'],
  }),
  agreeCalendar: z.boolean().refine(value => value === true, {
    message: 'Terms acceptance is required',
    path: ['agreeCalendar'],
  }),
})

export const propertiesTableSchema = z.object({
  id: z.string(),
  propertyName: z.string().optional(),
  organizationName: z.string().optional(),
  jobCount: z.number().optional(),
  status: z.string().optional(),
  cleaningCost: z.number().optional()
})
