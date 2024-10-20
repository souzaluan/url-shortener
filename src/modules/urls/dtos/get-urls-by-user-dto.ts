import { IUrlEntity } from '../domain/url-entity'

namespace GetUrlsByUserDTO {
  export interface Params {
    userId: string
    page: number
    limit: number
  }

  export interface Response {
    data: IUrlEntity[]
    items: number
    pages: number
  }
}

export default GetUrlsByUserDTO
