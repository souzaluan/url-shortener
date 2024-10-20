import { Request, Response } from 'express'

import { container } from 'tsyringe'
import { celebrate, Joi, Segments } from 'celebrate'
import FindOriginUrlBySlugService from '../../../services/find-origin-url-by-slug-service'

class RedirectToOriginUrlController {
  static route = '/:slug'

  static validator = celebrate({
    [Segments.PARAMS]: {
      slug: Joi.string().required(),
    },
  })

  static async handle(request: Request, response: Response) {
    const { slug } = request.params

    const findOriginUrlBySlugService = container.resolve(
      FindOriginUrlBySlugService,
    )
    const foundUrl = await findOriginUrlBySlugService.execute({
      slug,
    })

    response.redirect(foundUrl.originUrl)
  }
}

export default RedirectToOriginUrlController
