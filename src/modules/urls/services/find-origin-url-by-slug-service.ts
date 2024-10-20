import { inject, injectable } from 'tsyringe'

import { NotFoundError } from '../../../crosscutting/errors/not-found-error'

import IUrlRepository, {
  URL_REPOSITORY_TOKEN,
} from '../repositories/url-repository'
import {
  IFindOriginUrlBySlug,
  IFindOriginUrlBySlugService,
} from '../domain/services/find-origin-url-by-slug-service'

@injectable()
class FindOriginUrlBySlugService implements IFindOriginUrlBySlugService {
  constructor(
    @inject(URL_REPOSITORY_TOKEN)
    private urlRepository: IUrlRepository,
  ) {}

  async execute({
    slug,
  }: IFindOriginUrlBySlug.Params): Promise<IFindOriginUrlBySlug.Response> {
    const url = await this.urlRepository.findOneBySlug(slug)

    if (!url) {
      throw new NotFoundError('Origin URL not found')
    }

    await this.urlRepository.incrementClick(url.id)

    return {
      originUrl: url.originUrl,
    }
  }
}

export default FindOriginUrlBySlugService
