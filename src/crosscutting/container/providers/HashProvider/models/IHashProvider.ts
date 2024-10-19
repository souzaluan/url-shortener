interface IHashProvider {
  hash(raw: string): Promise<string>
  compare(raw: string, hashed: string): Promise<boolean>
}

export const HASH_PROVIDER_TOKEN = Symbol('HashProvider')

export default IHashProvider
