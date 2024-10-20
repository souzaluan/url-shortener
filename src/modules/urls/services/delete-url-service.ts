import { inject, injectable } from 'tsyringe'

import { NotFoundError } from '../../../crosscutting/errors/not-found-error'
import { UnauthorizedError } from '../../../crosscutting/errors/unauthorized-error'

import IUrlRepository, {
  URL_REPOSITORY_TOKEN,
} from '../repositories/url-repository'

import IUserRepository, {
  USER_REPOSITORY_TOKEN,
} from '../../users/repositories/user-repository'

import {
  IDeleteUrl,
  IDeleteUrlService,
} from '../domain/services/delete-url-service'

@injectable()
class DeleteUrlService implements IDeleteUrlService {
  constructor(
    @inject(URL_REPOSITORY_TOKEN)
    private urlRepository: IUrlRepository,

    @inject(USER_REPOSITORY_TOKEN)
    private userRepository: IUserRepository,
  ) {}

  async execute({ userId, urlId }: IDeleteUrl.Params): Promise<void> {
    const user = await this.userRepository.findOneById(userId)

    if (!user) {
      throw new NotFoundError('User not found')
    }

    const url = await this.urlRepository.findOneById(urlId)

    if (!url) {
      throw new NotFoundError('Url not found')
    }

    if (url.userId !== user.id) {
      throw new UnauthorizedError()
    }

    await this.urlRepository.deleteById(urlId)
  }
}

export default DeleteUrlService
