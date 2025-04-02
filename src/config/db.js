// import { neon } from '@neondatabase/serverless'
import { env } from './env.js'
import { Sequelize } from 'sequelize'
import { UsersModel } from '../sequelize/usersModel.js'
import { PropertiesModel } from '../sequelize/propertiesModel.js'
import { FeaturesModel } from '../sequelize/featuresModel.js'
import { ImagesModel } from '../sequelize/imagesModel.js'

const sequelize = new Sequelize(env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  } //,
  // logging: false
})

export const Users = UsersModel(sequelize)
export const Properties = PropertiesModel(sequelize)
export const Features = FeaturesModel(sequelize)
export const Images = ImagesModel(sequelize)

Properties.hasMany(Features, {
  foreignKey: 'property_id',
  as: 'features',
  onDelete: 'CASCADE'
})

Properties.hasMany(Images, {
  foreignKey: 'property_id',
  as: 'images',
  onDelete: 'CASCADE'
})

Features.belongsTo(Properties, {
  foreignKey: 'property_id',
  as: 'property'
})

Images.belongsTo(Properties, {
  foreignKey: 'property_id',
  as: 'property'
})

sequelize.sync()
export default sequelize
