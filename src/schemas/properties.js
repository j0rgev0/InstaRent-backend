import z from 'zod'

const propertySchema = z.object({
  type: z
    .enum([
      'apartment',
      'penthouse',
      'chalet',
      'duplex',
      'studio',
      'loft',
      'ruralproperty',
      'groundfloor',
      'townhouse',
      'other'
    ])
    .default('other'),
  operation: z.enum(['sell', 'rent']).default('rent'),
  bathrooms: z
    .number()
    .int()
    .min(0, { message: 'Bathrooms must be at least 0' }),
  bedrooms: z.number().int().min(0, { message: 'Bedrooms must be at least 0' }),
  size: z.number().positive({ message: 'Size must be a positive number' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  latitude: z.string().min(1, { message: 'Latitude is required' }),
  longitude: z.string().min(1, { message: 'Longitude is required' }),
  street: z.string().optional(),
  street_number: z.string().min(1, { message: 'Street Number is required' }),
  neighborhood: z.string().optional(),
  locality: z.string().min(1, { message: 'locality is required' }),
  province: z.string().min(1, { message: 'Province is required' }),
  state: z.string().min(1, { message: 'City is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
  postal_code: z.string().min(1, { message: 'Zip code is required' }),
  floor: z.number().optional(),
  letter: z.string().optional(),
  conservation: z
    .enum(['new', 'excellent', 'good', 'fair', 'to_renovate', 'ruin'])
    .default('good'),
  description: z.string().min(1, { message: 'Description is required' }),
  construction_year: z.number().optional(),
  furnished: z.boolean().default(false),
  user_id: z.string().min(1, { message: 'User id is required' }),
  video: z.boolean().optional(),
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().default(() => new Date())
})

export function validateProperty (input) {
  return propertySchema.safeParse(input)
}

export function validatePartialProperty (input) {
  return propertySchema.partial().safeParse(input)
}
