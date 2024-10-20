import { IUrlEntity } from '../url-entity'

export namespace IUpdateUrl {
  export interface Params {
    urlId: string
    userId: string
    originUrl?: string
  }

  export interface Response
    extends Omit<IUrlEntity, 'slug' | 'user' | 'userId'> {
    shortenedUrl: string
  }
}

export interface IUpdateUrlService {
  execute: (params: IUpdateUrl.Params) => Promise<IUpdateUrl.Response>
}
