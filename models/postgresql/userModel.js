import { UsersModel } from '../../sequelize/usersModel.js'
import sequelize from '../../config/db.js'

export class UserModel {
  static async getAllUsers () {
    const Users = UsersModel(sequelize)
    const users = await Users.findAll({
      attributes: ['id', 'username', 'name', 'email', 'role', 'created_at', 'updated_at']
    })
    if (!users) {
      throw new Error('No users found')
    }
    return users
  }
}
