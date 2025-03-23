import { UsersModel } from '../../sequelize/usersModel.js'
import sequelize from '../../db/neon.js'

export class Model {
  static async getAllUsers () {
    const Users = UsersModel(sequelize)
    const users = await Users.findAll({
      attributes: ['id', 'username', 'name', 'email', 'role', 'password', 'created_at', 'updated_at']
    })
    return users
  }
}
