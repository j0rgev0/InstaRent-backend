import { authClient } from '../../lib/authClient.js'

export class AuthModel {
  static async registerUser (user) {
    const { data, error } = await authClient.signUp.email(
      {
        email: user.email,
        password: user.password,
        name: user.name
      }
    )

    if (error) throw new Error(error.message)

    return data
  }
}
