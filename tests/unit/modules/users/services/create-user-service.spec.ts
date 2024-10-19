import { BadRequestError } from '../../../../../src/crosscutting/errors/bad-request-error'
import CreateUserService from '../../../../../src/modules/users/services/create-user-service'
import HashProviderMock from '../../../crosscutting/mocks/hash-provider-mock'
import FakeUserRepository from '../fakes/fake-user-repository'

let fakeUserRepository: FakeUserRepository
let hashProviderMock: HashProviderMock
let createUserService: CreateUserService

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    hashProviderMock = new HashProviderMock()

    createUserService = new CreateUserService(
      fakeUserRepository,
      hashProviderMock,
    )
  })

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'john.doe@example',
      password: 'user-password',
    })

    expect(user).toHaveProperty('id')
  })

  it('should not be able to create a new user with same email from another', async () => {
    const user = {
      name: 'John Doe',
      email: 'john.doe2@example',
      password: 'user-password',
    }

    await createUserService.execute(user)
    const result = createUserService.execute(user)

    expect(result).rejects.toBeInstanceOf(BadRequestError)
  })
})
