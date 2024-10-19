import { randomUUID } from 'node:crypto'

import IUserRepository from '../../../../../src/modules/users/repositories/user-repository'
import { IUserEntity } from '../../../../../src/modules/users/domain/user-entity'
import CreateUserDTO from '../../../../../src/modules/users/dtos/create-user-dto'

class FakeUserRepository implements IUserRepository {
  users: IUserEntity[] = []

  async create(data: CreateUserDTO): Promise<IUserEntity> {
    const user = {
      ...data,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.users.push(user)

    return user
  }

  async findOneByEmail(
    email: string,
  ): Promise<Omit<IUserEntity, 'password'> | null> {
    const user = this.users.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

  async findOneById(id: string): Promise<Omit<IUserEntity, 'password'> | null> {
    const user = this.users.find((user) => user.id === id)

    if (!user) {
      return null
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

  async findOneWithPasswordByEmail(email: string): Promise<IUserEntity | null> {
    const user = this.users.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }
}

export default FakeUserRepository
