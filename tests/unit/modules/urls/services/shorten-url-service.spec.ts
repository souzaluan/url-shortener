import ShortenUrlService from '../../../../../src/modules/urls/services/shorten-url-service'
import FakeUrlRepository from '../fakes/fake-url-repository'

let fakeUrlRepository: FakeUrlRepository
let shortenUrlService: ShortenUrlService

describe('ShortenUrlService', () => {
  beforeEach(() => {
    fakeUrlRepository = new FakeUrlRepository()

    shortenUrlService = new ShortenUrlService(fakeUrlRepository)
  })

  it('should be able to shorten a url', async () => {
    const url = await shortenUrlService.execute({
      originUrl: 'https://localhost:3000/api/long-url',
      userId: null,
    })

    expect(url).toHaveProperty('id')
    expect(url).toHaveProperty('shortenedUrl')
  })

  it('should be able to shorten a url with only 6 characters in the slug', async () => {
    const url = await shortenUrlService.execute({
      originUrl: 'https://localhost:3000/api/long-url',
      userId: null,
    })

    const shortened = fakeUrlRepository.urls.find((_url) => _url.id === url.id)

    expect(shortened?.slug).toHaveLength(6)
  })
})
