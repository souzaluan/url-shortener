import { inject, injectable } from 'tsyringe'

import { NotFoundError } from '../../../crosscutting/errors/not-found-error'

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

    return {
      data,
      items,
      pages,
    }
  }
}

export default GetUrlsByUserService
