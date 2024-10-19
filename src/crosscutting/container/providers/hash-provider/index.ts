import { container } from 'tsyringe'
import BCryptHashProvider from './implementations/bcrypt-hash-provider'
import IHashProvider, { HASH_PROVIDER_TOKEN } from './models/hash-provider'

const providers = {
  bcrypt: BCryptHashProvider,
}

container.registerSingleton<IHashProvider>(
  HASH_PROVIDER_TOKEN,
  providers.bcrypt,
)
