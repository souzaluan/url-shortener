/* eslint-disable @typescript-eslint/no-explicit-any */
interface IAuthTokenProvider {
  sign(payload: any): string
  verify(token: string): any
}

export const AUTH_TOKEN_PROVIDER_TOKEN = Symbol('TokenProvider')

export default IAuthTokenProvider
