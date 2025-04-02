import { betterAuth } from 'better-auth'
import { expo } from '@better-auth/expo'
import { env } from './config/env.js'
import pkg from 'pg'
const { Pool } = pkg

export const auth = betterAuth({
  database: new Pool({
    connectionString: env.DATABASE_URL
  }),
  emailAndPassword: {
    enabled: true
  },
  plugins: [expo()],
  trustedOrigins: ['myapp://']
})
