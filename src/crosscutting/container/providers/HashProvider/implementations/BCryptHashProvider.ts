import { hash, compare } from 'bcryptjs'

import IHashProvider from '../models/IHashProvider'

class BCryptHashProvider implements IHashProvider {
  public async hash(raw: string): Promise<string> {
    return hash(raw, 8)
  }

  public async compare(raw: string, hashed: string): Promise<boolean> {
    return compare(raw, hashed)
  }
}

export default BCryptHashProvider
