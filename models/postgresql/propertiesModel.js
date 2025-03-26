import { Op } from 'sequelize'
import sequelize, { Properties, Features, Images } from '../../config/db.js'

export class PropertiesModel {
  static async getAllProperties ({ features, province, city, type, condition, street, constructionYear, latitude, longitude, minPrice, maxPrice, operation, minSize, maxSize, country }) {
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

      if (country) {
        whereConditions.country = country.toLowerCase()
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
      const property = await Properties.findOne({
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

      if (!property) throw new Error('Property not found')

      return property
    } catch (e) {
      console.error('Error getting property:', e)
      throw new Error(e.message ?? 'Error getting property')
    }
  }

  static async createProperties (property) {
    try {
      const existingProperty = await Properties.findOne({
        where: {
          longitude: property.longitude,
          latitude: property.latitude
        }
      })

      if (existingProperty) throw new Error('Property already exists')

      const newProperty = await Properties.create({
        ...property,
        city: property.city.toLowerCase(),
        province: property.province.toLowerCase(),
        type: property.type.toLowerCase(),
        condition: property.condition.toLowerCase(),
        country: property.country.toLowerCase(),
        operation: property.operation.toLowerCase(),
        street: property.street.toLowerCase(),
        latitude: property.latitude.toUpperCase(),
        longitude: property.longitude.toUpperCase(),
        neighborhood: property.neighborhood.toLowerCase(),
        id: sequelize.UUIDV4
      })

      return newProperty
    } catch (e) {
      console.error('Error creating property:', e)
      throw new Error(e.message ?? 'Error creating property')
    }
  }

  static async deleteProperties (id) {
    try {
      const property = await Properties.findOne({
        where: { id }
      })

      if (!property) throw new Error('Property not found')

      const result = await property.destroy()

      if (result === 0) throw new Error('Error deleting property')

      return { message: 'Property deleted successfully' }
    } catch (e) {
      console.error('Error deleting property:', e)
      throw new Error(e.message ?? 'Error deleting property')
    }
  }

  static async updateProperties (property) {
    try {
      const updatedProperty = await Properties.findOne({
        where: { id: property.id }
      })

      if (!updatedProperty) throw new Error('Propertie not found')

      await updatedProperty.update({
        ...property,
        city: property.city.toLowerCase(),
        province: property.province.toLowerCase(),
        type: property.type.toLowerCase(),
        condition: property.condition.toLowerCase(),
        country: property.country.toLowerCase(),
        operation: property.operation.toLowerCase(),
        street: property.street.toLowerCase(),
        latitude: property.latitude.toUpperCase(),
        longitude: property.longitude.toUpperCase(),
        neighborhood: property.neighborhood.toLowerCase()
      })

      return updatedProperty
    } catch (e) {
      console.error('Error updating propertie:', e)
      throw new Error(e.message ?? 'Error updating propertie')
    }
  }
}
