interface IAuthTokenProvider {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sign(payload: any): string
  verify(token: string): boolean
}

export const AUTH_TOKEN_PROVIDER_TOKEN = Symbol('TokenProvider')

export default IAuthTokenProvider
