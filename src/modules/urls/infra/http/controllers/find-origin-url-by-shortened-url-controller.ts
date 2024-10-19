import { Request, Response } from 'express'

import { container } from 'tsyringe'
import { celebrate, Joi, Segments } from 'celebrate'
import FindOriginUrlByShortenedUrlService from '../../../services/find-origin-url-by-shortened-url-service'

class FindOriginUrlByShortenedUrlController {
  static route = '/'

  static validator = celebrate({
    [Segments.QUERY]: {
      shortenedUrl: Joi.string().uri().required(),
    },
  })

  static async handle(request: Request, response: Response) {
    const { shortenedUrl } = request.query

    const findOriginUrlByShortenedUrlService = container.resolve(
      FindOriginUrlByShortenedUrlService,
    )
    const foundUrl = await findOriginUrlByShortenedUrlService.execute({
      shortenedUrl: shortenedUrl as string,
    })

    response.redirect(foundUrl.originUrl)
  }
}

export default FindOriginUrlByShortenedUrlController
