import z from 'zod'

const userSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters long' }),
  email: z.string().email({ message: 'Invalid email' }),
  emailVerified: z.boolean().default(false),
  image: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date())
})

const userLoginSchema = z.object({
  username: z.string().min(3, { message: 'User name must be at least 3 characters long' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' })
})

export function validateUser (input) {
  return userSchema.safeParse(input)
}
export function validatePartialUser (input) {
  return userSchema.partial().safeParse(input)
}
export function validateLogin (input) {
  return userLoginSchema.safeParse(input)
}
