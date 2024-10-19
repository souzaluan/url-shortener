import { container } from 'tsyringe'

import './providers'

import UserRepository from '../../modules/users/infra/typeorm/repositories/user-repository'
import IUserRepository, {
  USER_REPOSITORY_TOKEN,
} from '../../modules/users/repositories/user-repository'

import UrlRepository from '../../modules/urls/infra/typeorm/repositories/url-repository'
import IUrlRepository, {
  URL_REPOSITORY_TOKEN,
} from '../../modules/urls/repositories/url-repository'

container.registerSingleton<IUserRepository>(
  USER_REPOSITORY_TOKEN,
  UserRepository,
)

container.registerSingleton<IUrlRepository>(URL_REPOSITORY_TOKEN, UrlRepository)
