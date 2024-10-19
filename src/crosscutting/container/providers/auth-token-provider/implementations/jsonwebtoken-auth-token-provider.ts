/* eslint-disable @typescript-eslint/no-explicit-any */
import { sign, verify } from 'jsonwebtoken'

import jwt from '../../../../../crosscutting/config/jwt'

import IAuthTokenProvider from '../models/auth-token-provider'

class JsonWebTokenAuthTokenProvider implements IAuthTokenProvider {
  readonly SECRET = jwt.secret
  readonly EXPIRES_IN = jwt.expiresIn

  public sign(payload: any): string {
    const token = sign(payload, this.SECRET, { expiresIn: this.EXPIRES_IN })
    return token
  }

  public verify(token: string): any {
    return verify(token, this.SECRET)
  }
}

export default JsonWebTokenAuthTokenProvider
