import { Request, Response } from 'express'

import { container } from 'tsyringe'
import { celebrate, Joi, Segments } from 'celebrate'
import ShortenUrlService from '../../../services/shorten-url-service'

class ShortenUrlController {
  static route = '/urls/'

  static validator = celebrate({
    [Segments.BODY]: {
      originUrl: Joi.string().uri().required(),
    },
  })

  static async handle(request: Request, response: Response) {
    const { originUrl } = request.body

    const userId = request.user?.id ?? null

    const shortenUrlService = container.resolve(ShortenUrlService)
    const shortenedUrl = await shortenUrlService.execute({
      originUrl,
      userId,
    })

    response.status(201).json(shortenedUrl)
  }
}

export default ShortenUrlController
