import DeleteUrlService from '../../../../../src/modules/urls/services/delete-url-service'

import { NotFoundError } from '../../../../../src/crosscutting/errors/not-found-error'
import { UnauthorizedError } from '../../../../../src/crosscutting/errors/unauthorized-error'

import FakeUrlRepository from '../fakes/fake-url-repository'
import FakeUserRepository from '../../users/fakes/fake-user-repository'

let fakeUrlRepository: FakeUrlRepository
let fakeUserRepository: FakeUserRepository
let deleteUrlService: DeleteUrlService

describe('DeleteUrlService', () => {
  beforeEach(() => {
    fakeUrlRepository = new FakeUrlRepository()
    fakeUserRepository = new FakeUserRepository()

    deleteUrlService = new DeleteUrlService(
      fakeUrlRepository,
      fakeUserRepository,
    )
  })

  it('should be able to delete an url', async () => {
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

    await deleteUrlService.execute({ urlId: url.id, userId: user.id })

    const deletedUrl = await fakeUrlRepository.findOneById(url.id)

    expect(deletedUrl?.deletedAt).not.toBeNull()
  })

  it('should not be able to delete a non existent url', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: 'user-password',
    })

    const deleteUrl = deleteUrlService.execute({
      urlId: 'invalid-id',
      userId: user.id,
    })

    expect(deleteUrl).rejects.toBeInstanceOf(NotFoundError)
  })

  it('should not be able to delete if user not exists', async () => {
    const url = await fakeUrlRepository.create({
      originUrl: 'https://localhost:3000/api/long-url',
      slug: 'Abc012',
      userId: 'user-id',
    })

    const deleteUrl = deleteUrlService.execute({
      urlId: url.id,
      userId: 'invalid-id',
    })

    expect(deleteUrl).rejects.toBeInstanceOf(NotFoundError)
  })

  it('should not be able to delete if url is from another user', async () => {
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

    const deleteUrl = deleteUrlService.execute({
      urlId: url.id,
      userId: user.id,
    })

    expect(deleteUrl).rejects.toBeInstanceOf(UnauthorizedError)
  })
})
