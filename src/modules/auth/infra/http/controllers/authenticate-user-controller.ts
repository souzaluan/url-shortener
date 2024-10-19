import { Request, Response } from 'express'

import { container } from 'tsyringe'
import { celebrate, Joi, Segments } from 'celebrate'

import AuthenticateUserService from '../../../services/authenticate-user-service'

class AuthenticateUserController {
  static route = '/'

  static validator = celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  })

  static async handle(request: Request, response: Response) {
    const { email, password } = request.body

    const authenticateUserService = container.resolve(AuthenticateUserService)
    const authenticatedUser = await authenticateUserService.execute({
      email,
      password,
    })

    response.json(authenticatedUser)
  }
}

export default AuthenticateUserController
