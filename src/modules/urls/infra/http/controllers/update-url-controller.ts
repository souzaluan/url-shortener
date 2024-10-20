import { Request, Response } from 'express'

import { container } from 'tsyringe'
import { celebrate, Joi, Segments } from 'celebrate'

import UpdateUrlService from '../../../services/update-url-service'

class UpdateUrlController {
  static route = '/:id'

  static validator = celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      originUrl: Joi.string().uri().optional(),
    },
  })

  static async handle(request: Request, response: Response) {
    const { id: urlId } = request.params
    const { originUrl } = request.body
    const userId = request.user?.id ?? null

    const updateUrlService = container.resolve(UpdateUrlService)
    const updatedUrl = await updateUrlService.execute({
      urlId,
      userId,
      originUrl,
    })

    response.json(updatedUrl)
  }
}

export default UpdateUrlController
