import { container } from 'tsyringe'
import BCryptHashProvider from './implementations/BCryptHashProvider'
import IHashProvider, { HASH_PROVIDER_TOKEN } from './models/IHashProvider'

const providers = {
  bcrypt: BCryptHashProvider,
}

container.registerSingleton<IHashProvider>(
  HASH_PROVIDER_TOKEN,
  providers.bcrypt,
)
