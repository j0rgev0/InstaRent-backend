import { Op } from 'sequelize'
import sequelize, { Properties, Features, Images } from '../../config/db.js'

export class PropertieModel {
  static async getAllProperties ({ features, province, city, type, condition, street, constructionYear, latitude, longitude, minPrice, maxPrice, operation, minSize, maxSize }) {
    try {
      const whereConditions = {}

      if (province) {
        whereConditions.province = province.toLowerCase()
      }

      if (city) {
        whereConditions.city = city.toLowerCase()
      }

      if (type) {
        whereConditions.type = type.toLowerCase()
      }

      if (condition) {
        whereConditions.condition = condition.toLowerCase()
      }

      if (street) {
        const formattedStreet = street.replace(/-/g, ' ')
        whereConditions.street = {
          [Op.iLike]: `%${formattedStreet}%`
        }
      }

      if (operation) {
        whereConditions.operation = operation.toLowerCase()
      }

      if (minSize && maxSize) {
        whereConditions.size = {
          [Op.between]: [Number(minSize), Number(maxSize)]
        }
      } else if (minSize) {
        whereConditions.size = {
          [Op.gte]: Number(minSize)
        }
      } else if (maxSize) {
        whereConditions.size = {
          [Op.lte]: Number(maxSize)
        }
      }

      if (minPrice && maxPrice) {
        whereConditions.price = {
          [Op.between]: [Number(minPrice), Number(maxPrice)]
        }
      } else if (minPrice) {
        whereConditions.price = {
          [Op.gte]: Number(minPrice)
        }
      } else if (maxPrice) {
        whereConditions.price = {
          [Op.lte]: Number(maxPrice)
        }
      }

      if (constructionYear) {
        whereConditions.construction_year = constructionYear
      }

      if (latitude && longitude) {
        whereConditions.latitude = latitude
        whereConditions.longitude = longitude
      }

      const include = [
        {
          model: Features,
          as: 'features'
        },
        {
          model: Images,
          as: 'images'
        }
      ]

      if (features) {
        include[0].where = {
          name: {
            [Op.like]: `%${features.toLowerCase()}%`
          }
        }
      }

      const properties = await Properties.findAll({
        where: whereConditions,
        include
      })

      if (!properties.length) {
        throw new Error('No properties found')
      }

      return properties
    } catch (e) {
      console.error('Error getting properties:', e)
      throw new Error(e.message ?? 'Error getting properties')
    }
  }

  static async getPropertyById (id) {
    try {
      const propertie = await Properties.findOne({
        where: { id },
        include: [
          {
            model: Features,
            as: 'features'
          },
          {
            model: Images,
            as: 'images'
          }
        ]
      })

      if (!propertie) throw new Error('Propertie not found')

      return propertie
    } catch (e) {
      console.error('Error getting propertie:', e)
      throw new Error(e.message ?? 'Error getting propertie')
    }
  }

  static async createProperty (property) {
    try {
      const existingPropertie = await Properties.findOne({
        where: {
          longitude: property.longitude,
          latitude: property.latitude
        }
      })

      if (existingPropertie) throw new Error('Propertie already exists')

      const newPropertie = await Properties.create({
        ...property,
        city: property.city.toLowerCase(),
        province: property.province.toLowerCase(),
        type: property.type.toLowerCase(),
        condition: property.condition.toLowerCase(),
        operation: property.operation.toLowerCase(),
        street: property.street.toLowerCase(),
        latitude: property.latitude.toUpperCase(),
        longitude: property.longitude.toUpperCase(),
        neighborhood: property.neighborhood.toLowerCase(),
        id: sequelize.UUIDV4
      })

      return newPropertie
    } catch (e) {
      console.error('Error creating propertie:', e)
      throw new Error(e.message ?? 'Error creating propertie')
    }
  }

  static async deleteProperty (id) {
    try {
      const propertie = await Properties.findOne({
        where: { id }
      })

      if (!propertie) throw new Error('Propertie not found')

      const result = await propertie.destroy()

      if (result === 0) throw new Error('Error deleting propertie')

      return { message: 'Propertie deleted successfully' }
    } catch (e) {
      console.error('Error deleting propertie:', e)
      throw new Error(e.message ?? 'Error deleting propertie')
    }
  }
}
