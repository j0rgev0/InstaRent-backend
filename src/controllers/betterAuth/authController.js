export class AuthController {
  constructor ({ model }) {
    this.model = model
  }

  register = async (req, res) => {
    try {
      const result = req.body

      if (!result.success) throw new Error(result.error.message)

      const newUser = await this.model.registerUser(result.data)

      res.status(201).json({
        message: 'Usuario creado correctamente',
        user: newUser
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
