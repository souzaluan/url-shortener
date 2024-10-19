import { container } from 'tsyringe'

import './providers'

import UserRepository from '../../modules/users/infra/typeorm/repositories/user-repository'
import IUserRepository, {
  USER_REPOSITORY_TOKEN,
} from '../../modules/users/repositories/user-repository'

container.registerSingleton<IUserRepository>(
  USER_REPOSITORY_TOKEN,
  UserRepository,
)
