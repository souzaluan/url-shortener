import { Repository } from 'typeorm'
import getDataRepository from '../../../../../crosscutting/infra/typeorm/helpers/get-repository'
import IUrlRepository from '../../../repositories/url-repository'
import { IUrlEntity } from '../../../domain/url-entity'
import { UrlEntity } from '../entities/url-entity'
import CreateUrlDTO from '../../../dtos/create-url-dto'

class UrlRepository implements IUrlRepository {
  private repository: Repository<IUrlEntity>

  constructor() {
    this.repository = getDataRepository(UrlEntity)
  }

  async create(data: CreateUrlDTO): Promise<IUrlEntity> {
    const createdUser = this.repository.create(data)
    return this.repository.save(createdUser)
  }

  async findOneBySlug(slug: string): Promise<IUrlEntity | null> {
    return this.repository.findOne({ where: { slug }, withDeleted: false })
  }

  async incrementClick(id: string): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update(UrlEntity)
      .where({ id })
      .set({ clicks: () => 'clicks + 1' })
      .execute()
  }
}

export default UrlRepository
