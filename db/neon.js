// import { neon } from '@neondatabase/serverless'
import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'
import { UsersModel } from '../sequelize/usersModel.js'

dotenv.config()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

export const User = UsersModel(sequelize)

export default sequelize
