interface IHashProvider {
  hash(raw: string): Promise<string>
  compare(raw: string, hashed: string): Promise<boolean>
}

export default IHashProvider
