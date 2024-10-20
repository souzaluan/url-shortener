import { inject, injectable } from 'tsyringe'

import env from '../../../crosscutting/config/environment-variables'

import { NotFoundError } from '../../../crosscutting/errors/not-found-error'
import { UnauthorizedError } from '../../../crosscutting/errors/unauthorized-error'

import {
  IUpdateUrl,
  IUpdateUrlService,
} from '../domain/services/update-url-service'

import IUrlRepository, {
  URL_REPOSITORY_TOKEN,
} from '../repositories/url-repository'

import IUserRepository, {
  USER_REPOSITORY_TOKEN,
} from '../../users/repositories/user-repository'

@injectable()
class UpdateUrlService implements IUpdateUrlService {
  constructor(
    @inject(URL_REPOSITORY_TOKEN)
    private urlRepository: IUrlRepository,

    @inject(USER_REPOSITORY_TOKEN)
    private userRepository: IUserRepository,
  ) {}

  async execute({
    userId,
    urlId,
    originUrl,
  }: IUpdateUrl.Params): Promise<IUpdateUrl.Response> {
    const user = await this.userRepository.findOneById(userId)

    if (!user) {
      throw new NotFoundError('User not found')
    }

    const url = await this.urlRepository.findOneById(urlId)

    if (!url) {
      throw new NotFoundError('Url not found')
    }

    if (!url.userId || url.userId !== user.id) {
      throw new UnauthorizedError()
    }

    const updatedUrl = await this.urlRepository.update({
      id: urlId,
      originUrl,
    })

    const shortenedUrl = `${env.API_URL}/${updatedUrl.slug}`

    return {
      id: updatedUrl.id,
      originUrl: updatedUrl.originUrl,
      shortenedUrl,
      clicks: updatedUrl.clicks,
      createdAt: updatedUrl.createdAt,
      updatedAt: updatedUrl.updatedAt,
      deletedAt: updatedUrl.deletedAt,
    }
  }
}

export default UpdateUrlService
