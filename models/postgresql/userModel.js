import { UsersModel } from '../../sequelize/usersModel.js'
import sequelize from '../../config/db.js'
import bcrypt from 'bcrypt'

export class UserModel {
  static async getAllUsers () {
    const Users = UsersModel(sequelize)
    const users = await Users.findAll({
      attributes: { exclude: ['password'] }
    })
    if (!users) {
      throw new Error('No users found')
    }
    return users
  }

  static async getUserById (id) {
    try {
      const Users = UsersModel(sequelize)
      const user = await Users.findOne({
        where: { id },
        attributes: { exclude: ['password'] }
      })
      if (!user) throw new Error('User not found')

      return user
    } catch (e) {
      console.error('Error getting user by id:', e)
      throw new Error(e.message ?? 'Error getting user by id')
    }
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

      const { password: _, ...publicUser } = updatedUser.get()

      return publicUser
    } catch (e) {
      console.error('Error Editing in:', e)
      throw new Error(e.message ?? 'Edit error')
    }
  }

  static async deleteUser (id) {
    try {
      const Users = UsersModel(sequelize)
      const user = await Users.findOne({
        where: { id }
      })

      if (!user) throw new Error('User not found')

      const result = await user.destroy()

      if (result === 0) throw new Error('Error deleting user')

      return { message: 'User deleted successfully' }
    } catch (e) {
      console.error('Error deleting user:', e)
      throw new Error(e.message ?? 'Error deleting user')
    }
  }
}
