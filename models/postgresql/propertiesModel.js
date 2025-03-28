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
        city: property.city?.toLowerCase() ?? property.city,
        province: property.province?.toLowerCase() ?? property.province,
        type: property.type?.toLowerCase() ?? property.type,
        condition: property.condition?.toLowerCase() ?? property.condition,
        country: property.country?.toLowerCase() ?? property.country,
        operation: property.operation?.toLowerCase() ?? property.operation,
        street: property.street?.toLowerCase() ?? property.stre,
        latitude: property.latitude?.toUpperCase() ?? property.latitude,
        longitude: property.longitude?.toUpperCase() ?? property.longitude,
        neighborhood: property.neighborhood?.toLowerCase() ?? property.neighborhood,
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
        city: property.city?.toLowerCase() ?? updatedProperty.city,
        province: property.province?.toLowerCase() ?? updatedProperty.province,
        type: property.type?.toLowerCase() ?? updatedProperty.type,
        condition: property.condition?.toLowerCase() ?? updatedProperty.condition,
        country: property.country?.toLowerCase() ?? updatedProperty.country,
        operation: property.operation?.toLowerCase() ?? updatedProperty.operation,
        street: property.street?.toLowerCase() ?? updatedProperty.stre,
        latitude: property.latitude?.toUpperCase() ?? updatedProperty.latitude,
        longitude: property.longitude?.toUpperCase() ?? updatedProperty.longitude,
        neighborhood: property.neighborhood?.toLowerCase() ?? updatedProperty.neighborhood
      })

      return updatedProperty
    } catch (e) {
      console.error('Error updating propertie:', e)
      throw new Error(e.message ?? 'Error updating propertie')
    }
  }
}
