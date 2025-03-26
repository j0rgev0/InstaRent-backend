import { Op } from 'sequelize'
import { Properties, Features, Images } from '../../config/db.js'

export class PropertieModel {
  static async getAllProperties ({
    features,
    province,
    city,
    type,
    condition,
    street,
    constructionYear,
    latitude,
    longitude
  }) {
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
}
