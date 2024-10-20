import { Repository } from 'typeorm'
import getDataRepository from '../../../../../crosscutting/infra/typeorm/helpers/get-repository'
import IUrlRepository from '../../../repositories/url-repository'
import { IUrlEntity } from '../../../domain/url-entity'
import { UrlEntity } from '../entities/url-entity'
import CreateUrlDTO from '../../../dtos/create-url-dto'
import GetUrlsByUserDTO from '../../../dtos/get-urls-by-user-dto'

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

  async getByUser({
    userId,
    limit,
    page,
  }: GetUrlsByUserDTO.Params): Promise<GetUrlsByUserDTO.Response> {
    const [data, items] = await this.repository.findAndCount({
      where: { userId },
      skip: (page - 1) * limit,
      take: limit,
      withDeleted: false,
    })

    const pages = Math.ceil(items / limit)

    return {
      data,
      items,
      pages,
    }
  }
}

export default UrlRepository
