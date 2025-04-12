import { betterAuth } from 'better-auth'
import { expo } from '@better-auth/expo'
import { db } from '../drizzle/db.js'
import { user, account, session, verification } from '../drizzle/schema.js'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user,
      account,
      session,
      verification
    }
  }),
  emailAndPassword: {
    enabled: true
  },
  plugins: [expo()],
  trustedOrigins: ['myapp://', 'http://', 'exp://'],
  session: {
    expiresIn: 60 * 60 * 24 * 3, // 3 days
    updateAge: 60 * 60 * 24 // 1 day (every 1 day the session expiration is updated)
  }
})
