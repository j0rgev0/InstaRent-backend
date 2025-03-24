// import { neon } from '@neondatabase/serverless'
import { env } from './env.js'
import { Sequelize } from 'sequelize'
import { UsersModel } from '../sequelize/usersModel.js'

const sequelize = new Sequelize(env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
  // logging: false
})

export const User = UsersModel(sequelize)

export default sequelize
