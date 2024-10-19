import { container } from 'tsyringe'
import JsonWebTokenAuthTokenProvider from './implementations/jsonwebtoken-auth-token-provider'
import IAuthTokenProvider, {
  AUTH_TOKEN_PROVIDER_TOKEN,
} from './models/auth-token-provider'

const providers = {
  jsonwebtoken: JsonWebTokenAuthTokenProvider,
}

container.registerSingleton<IAuthTokenProvider>(
  AUTH_TOKEN_PROVIDER_TOKEN,
  providers.jsonwebtoken,
)
