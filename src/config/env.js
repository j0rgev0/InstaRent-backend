import { config } from 'dotenv'

config()

export const env = {
  DATABASE_URL: process.env.DATABASE_URL,
  SIGNATURE: process.env.SIGNATURE,
  PORT: process.env.PORT ?? 3000,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_URL: process.env.CLOUDINARY_URL,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
}
