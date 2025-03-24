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

      const existingUserEmail = await Users.findOne({
        where: {
          email: user.email
        }
      })

      const existingUserName = await Users.findOne({
        where: {
          username: user.username
        }
      })

      if (existingUserEmail || existingUserName) throw new Error('User alredy exists')

      const hashedPassword = await bcrypt.hash(user.password, 10)

      const newUser = await Users.create({
        ...user,
        password: hashedPassword
      })

      return newUser
    } catch (e) {
      console.error('Error creating user:', e)
      throw new Error(e.message ?? 'Error creating user')
    }
  }

  static async loginUser () {
    // const token = generateToken(user) // Pasa el objeto usuario directamente
    // res.json({ message: 'Login exitoso', token })
  }
}
