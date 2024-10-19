import { IUrlEntity } from '../domain/url-entity'
import CreateUrlDTO from '../dtos/create-url-dto'

export const URL_REPOSITORY_TOKEN = Symbol('UrlsRepository')

interface IUrlRepository {
  create: (data: CreateUrlDTO) => Promise<IUrlEntity>
  findOneBySlug: (slug: string) => Promise<IUrlEntity | null>
  incrementClick: (id: string) => Promise<void>
}

export default IUrlRepository
