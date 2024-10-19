import { IUserEntity } from '../domain/user-entity'
import CreateUserDTO from '../dtos/create-user-dto'

export const USER_REPOSITORY_TOKEN = Symbol('UsersRepository')

interface IUserRepository {
  create: (data: CreateUserDTO) => Promise<IUserEntity>
  findOneWithPasswordByEmail: (email: string) => Promise<IUserEntity | null>
  findOneByEmail: (
    email: string,
  ) => Promise<Omit<IUserEntity, 'password'> | null>
}

export default IUserRepository
