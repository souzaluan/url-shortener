import { inject, injectable } from 'tsyringe'
import { sign } from 'jsonwebtoken'

import env from '../../../crosscutting/config/environment-variables'
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
      throw new UnauthorizedError('E-mail or password incorrect')
    }

    const passwordMatch = await this.hashProvider.compare(
      password,
      user.password,
    )

    if (!passwordMatch) {
      throw new UnauthorizedError('E-mail or password incorrect')
    }

    const { JWT_EXPIRES_IN, JWT_SECRET } = env

    const token = sign(
      {
        id: user.id,
      },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
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
