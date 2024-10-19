import getDataRepository from 'crosscutting/infra/typeorm/helpers/get-repository'
import IUserRepository from 'modules/users/repositories/user-repository'
import { UserEntity } from '../entities/user-entity'
import { IUserEntity } from 'modules/users/domain/user-entity'
import { Repository } from 'typeorm'
import CreateUserDTO from 'modules/users/dtos/create-user-dto'

class UserRepository implements IUserRepository {
  private repository: Repository<IUserEntity>

  constructor() {
    this.repository = getDataRepository(UserEntity)
  }

  async create(data: CreateUserDTO): Promise<IUserEntity> {
    const createdUser = this.repository.create(data)
    return this.repository.save(createdUser)
  }

  async findOneWithPasswordByEmail(email: string): Promise<IUserEntity | null> {
    return this.repository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
    })
  }

  async findOneByEmail(email: string): Promise<IUserEntity | null> {
    return this.repository.findOneBy({ email })
  }
}

export default UserRepository
