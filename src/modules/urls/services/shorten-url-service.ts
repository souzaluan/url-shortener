import { inject, injectable } from 'tsyringe'

import randomize from 'randomatic'

import env from '../../../crosscutting/config/environment-variables'

import {
  IShortenUrl,
  IShortenUrlService,
} from '../domain/services/shorten-url-service'

import IUrlRepository, {
  URL_REPOSITORY_TOKEN,
} from '../repositories/url-repository'

@injectable()
class ShortenUrlService implements IShortenUrlService {
  constructor(
    @inject(URL_REPOSITORY_TOKEN)
    private urlRepository: IUrlRepository,
  ) {}

  async execute({
    originUrl,
  }: IShortenUrl.Params): Promise<IShortenUrl.Response> {
    const slug = await this.generateSlug()

    const createdUrl = await this.urlRepository.create({
      originUrl,
      slug,
    })

    const shortenedUrl = `${env.API_URL}/${slug}`

    return {
      id: createdUrl.id,
      originUrl: createdUrl.originUrl,
      shortenedUrl,
      clicks: createdUrl.clicks,
      createdAt: createdUrl.createdAt,
      updatedAt: createdUrl.updatedAt,
      deletedAt: createdUrl.deletedAt,
    }
  }

  private async generateSlug(): Promise<string> {
    const slug = randomize('Aa0', 6)

    const foundUrl = await this.urlRepository.findOneBySlug(slug)

    if (foundUrl) {
      return this.generateSlug()
    }

    return slug
  }
}

export default ShortenUrlService
