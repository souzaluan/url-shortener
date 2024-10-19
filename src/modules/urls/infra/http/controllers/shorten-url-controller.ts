import { Request, Response } from 'express'

import { container } from 'tsyringe'
import { celebrate, Joi, Segments } from 'celebrate'
import ShortenUrlService from '../../../services/shorten-url-service'

class ShortenUrlController {
  static route = '/'

  static validator = celebrate({
    [Segments.BODY]: {
      originUrl: Joi.string().uri().required(),
    },
  })

  static async handle(request: Request, response: Response) {
    const { originUrl } = request.body

    const shortenUrlService = container.resolve(ShortenUrlService)
    const shortenedUrl = await shortenUrlService.execute({
      originUrl,
    })

    response.status(201).json(shortenedUrl)
  }
}

export default ShortenUrlController
