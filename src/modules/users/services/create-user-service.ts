import { inject, injectable } from 'tsyringe'

import IUserRepository, {
  USER_REPOSITORY_TOKEN,
} from '../repositories/user-repository'
import {
  ICreateUser,
  ICreateUserService,
} from '../domain/services/create-user-service'

import { HASH_PROVIDER_TOKEN } from '../../../crosscutting/container/providers/HashProvider'
import IHashProvider from '../../../crosscutting/container/providers/HashProvider/models/IHashProvider'

import { BadRequestError } from '../../../crosscutting/errors/bad-request-error'

@injectable()
class CreateUserService implements ICreateUserService {
  constructor(
    @inject(USER_REPOSITORY_TOKEN)
    private userRepository: IUserRepository,

    @inject(HASH_PROVIDER_TOKEN)
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    name,
    email,
    password,
  }: ICreateUser.Params): Promise<ICreateUser.Response> {
    const foundUser = await this.userRepository.findOneByEmail(email)

    if (foundUser) {
      throw new BadRequestError('User already registered')
    }

    const hashedPassword = await this.hashProvider.hash(password)

    const createdUser = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    return {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
    }
  }
}

export default CreateUserService
