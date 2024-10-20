import { IUrlEntity } from '../domain/url-entity'
import CreateUrlDTO from '../dtos/create-url-dto'
import GetUrlsByUserDTO from '../dtos/get-urls-by-user-dto'
import UpdateUrlDTO from '../dtos/update-url-dto'

export const URL_REPOSITORY_TOKEN = Symbol('UrlsRepository')

interface IUrlRepository {
  create: (data: CreateUrlDTO) => Promise<IUrlEntity>
  findOneBySlug: (slug: string) => Promise<IUrlEntity | null>
  findOneById: (id: string) => Promise<IUrlEntity | null>
  incrementClick: (id: string) => Promise<void>
  getByUser: (
    params: GetUrlsByUserDTO.Params,
  ) => Promise<GetUrlsByUserDTO.Response>
  deleteById: (id: string) => Promise<void>
  update: (data: UpdateUrlDTO) => Promise<IUrlEntity>
}

export default IUrlRepository
