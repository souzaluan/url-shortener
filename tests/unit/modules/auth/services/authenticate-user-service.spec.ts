import AuthenticateUserService from '../../../../../src/modules/auth/services/authenticate-user-service'
import { UnauthorizedError } from '../../../../../src/crosscutting/errors/unauthorized-error'
import HashProviderMock from '../../../crosscutting/mocks/hash-provider-mock'
import FakeUserRepository from '../../users/fakes/fake-user-repository'
import AuthTokenProviderMock from '../../../crosscutting/mocks/auth-token-provider-mock'

let fakeUserRepository: FakeUserRepository
let authenticateUserService: AuthenticateUserService
let hashProviderMock: HashProviderMock
let authTokenProviderMock: AuthTokenProviderMock

describe('AuthenticateUserService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    hashProviderMock = new HashProviderMock()
    authTokenProviderMock = new AuthTokenProviderMock()

    authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      hashProviderMock,
      authTokenProviderMock,
    )
  })

  it('should be able to authenticate user', async () => {
    fakeUserRepository.create({
      email: 'john.doe@example',
      name: 'John Doe',
      password: await hashProviderMock.hash('user-password'),
    })

    const response = await authenticateUserService.execute({
      email: 'john.doe@example',
      password: 'user-password',
    })

    expect(response).toHaveProperty('token')
  })

  it('should not be able to authenticate user if is incorrect password', async () => {
    fakeUserRepository.create({
      email: 'john.doe@example',
      name: 'John Doe',
      password: await hashProviderMock.hash('user-password'),
    })

    const response = authenticateUserService.execute({
      email: 'john.doe@example',
      password: 'incorrect-password',
    })

    expect(response).rejects.toBeInstanceOf(UnauthorizedError)
  })

  it('should not be able to authenticate user if is incorrect e-mail', async () => {
    fakeUserRepository.create({
      email: 'john.doe@example',
      name: 'John Doe',
      password: await hashProviderMock.hash('user-password'),
    })

    const response = authenticateUserService.execute({
      email: 'incorrect@example',
      password: 'user-password',
    })

    expect(response).rejects.toBeInstanceOf(UnauthorizedError)
  })
})
