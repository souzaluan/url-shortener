import GetUrlsByUserService from '../../../../../src/modules/urls/services/get-urls-by-user-service'

import { NotFoundError } from '../../../../../src/crosscutting/errors/not-found-error'

import FakeUrlRepository from '../fakes/fake-url-repository'
import FakeUserRepository from '../../users/fakes/fake-user-repository'

let fakeUrlRepository: FakeUrlRepository
let fakeUserRepository: FakeUserRepository
let getUrlsByUserService: GetUrlsByUserService

describe('GetUrlsByUserService', () => {
  beforeEach(() => {
    fakeUrlRepository = new FakeUrlRepository()
    fakeUserRepository = new FakeUserRepository()

    getUrlsByUserService = new GetUrlsByUserService(
      fakeUrlRepository,
      fakeUserRepository,
    )
  })

  it('should be able to get an user urls', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: 'user-password',
    })

    await fakeUrlRepository.create({
      originUrl: 'https://localhost:3000/api/long-url',
      slug: 'Abc012',
      userId: user.id,
    })

    await fakeUrlRepository.create({
      originUrl: 'https://localhost:3000/api/long-url-2',
      slug: 'Abc013',
      userId: user.id,
    })

    const { data, items, pages } = await getUrlsByUserService.execute({
      userId: user.id,
      limit: 10,
      page: 1,
    })

    expect(data[0].originUrl).toBe('https://localhost:3000/api/long-url')
    expect(items).toEqual(2)
    expect(pages).toEqual(1)
  })

  it("should be able to get urls if user doesn't exists", async () => {
    const getUrlsByUser = getUrlsByUserService.execute({
      userId: 'non-existent-user-id',
      limit: 10,
      page: 1,
    })

    expect(getUrlsByUser).rejects.toBeInstanceOf(NotFoundError)
  })
})
