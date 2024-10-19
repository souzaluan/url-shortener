import { IUrlEntity } from '../url-entity'

export namespace IShortenUrl {
  export interface Params {
    originUrl: string
    userId: string | null
  }

  export interface Response
    extends Omit<IUrlEntity, 'slug' | 'user' | 'userId'> {
    shortenedUrl: string
  }
}

export interface IShortenUrlService {
  execute: (params: IShortenUrl.Params) => Promise<IShortenUrl.Response>
}
