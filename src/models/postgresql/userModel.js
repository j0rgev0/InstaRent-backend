import { User } from '../../config/db.js'
import bcrypt from 'bcrypt'

export class UserModel {
  static async getAllUser () {
    const user = await User.findAll({
      attributes: { exclude: ['password'] }
    })

    if (!user) throw new Error('No user found')

    return user
  }

  static async getUserById (id) {
    try {
      const user = await User.findOne({
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
      const updatedUser = await User.findOne({
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
      const user = await User.findOne({
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
