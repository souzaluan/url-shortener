import FindOriginUrlBySlugService from '../../../../../src/modules/urls/services/find-origin-url-by-slug-service'

import { NotFoundError } from '../../../../../src/crosscutting/errors/not-found-error'

import FakeUrlRepository from '../fakes/fake-url-repository'

let fakeUrlRepository: FakeUrlRepository
let findOriginUrlBySlugService: FindOriginUrlBySlugService

describe('FindOriginUrlBySlugService', () => {
  beforeEach(() => {
    fakeUrlRepository = new FakeUrlRepository()

    findOriginUrlBySlugService = new FindOriginUrlBySlugService(
      fakeUrlRepository,
    )
  })

  it('should be able to find an origin url by slug', async () => {
    const url = {
      originUrl: 'https://localhost:3000/api/long-url',
      slug: 'shortened-url',
      userId: null,
    }

    await fakeUrlRepository.create(url)

    const foundUrl = await findOriginUrlBySlugService.execute({
      slug: 'shortened-url',
    })

    expect(foundUrl).toHaveProperty('originUrl')
  })

  it("should not be able to find an origin url if slug doesn't exists", async () => {
    const findUrl = findOriginUrlBySlugService.execute({
      slug: 'non-existent-slug',
    })

    expect(findUrl).rejects.toBeInstanceOf(NotFoundError)
  })

  it('should increment click when find an origin url', async () => {
    const url = {
      originUrl: 'https://localhost:3000/api/long-url',
      slug: 'shortened-url',
      userId: null,
    }

    await fakeUrlRepository.create(url)

    await findOriginUrlBySlugService.execute({
      slug: 'shortened-url',
    })

    const foundUrl = await fakeUrlRepository.findOneBySlug('shortened-url')

    expect(foundUrl?.clicks).toEqual(1)
  })
})
