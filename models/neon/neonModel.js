import { UsersModel } from '../../sequelize/usersModel.js'
import sequelize from '../../config/db.js'
import bcrypt from 'bcrypt'

export class Model {
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

  static async registerUser (user) {
    try {
      const Users = UsersModel(sequelize)

      const hashedPassword = await bcrypt.hash(user.password, 10)

      const newUser = await Users.create({
        ...user,
        password: hashedPassword
      })

      return newUser
    } catch (e) {
      console.error('Error creating user:', e)
      throw new Error('Error creating user')
    }
  }
}
