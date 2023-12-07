"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

export type ProfileFormProps = {
    property?: { name: string | string[] | undefined } | undefined;
  };

interface FormInternalHeaderProps {
    title: string,
    anchor: string
  }

function FormInternalHeader({ title, anchor }: FormInternalHeaderProps) {
    return (
        <div id={anchor} className="w-full p-4 mt-4">
            <h3 className="text-lg font-medium">{title}</h3>
            <Separator />
        </div>
    )
}

const profileFormSchema = z.object({
    propertyName: z
    .string({
        required_error: "Please choose a property name."
    }),
    checkin: z
    .string({
        required_error: "Please choose a check-in name."
    }),
    checkout: z
    .string({
        required_error: "Please choose a check-out name."
    }),
    bedrooms: z
    .string({
        required_error: "Bedrooms."
    }),
    bathrooms: z
    .string({
        required_error: "Bathrooms."
    }),
    halfBathrooms: z
    .string({
        required_error: "Half Bathrooms."
    }),
    maxGuests: z
    .string({
        required_error: "Max Guests."
    }),
    squareFeet: z.string({
        required_error: "Max Guests."
    }),
    numberOfFloors: z.string({
        required_error: "Max Guests."
    }),
    numberOfFurniture: z.string({
        required_error: "Max Guests."
    }),
    username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
    propertyType: z
    .string({
      required_error: "Please select an email to display.",
    }),
    propertyDescription: z.string().max(160).min(4),
    housekeeperInstructions: z.string().max(160).min(4),
    propertyAccess: z.string().max(160).min(4),
    trashInfo: z.string().max(160).min(4),
    onSiteLaundry: z.string(),
    ecoFriendly: z.string(),
    stairs: z.string(),
    keepSupplies: z.string(),
    hotTub: z.string(),
    outdoorSpace: z.string(),
    trashInstructions: z.string(),
    terms: z.boolean(),
    agreePhotos: z.boolean(),
    agreeCalendar: z.boolean(),

  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ProfileForm({ property }: ProfileFormProps) {
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            propertyName: Array.isArray(property?.name) ? property?.name[0] : property?.name || '', 
            propertyDescription: "Tell us a little about the property.",
        },
        mode: "onChange",
        });

  const { fields, append } = useFieldArray({
    name: "urls",
    control: form.control,
  })

  function onSubmit(data: ProfileFormValues) {
    // on submit
  }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    <div className="flex flex-wrap">
        
        <FormInternalHeader title="Property Information" anchor="propertyInformation"/>

        <div className="w-1/2 p-4" >
            <FormField
            control={form.control}
            name="propertyName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Property Name</FormLabel>
                <FormControl>
                    <Input {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <div className="w-1/2 p-4" >
            <FormField
            control={form.control}
            name="propertyType"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Property Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Choose the type of property" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="accesoryDwelling">Accesory Dwelling</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="cottage">Cottage</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="room">Room</SelectItem>
                    <SelectItem value="rv">RV</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="townhome">Townhome</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <div className="w-full p-4 mt-4">
            <FormField
            control={form.control}
            name="propertyDescription"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Property Description</FormLabel>
                <FormControl>
                    <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
    
    <div className="w-1/2 p-4" >
        <FormField
          control={form.control}
          name="checkin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Check-in time</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
    </div>
    <div className="w-1/2 p-4" >
        <FormField
          control={form.control}
          name="checkin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Check-out time</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
    </div>

        <FormInternalHeader title="Property Location" anchor="propertyLocation" />
        <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 p-4">
            <div className="mb-4">
                <FormField
                    control={form.control}
                    name="checkin"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Address Line 1</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="mb-4">
            <FormField
                control={form.control}
                name="checkin"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Address Line 2</FormLabel>
                    <FormControl>
                        <Input {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            </div>
            <div className="mb-4">
            <FormField
                control={form.control}
                name="checkin"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                        <Input {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            </div>
            <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 mb-4 md:mb-0 pr-2">
                <FormField
                    control={form.control}
                    name="checkin"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                </div>
                <div className="w-full md:w-1/2 mb-4 md:mb-0 pl-2">
                <FormField
                    control={form.control}
                    name="checkin"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Zipcode</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                </div>
            </div>
        </div>
        <div className="w-full md:w-1/2 p-4">
        <div className="mb-4">Map</div>
        </div>
        </div>
    
        <FormInternalHeader title="Property Specifics" anchor="propertySpecifics" />
        <div className="w-full sm:w-1/2 md:w-1/4 p-4">
        <FormField
          control={form.control}
          name="bedrooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bedrooms</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 p-4">
        <FormField
          control={form.control}
          name="bathrooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bathrooms</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> 
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 p-4">
        <FormField
          control={form.control}
          name="halfBathrooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Half Bathrooms</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />  
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 p-4">
        <FormField
          control={form.control}
          name="maxGuests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Guests</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 p-4">
        <FormField
          control={form.control}
          name="squareFeet"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Square Feet</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 p-4">
        <FormField
          control={form.control}
          name="numberOfFloors"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Floors/Stories</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> 
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 p-4">
        <FormField
          control={form.control}
          name="numberOfFurniture"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sofa Beds, Futons, Etc.</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

        <div className="w-full md:w-1/2 p-2">
        <FormField
            control={form.control}
            name="onSiteLaundry"
            render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                <Checkbox
                    checked={field.value === "onSiteLaundry"}
                    onCheckedChange={(checked) =>
                    checked ? field.onChange("onSiteLaundry") : field.onChange(null)
                    }
                />
                </FormControl>
                <FormLabel className="font-normal">On-Site Laundry</FormLabel>
            </FormItem>
            )}
        />
        </div>
        <div className="w-full md:w-1/2 p-2">
        <FormField
            control={form.control}
            name="ecoFriendly"
            render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                <Checkbox
                    checked={field.value === "ecoFriendly"}
                    onCheckedChange={(checked) =>
                    checked ? field.onChange("ecoFriendly") : field.onChange(null)
                    }
                />
                </FormControl>
                <FormLabel className="font-normal">Eco-Friendly Supplies Required</FormLabel>
            </FormItem>
            )}
        />
        </div>
        <div className="w-full md:w-1/2 p-2">
        <FormField
            control={form.control}
            name="stairs"
            render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                <Checkbox
                    checked={field.value === "stairs"}
                    onCheckedChange={(checked) =>
                    checked ? field.onChange("stairs") : field.onChange(null)
                    }
                />
                </FormControl>
                <FormLabel className="font-normal">Stairs</FormLabel>
            </FormItem>
            )}
        />
        </div>
        <div className="w-full md:w-1/2 p-2">
        <FormField
            control={form.control}
            name="keepSupplies"
            render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                <Checkbox
                    checked={field.value === "keepSupplies"}
                    onCheckedChange={(checked) =>
                    checked ? field.onChange("keepSupplies") : field.onChange(null)
                    }
                />
                </FormControl>
                <FormLabel className="font-normal">Keeper should use supplies provided</FormLabel>
            </FormItem>
            )}
        />
        </div>
        <div className="w-full md:w-1/2 p-2">
        <FormField
            control={form.control}
            name="outdoorSpace"
            render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                <Checkbox
                    checked={field.value === "outdoorSpace"}
                    onCheckedChange={(checked) =>
                    checked ? field.onChange("outdoorSpace") : field.onChange(null)
                    }
                />
                </FormControl>
                <FormLabel className="font-normal">Outdoor Space (decks, patios, etc.)</FormLabel>
            </FormItem>
            )}
        />
        </div>
        
        <div className="w-full md:w-1/2 p-2">
        <FormField
            control={form.control}
            name="hotTub"
            render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                <Checkbox
                    checked={field.value === "hotTub"}
                    onCheckedChange={(checked) =>
                    checked ? field.onChange("hotTub") : field.onChange(null)
                    }
                />
                </FormControl>
                <FormLabel className="font-normal">Hot Tub (hot tub fee will apply)</FormLabel>
            </FormItem>
            )}
        />
        </div>
        <FormInternalHeader title="Cleaning Instructions" anchor="cleaningInstructions" />
        
        <div className="w-full p-4 mt-4">
        <FormField
          control={form.control}
          name="housekeeperInstructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Housekeeper Instructions</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Housekeeper Instructions"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

        <div className="w-full p-4 mt-4">
        <FormField
          control={form.control}
          name="propertyAccess"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Access Instructions</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Property Access Instructions"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

        <div className="w-full p-4 mt-4">
        <FormField
          control={form.control}
          name="trashInstructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trash & Recycling Instructions</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Trash & Recycling Instructions"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

    </div>

        <FormInternalHeader title="Terms & Agreements" anchor="terms"/>

        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                    Terms and Conditions
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="agreePhotos"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Additional Checks #1
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="agreeCalendar"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                    Additional Check #2
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit">Save Property</Button>
    </form>
    </Form>
  )
}