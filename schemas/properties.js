import z from 'zod'

export const propertySchema = z.object({
  bedrooms: z.number().int().min(0, { message: 'Bedrooms must be at least 0' }),
  bathrooms: z.number().int().min(0, { message: 'Bathrooms must be at least 0' }),
  size: z.number().positive({ message: 'Size must be a positive number' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  zip_code: z.string().min(1, { message: 'Zip code is required' }),
  latitude: z.string().min(1, { message: 'Latitude is required' }),
  longitude: z.string().min(1, { message: 'Longitude is required' }),
  floor: z.number().int().optional(),
  city: z.string().min(1, { message: 'City is required' }),
  province: z.string().min(1, { message: 'Province is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  video: z.boolean().optional(),
  neighborhood: z.string().min(1, { message: 'Neighborhood is required' }),
  operation: z.enum(['sale', 'rent']).default('rent'),
  furnished: z.boolean().default(false),
  condition: z.enum(['new', 'excellent', 'good', 'fair', 'to_renovate', 'ruin']).default('good'),
  type: z.enum([
    'apartment', 'house', 'office', 'land', 'garage', 'storage',
    'room', 'building', 'local', 'other'
  ]).default('other'),
  door: z.string().min(1, { message: 'Door is required' }).optional(),
  street: z.string().optional(),
  construction_year: z.number().int().positive().optional().optional(),
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().default(() => new Date())
})

export function validateProperty (input) {
  return propertySchema.safeParse(input)
}

export function validatePartialProperty (input) {
  return propertySchema.partial().safeParse(input)
}
