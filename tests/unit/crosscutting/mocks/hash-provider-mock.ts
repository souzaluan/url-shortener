import IHashProvider from '../../../../src/crosscutting/container/providers/HashProvider/models/IHashProvider'

class HashProviderMock implements IHashProvider {
  async hash(raw: string): Promise<string> {
    return Promise.resolve(raw)
  }

  async compare(raw: string, hashed: string): Promise<boolean> {
    return Promise.resolve(raw === hashed)
  }
}

export default HashProviderMock
