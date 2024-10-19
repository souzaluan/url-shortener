import { inject, injectable } from 'tsyringe'

import { BadRequestError } from '../../../crosscutting/errors/bad-request-error'
import { NotFoundError } from '../../../crosscutting/errors/not-found-error'

import IUrlRepository, {
  URL_REPOSITORY_TOKEN,
} from '../repositories/url-repository'
import {
  IFindOriginUrlByShortenedUrl,
  IFindOriginUrlByShortenedUrlService,
} from '../domain/services/find-origin-url-by-shortened-url-service'

@injectable()
class FindOriginUrlByShortenedUrlService
  implements IFindOriginUrlByShortenedUrlService
{
  constructor(
    @inject(URL_REPOSITORY_TOKEN)
    private urlRepository: IUrlRepository,
  ) {}

  async execute({
    shortenedUrl,
  }: IFindOriginUrlByShortenedUrl.Params): Promise<IFindOriginUrlByShortenedUrl.Response> {
    const slug = this.getSlugFromShortenedUrl(shortenedUrl)

    const url = await this.urlRepository.findOneBySlug(slug)

    if (!url) {
      throw new NotFoundError('Origin URL not found')
    }

    return {
      originUrl: url.originUrl,
    }
  }

  private getSlugFromShortenedUrl(shortenedUrl: string) {
    const splittedShortenedUrl = shortenedUrl.replace(/\/$/, '').split('/')

    const slug = splittedShortenedUrl.find(
      (_, index) => index === splittedShortenedUrl.length - 1,
    )

    if (!slug) {
      throw new BadRequestError('Invalid shortened URL')
    }

    return slug
  }
}

export default FindOriginUrlByShortenedUrlService
