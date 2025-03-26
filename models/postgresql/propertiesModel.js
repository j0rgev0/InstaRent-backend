import { Properties, Features, Images } from '../../config/db.js'

export class PropertieModel {
  static async getAllProperties () {
    try {
      const properties = await Properties.findAll({
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

      if (properties.length === 0) throw new Error('No properties found')

      return properties
    } catch (e) {
      console.error('Error getting properties:', e)
      throw new Error(e.message ?? 'Error getting properties')
    }
  }
}
