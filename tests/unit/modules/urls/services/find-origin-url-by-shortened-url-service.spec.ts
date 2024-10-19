import FindOriginUrlByShortenedUrlService from '../../../../../src/modules/urls/services/find-origin-url-by-shortened-url-service'
import { BadRequestError } from '../../../../../src/crosscutting/errors/bad-request-error'
import { NotFoundError } from '../../../../../src/crosscutting/errors/not-found-error'

import FakeUrlRepository from '../fakes/fake-url-repository'

let fakeUrlRepository: FakeUrlRepository
let findOriginUrlByShortenedUrlService: FindOriginUrlByShortenedUrlService

describe('FindOriginUrlByShortenedUrlService', () => {
  beforeEach(() => {
    fakeUrlRepository = new FakeUrlRepository()

    findOriginUrlByShortenedUrlService = new FindOriginUrlByShortenedUrlService(
      fakeUrlRepository,
    )
  })

  it('should be able to find an origin url by shortened url', async () => {
    const url = {
      originUrl: 'https://localhost:3000/api/long-url',
      slug: 'shortened-url',
    }

    await fakeUrlRepository.create(url)

    const foundUrl = await findOriginUrlByShortenedUrlService.execute({
      shortenedUrl: 'https://localhost:3000/api/shortened-url',
    })

    expect(foundUrl).toHaveProperty('originUrl')
  })

  it('should not be able to find an origin url if shortened url is empty', async () => {
    const url = {
      originUrl: 'https://localhost:3000/api/long-url',
      slug: 'shortened-url',
    }

    await fakeUrlRepository.create(url)

    const findUrl = findOriginUrlByShortenedUrlService.execute({
      shortenedUrl: '',
    })

    expect(findUrl).rejects.toBeInstanceOf(BadRequestError)
  })

  it("should not be able to find an origin url if shortened url doesn't exists", async () => {
    const url = {
      originUrl: 'https://localhost:3000/api/long-url',
      slug: 'shortened-url',
    }

    await fakeUrlRepository.create(url)

    const findUrl = findOriginUrlByShortenedUrlService.execute({
      shortenedUrl: 'non-existent-url',
    })

    expect(findUrl).rejects.toBeInstanceOf(NotFoundError)
  })

  it('should increment click when find an origin url', async () => {
    const url = {
      originUrl: 'https://localhost:3000/api/long-url',
      slug: 'shortened-url',
    }

    await fakeUrlRepository.create(url)

    await findOriginUrlByShortenedUrlService.execute({
      shortenedUrl: 'https://localhost:3000/api/shortened-url',
    })

    const foundUrl = await fakeUrlRepository.findOneBySlug('shortened-url')

    expect(foundUrl?.clicks).toEqual(1)
  })
})
