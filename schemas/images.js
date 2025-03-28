import z from 'zod'

const imageSchema = z.object({
  property_id: z.string().uuid(),
  url: z.string().min(1, { message: 'Name is required' })
})

export function validateImage (input) {
  return imageSchema.safeParse(input)
}

export function validatePartialImage (input) {
  return imageSchema.partial().safeParse(input)
}
