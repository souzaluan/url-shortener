import { Request, Response } from 'express'

import { container } from 'tsyringe'
import { celebrate, Joi, Segments } from 'celebrate'

import CreateUserService from '../../../services/create-user-service'

class CreateUserController {
  static route = '/users'

  static validator = celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  })

  static async handle(request: Request, response: Response) {
    const { name, email, password } = request.body

    const createUserService = container.resolve(CreateUserService)
    const createdUser = await createUserService.execute({
      name,
      email,
      password,
    })

    response.status(201).json(createdUser)
  }
}

export default CreateUserController
