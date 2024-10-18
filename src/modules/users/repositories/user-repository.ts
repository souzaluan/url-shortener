import { IUserEntity } from '../domain/user-entity'
import CreateUserDTO from '../dtos/create-user-dto'

interface IUserRepository {
  create: (data: CreateUserDTO) => Promise<IUserEntity>
  findOneWithPasswordByEmail: (email: string) => Promise<IUserEntity | null>
}

export default IUserRepository
