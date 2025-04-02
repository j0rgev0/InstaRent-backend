import { validateUser, validateLogin } from '../schemas/users.js'
import { generateToken } from '../lib/utils.js'
export class AuthController {
  constructor ({ model }) {
    this.model = model
  }

  register = async (req, res) => {
    try {
      const result = validateUser(req.body)

      if (!result.success) {
        throw new Error(
          result.error.errors.map((err) => err.message).join(',')
        )
      }

      const newUser = await this.model.registerUser(result.data)

      const { password: _, ...publicUser } = newUser.get()

      res.status(201).json({
        message: 'Usuario created successfully',
        user: publicUser
      })
    } catch (e) {
      console.error('Error creating user:', e)
      res.status(500).json({ error: e.message })
    }
  }

  login = async (req, res) => {
    try {
      const result = validateLogin(req.body)

      if (!result.success) {
        throw new Error(
          result.error.errors.map((err) => err.message).join(',')
        )
      }

      const user = await this.model.loginUser(result.data)

      const token = generateToken(user.id, user.role)

      res.json({ message: 'Login exitoso', token })
    } catch (e) {
      console.error('Error logging in user:', e)
      res.status(500).json({ error: e.message })
    }
  }
}
