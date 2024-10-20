import { IUrlEntity } from '../url-entity'

export namespace IGetUrlsByUser {
  export interface Params {
    userId: string
    page: number
    limit: number
  }

  export interface Response {
    data: IUrlEntity[]
    pages: number
    items: number
  }
}

export interface IGetUrlsByUserService {
  execute: (params: IGetUrlsByUser.Params) => Promise<IGetUrlsByUser.Response>
}
