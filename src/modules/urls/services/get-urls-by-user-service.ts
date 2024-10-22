import { inject, injectable } from 'tsyringe'

import { NotFoundError } from '../../../crosscutting/errors/not-found-error'
import env from '../../../crosscutting/config/environment-variables'

import IUrlRepository, {
  URL_REPOSITORY_TOKEN,
} from '../repositories/url-repository'

import IUserRepository, {
  USER_REPOSITORY_TOKEN,
} from '../../users/repositories/user-repository'

import {
  IGetUrlsByUser,
  IGetUrlsByUserService,
} from '../domain/services/get-urls-by-user-service '

@injectable()
class GetUrlsByUserService implements IGetUrlsByUserService {
  constructor(
    @inject(URL_REPOSITORY_TOKEN)
    private urlRepository: IUrlRepository,

    @inject(USER_REPOSITORY_TOKEN)
    private userRepository: IUserRepository,
  ) {}

  async execute({
    userId,
    page,
    limit,
  }: IGetUrlsByUser.Params): Promise<IGetUrlsByUser.Response> {
    const user = await this.userRepository.findOneById(userId)

    if (!user) {
      throw new NotFoundError('User not found')
    }

    const { data, items, pages } = await this.urlRepository.getByUser({
      userId,
      page,
      limit,
    })

    const normalizedUrls: IGetUrlsByUser.Response['data'] = data.map((url) => ({
      id: url.id,
      clicks: url.clicks,
      originUrl: url.originUrl,
      shortenedUrl: `${env.API_URL}/${url.slug}`,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt,
      deletedAt: url.deletedAt,
    }))

    return {
      data: normalizedUrls,
      items,
      pages,
    }
  }
}

export default GetUrlsByUserService
