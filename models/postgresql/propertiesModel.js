import { PropertiesModel } from '../../sequelize/propertiesModel.js'
import sequelize from '../../config/db.js'
export class PropertieModel {
  static async getAllProperties () {
    try {
      const Properties = PropertiesModel(sequelize)
      const properties = await Properties.findAll()

      if (properties.length === 0) throw new Error('No properties found')

      return properties
    } catch (e) {
      console.error('Error getting properties:', e)
      throw new Error(e.message ?? 'Error getting properties')
    }
  }
}
