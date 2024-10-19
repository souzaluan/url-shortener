/* eslint-disable @typescript-eslint/no-explicit-any */
import { randomUUID } from 'node:crypto'

import IAuthTokenProvider from '../../../../src/crosscutting/container/providers/auth-token-provider/models/auth-token-provider'

class AuthTokenProviderMock implements IAuthTokenProvider {
  private tokens: Map<string, any> = new Map()

  sign(payload: any): string {
    const token = `mocked-token-${randomUUID()}`
    this.tokens.set(token, payload)
    return token
  }

  verify(token: string): boolean {
    return this.tokens.has(token)
  }
}

export default AuthTokenProviderMock
