import UpdateUrlService from '../../../../../src/modules/urls/services/update-url-service'

import { NotFoundError } from '../../../../../src/crosscutting/errors/not-found-error'
import { UnauthorizedError } from '../../../../../src/crosscutting/errors/unauthorized-error'

import FakeUrlRepository from '../fakes/fake-url-repository'
import FakeUserRepository from '../../users/fakes/fake-user-repository'

let fakeUrlRepository: FakeUrlRepository
let fakeUserRepository: FakeUserRepository
let updateUrlService: UpdateUrlService

describe('UpdateUrlService', () => {
  beforeEach(() => {
    fakeUrlRepository = new FakeUrlRepository()
    fakeUserRepository = new FakeUserRepository()

    updateUrlService = new UpdateUrlService(
      fakeUrlRepository,
      fakeUserRepository,
    )
  })

  it('should be able to update an url', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: 'user-password',
    })

    const url = await fakeUrlRepository.create({
      originUrl: 'https://localhost:3000/api/long-url',
      slug: 'Abc012',
      userId: user.id,
    })

    await updateUrlService.execute({
      urlId: url.id,
      userId: user.id,
      originUrl: 'updated-origin-url',
    })

    const updatedUrl = await fakeUrlRepository.findOneById(url.id)

    expect(updatedUrl?.originUrl).toBe('updated-origin-url')
  })

  it('should not be able to update a non existent url', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: 'user-password',
    })

    const updateUrl = updateUrlService.execute({
      urlId: 'invalid-id',
      userId: user.id,
    })

    expect(updateUrl).rejects.toBeInstanceOf(NotFoundError)
  })

  it('should not be able to update if user not exists', async () => {
    const url = await fakeUrlRepository.create({
      originUrl: 'https://localhost:3000/api/long-url',
      slug: 'Abc012',
      userId: 'user-id',
    })

    const updateUrl = updateUrlService.execute({
      urlId: url.id,
      userId: 'invalid-id',
    })

    expect(updateUrl).rejects.toBeInstanceOf(NotFoundError)
  })

  it('should not be able to update if url is from another user', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: 'user-password',
    })

    const url = await fakeUrlRepository.create({
      originUrl: 'https://localhost:3000/api/long-url',
      slug: 'Abc012',
      userId: 'another-user-id',
    })

    const updateUrl = updateUrlService.execute({
      urlId: url.id,
      userId: user.id,
    })

    expect(updateUrl).rejects.toBeInstanceOf(UnauthorizedError)
  })

  it('should not be able to update if url is not from some user', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: 'user-password',
    })

    const url = await fakeUrlRepository.create({
      originUrl: 'https://localhost:3000/api/long-url',
      slug: 'Abc012',
      userId: null,
    })

    const updateUrl = updateUrlService.execute({
      urlId: url.id,
      userId: user.id,
    })

    expect(updateUrl).rejects.toBeInstanceOf(UnauthorizedError)
  })
})
