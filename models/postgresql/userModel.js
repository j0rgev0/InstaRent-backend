import { UsersModel } from '../../sequelize/usersModel.js'
import sequelize from '../../config/db.js'
import bcrypt from 'bcrypt'

export class UserModel {
  static async getAllUsers () {
    const Users = UsersModel(sequelize)
    const users = await Users.findAll()
    if (!users) {
      throw new Error('No users found')
    }
    return users
  }

  static async edit (user) {
    try {
      const Users = UsersModel(sequelize)
      const updatedUser = await Users.findOne({
        where: {
          id: user.id
        }
      })
      if (!updatedUser) throw new Error('User not found')

      if (user.password) {
        user.password = await bcrypt.hash(user.password, 10)
      }

      await updatedUser.update(user)

      return updatedUser
    } catch (e) {
      console.error('Error Editing in:', e)
      throw new Error(e.message ?? 'Edit error')
    }
  }
}
