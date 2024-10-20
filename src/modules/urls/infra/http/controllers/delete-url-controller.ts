import { Request, Response } from 'express'

import { container } from 'tsyringe'
import { celebrate, Joi, Segments } from 'celebrate'
import DeleteUrlService from '../../../services/delete-url-service'

class DeleteUrlController {
  static route = '/:id'

  static validator = celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  })

  static async handle(request: Request, response: Response) {
    const { id: urlId } = request.params
    const userId = request.user?.id ?? null

    const deleteUrlService = container.resolve(DeleteUrlService)
    await deleteUrlService.execute({
      urlId,
      userId,
    })

    response.json({ message: 'success' })
  }
}

export default DeleteUrlController
