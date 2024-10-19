import { inject, injectable } from 'tsyringe'

import { UnauthorizedError } from '../../../crosscutting/errors/unauthorized-error'

import IUserRepository, {
  USER_REPOSITORY_TOKEN,
} from '../../users/repositories/user-repository'

import IHashProvider, {
  HASH_PROVIDER_TOKEN,
} from '../../../crosscutting/container/providers/hash-provider/models/hash-provider'

import IAuthTokenProvider, {
  AUTH_TOKEN_PROVIDER_TOKEN,
} from '../../../crosscutting/container/providers/auth-token-provider/models/auth-token-provider'

import {
  IAuthenticateUser,
  IAuthenticateUserService,
} from '../domain/services/authenticate-user-service'

@injectable()
class AuthenticateUserService implements IAuthenticateUserService {
  constructor(
    @inject(USER_REPOSITORY_TOKEN)
    private userRepository: IUserRepository,

    @inject(HASH_PROVIDER_TOKEN)
    private hashProvider: IHashProvider,

    @inject(AUTH_TOKEN_PROVIDER_TOKEN)
    private authTokenProvider: IAuthTokenProvider,
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateUser.Params): Promise<IAuthenticateUser.Response> {
    const user = await this.userRepository.findOneWithPasswordByEmail(email)

    if (!user) {
      throw new UnauthorizedError('E-mail or password incorrect')
    }

    const passwordMatch = await this.hashProvider.compare(
      password,
      user.password,
    )

    if (!passwordMatch) {
      throw new UnauthorizedError('E-mail or password incorrect')
    }

    const token = this.authTokenProvider.sign({ id: user.id })

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    }
  }
}

export default AuthenticateUserService
