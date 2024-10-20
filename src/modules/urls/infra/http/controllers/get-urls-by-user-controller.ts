import { Request, Response } from 'express'

import { container } from 'tsyringe'
import { celebrate, Joi, Segments } from 'celebrate'
import GetUrlsByUserService from '../../../services/get-urls-by-user-service'

class GetUrlsByUserController {
  static route = '/my'

  static validator = celebrate({
    [Segments.QUERY]: {
      page: Joi.number().positive(),
      limit: Joi.number().positive(),
    },
  })

  static async handle(request: Request, response: Response) {
    const { page, limit } = {
      page: (request.query.page ?? 1) as number,
      limit: (request.query.limit ?? 10) as number,
    }

    const userId = request.user?.id ?? null

    const getUrlsByUserService = container.resolve(GetUrlsByUserService)
    const urlsByUser = await getUrlsByUserService.execute({
      userId,
      page,
      limit,
    })

    response.json(urlsByUser)
  }
}

export default GetUrlsByUserController
