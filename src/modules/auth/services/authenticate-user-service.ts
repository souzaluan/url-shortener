import { inject, injectable } from 'tsyringe'
import { sign } from 'jsonwebtoken'

import authenticationConfig from '../../../crosscutting/config/authentication'
import { NotFoundError } from '../../../crosscutting/errors/not-found-error'
import { UnauthorizedError } from '../../../crosscutting/errors/unauthorized-error'

import IHashProvider, {
  HASH_PROVIDER_TOKEN,
} from '../../../crosscutting/container/providers/HashProvider/models/IHashProvider'

import IUserRepository, {
  USER_REPOSITORY_TOKEN,
} from '../../users/repositories/user-repository'

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
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateUser.Params): Promise<IAuthenticateUser.Response> {
    const user = await this.userRepository.findOneWithPasswordByEmail(email)

    if (!user) {
      throw new NotFoundError('User not found')
    }

    console.log(user)

    const passwordMatch = await this.hashProvider.compare(
      password,
      user.password,
    )

    if (!passwordMatch) {
      throw new UnauthorizedError('E-mail or password incorrect')
    }

    const { expiresIn, secret } = authenticationConfig.jwt

    const token = sign(
      {
        id: user.id,
      },
      secret,
      {
        expiresIn,
      },
    )

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
