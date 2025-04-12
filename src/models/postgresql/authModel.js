import sequelize, { User } from '../../config/db.js'
import bcrypt from 'bcrypt'

export class AuthModel {
  static async registerUser (user) {
    try {
      const existingUserEmail = await User.findOne({
        where: {
          email: user.email
        }
      })

      const existingUserName = await User.findOne({
        where: {
          username: user.username
        }
      })

      if (existingUserEmail || existingUserName) throw new Error('User alredy exists')

      const hashedPassword = await bcrypt.hash(user.password, 10)

      const newUser = await User.create({
        ...user,
        id: sequelize.UUIDV4,
        password: hashedPassword
      })

      return newUser
    } catch (e) {
      console.error('Error creating user:', e)
      throw new Error(e.message ?? 'Error creating user')
    }
  }

  static async loginUser ({ username, password }) {
    try {
      const user = await User.findOne({
        where: { username }
      })

      if (!user) throw new Error('User not found')

      const isValidPassword = await bcrypt.compare(password, user.password)

      if (!isValidPassword) throw new Error('Invalid password')

      return user
    } catch (e) {
      console.error('Error logging in:', e)
      throw new Error(e.message ?? 'Login error')
    }
  }
}
