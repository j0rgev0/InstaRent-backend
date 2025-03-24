import { validateUser } from '../schemas/users.js'

export class AuthController {
  constructor ({ model }) {
    this.model = model
  }

  register = async (req, res) => {
    try {
      const result = validateUser(req.body)

      if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })

      const newUser = await this.model.registerUser(result.data)

      res.status(201).json({
        message: 'Usuario created successfully',
        user: newUser
      })
    } catch (e) {
      console.error('Error creating user:', e)
      res.status(500).json({ error: e.message })
    }
  }
}
