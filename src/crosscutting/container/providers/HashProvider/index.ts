import { container } from 'tsyringe'
import BCryptHashProvider from './implementations/BCryptHashProvider'
import IHashProvider from './models/IHashProvider'

const providers = {
  bcrypt: BCryptHashProvider,
}

export const HASH_PROVIDER_TOKEN = Symbol('HashProvider')

container.registerSingleton<IHashProvider>(
  HASH_PROVIDER_TOKEN,
  providers.bcrypt,
)
