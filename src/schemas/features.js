import z from 'zod'

const featureSchema = z.object({
  property_id: z.string().uuid(),
  name: z.string().min(1, { message: 'Name is required' })
})

export function validateFeature (input) {
  return featureSchema.safeParse(input)
}

export function validatePartialFeature (input) {
  return featureSchema.partial().safeParse(input)
}
